#!/bin/bash
set -e

# --- Configuration ---
BUCKET_NAME="my-app-deployment"
# The user requested to deploy the 'app' folder
# We assume 'app/public' is the frontend assets (images, html)
# And the root 'app' is the server code
FRONTEND_DIR="../../app/public" 
BACKEND_DIR="../../app"
FUNCTION_NAME="my-api"
ROLE_ARN="arn:aws:iam::000000000000:role/lambda-role"

# Export dummy credentials for LocalStack
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1

echo "========================================"
echo "☁️  Simulating Real Project Deployment"
echo "    Frontend Source: $FRONTEND_DIR"
echo "    Backend Source:  $BACKEND_DIR"
echo "========================================"

# Check if directories exist
if [ ! -d "$FRONTEND_DIR" ]; then
  echo "⚠️  Warning: $FRONTEND_DIR not found. Skipping Frontend deploy."
else
  # ---------------------------------------------
  # 1. FRONTEND: S3
  # ---------------------------------------------
  echo ""
  echo "--- 1. Deploying Frontend to S3 ---"
  aws --endpoint-url=http://localhost:4566 s3 mb s3://$BUCKET_NAME 2>/dev/null || echo "Bucket exists"
  aws --endpoint-url=http://localhost:4566 s3 sync $FRONTEND_DIR s3://$BUCKET_NAME --acl public-read
  echo "✅ Frontend deployed: http://localhost:4566/$BUCKET_NAME/index.html"
fi

# ---------------------------------------------
# 2. BACKEND: Lambda
# ---------------------------------------------
if [ ! -d "$BACKEND_DIR" ]; then
    echo "❌ Error: Backend directory '$BACKEND_DIR' not found!"
    exit 1
fi

echo ""
echo "--- 2. Deploying Backend to Lambda ---"

echo "  -> Zipping backend code (app folder)..."
echo "     (Including node_modules, this might take a few seconds...)"
cd $BACKEND_DIR
# Ensure files are readable/executable by the Lambda user
chmod -R 755 .
zip -r /tmp/function_app.zip . > /dev/null
cd - > /dev/null

echo "  -> Handling Large Upload (Strategy: Upload to S3 first)..."
# AWS Lambda has a 50MB limit for direct uploads. Our node_modules is huge (180MB+).
# The workaround is to upload the zip to S3 first, then tell Lambda to pull from there.

CODE_BUCKET="my-app-code-deployments"
aws --endpoint-url=http://localhost:4566 s3 mb s3://$CODE_BUCKET 2>/dev/null || echo "Code bucket exists"
aws --endpoint-url=http://localhost:4566 s3 cp /tmp/function_app.zip s3://$CODE_BUCKET/backend.zip

echo "  -> Creating/Updating Lambda from S3..."
# Delete old function to ensure clean state
aws --endpoint-url=http://localhost:4566 lambda delete-function --function-name $FUNCTION_NAME > /dev/null 2>&1 || true

aws --endpoint-url=http://localhost:4566 lambda create-function \
    --function-name $FUNCTION_NAME \
    --code S3Bucket=$CODE_BUCKET,S3Key=backend.zip \
    --handler lambda.handler \
    --runtime nodejs18.x \
    --role $ROLE_ARN \
    > /dev/null

echo "  -> Waiting for function to be Active..."
# Loop to wait for Active state (Fixes ResourceConflictException)
while true; do
    STATE=$(aws --endpoint-url=http://localhost:4566 lambda get-function --function-name $FUNCTION_NAME --query 'Configuration.State' --output text)
    if [ "$STATE" == "Active" ]; then
        break
    fi
    echo "     State: $STATE... waiting..."
    sleep 1
done

echo "  -> Generating public URL..."
URL_CONFIG=$(aws --endpoint-url=http://localhost:4566 lambda create-function-url-config \
    --function-name $FUNCTION_NAME \
    --auth-type NONE)
    
FUNCTION_URL=$(echo $URL_CONFIG | grep -o 'http://[^"]*' | head -1)

echo "✅ Backend deployed!"
echo "   Public API Endpoint: $FUNCTION_URL"

# Cleanup
rm /tmp/function_app.zip

echo ""
echo "========================================"
echo "🎉 DEPLOYMENT COMPLETE"
echo "========================================"

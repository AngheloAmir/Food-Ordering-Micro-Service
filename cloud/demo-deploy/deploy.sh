#!/bin/bash
set -e

BUCKET_NAME="my-app-deployment"
DIR_TO_DEPLOY="./website"

# Export dummy credentials for LocalStack
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1

echo "========================================"
echo "☁️  Simulating Cloud Deployment..."
echo "========================================"

# 1. Create the bucket (The 'Server')
echo "1. Creating Bucket '$BUCKET_NAME'..."
aws --endpoint-url=http://localhost:4566 s3 mb s3://$BUCKET_NAME || echo "Bucket might already exist"

# 2. Upload the files (The 'Deployment')
echo "2. Uploading files..."
aws --endpoint-url=http://localhost:4566 s3 sync $DIR_TO_DEPLOY s3://$BUCKET_NAME --acl public-read

echo "========================================"
echo "✅ Deployment Complete!"
echo "You can view your deployed site here:"
echo "http://localhost:4566/$BUCKET_NAME/index.html"
echo "========================================"

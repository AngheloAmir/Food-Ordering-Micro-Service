# Local Cloud Environment (LocalStack Community)

This folder contains a local cloud emulation environment using the **Free (Community) Edition** of [LocalStack](https://localstack.cloud/).

## Is this Free?
**Yes.** Use this `docker-compose.yml` configuration and you never have to pay.
We effectively built a "Local Studio" for you with open-source tools.

- **LocalStack**: The Engine (Free Community Edition)
- **DynamoDB Admin**: The Database GUI
- **S3 Manager**: The File Storage GUI

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS CLI](https://aws.amazon.com/cli/)

## Getting Started

1.  **Start the Cloud**:
    ```bash
    docker-compose up -d
    ```

2.  **Access Your "Local Studio"**:
    
    | Service | URL | Description |
    | :--- | :--- | :--- |
    | **Database GUI** | [http://localhost:8001](http://localhost:8001) | View tables, query items (DynamoDB) |
    | **Storage GUI** | [http://localhost:8002](http://localhost:8002) | View buckets, upload/download files (S3) |
    | **Cloud API** | `localhost:4566` | The API endpoint for your code |

## CLI Usage

You use the standard AWS CLI. Always add `--endpoint-url=http://localhost:4566`.

### 1. Storage (S3)
```bash
# Create a bucket (Refresh http://localhost:8002 to see it!)
aws --endpoint-url=http://localhost:4566 s3 mb s3://my-test-bucket

# Upload a file
echo "Hello Cloud" > hello.txt
aws --endpoint-url=http://localhost:4566 s3 cp hello.txt s3://my-test-bucket/
```

### 2. Database (DynamoDB)
```bash
# Create a table (Refresh http://localhost:8001 to see it!)
aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name Users \
    --attribute-definitions AttributeName=UserId,AttributeType=S \
    --key-schema AttributeName=UserId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

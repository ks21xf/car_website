import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import boto3
import os


load_dotenv()

AWS_ACCESS_KEY=os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_ACCESS_KEY=os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION=os.getenv("AWS_REGION")
AWS_BUCKET_NAME=os.getenv("AWS_BUCKET_NAME")

# 1. Force Boto3 to use these exact credentials
session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY,      # Double check: no spaces at start or end
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name= AWS_REGION       # Change to your bucket/resource region
)

# 2. Test the connection against the Security Token Service
sts_client = session.client('s3')

try:
    response = sts_client.get_object(Bucket=AWS_BUCKET_NAME, Key='imgs/1_1.png')
    print("✅ Success! Connected as User:")
    print( response['Body'].read())
except ClientError as e:
    print("❌ Connection Failed!")
    print(e.response['Error']['Message'])

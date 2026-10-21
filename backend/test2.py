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

response = sts_client.list_objects_v2(Bucket=AWS_BUCKET_NAME, Prefix="car_img_data/P6173dMlqN3zPMwcjVA0/")

# 2. Check if the folder actually has files in it
if 'Contents' in response:
    # Build the list of file keys to delete
    delete_keys = [{'Key': obj['Key']} for obj in response['Contents']]

    # 3. Delete everything in a single, fast request
    sts_client.delete_objects(
        Bucket=AWS_BUCKET_NAME,
        Delete={'Objects': delete_keys}
    )
    print(f"Successfully deleted {len(delete_keys)} photos.")

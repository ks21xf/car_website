dependencies
pip install flask flask-cors pymongo python-dotenv boto3
npm install @aws-sdk/client-s3



# Project Documentation: AWS S3 Media Storage Integration

This document outlines the architecture, setup, and configuration for the **AWS S3** image storage system used in this project.

---

## 1. System Architecture Overview
Our application uses a split-storage architecture to optimize performance and scalability:
* **MongoDB:** Acts as our primary database. It stores structured application data, user profiles, metadata, and the **URLs/file paths** pointing to our media files.
* **Amazon S3 (Simple Storage Service):** Acts as our object storage. It is built specifically to hold unstructured binary data like **images, videos, and user uploads**.

*Why this design?* Storing raw images directly inside MongoDB can bloat the database, slow down queries, and hit the 16MB document limit. Instead, we upload images to S3 and save the resulting S3 URL string in MongoDB.

---

## 2. AWS Infrastructure & Accountability

### The AWS Free Tier
The infrastructure was built using an **AWS Free Tier** account.
* **Duration:** The Free Tier provides **12 months** of free access to select services starting from the account creation date.
* **S3 Limits:** Includes **5 GB of Amazon S3 standard storage**, along with **2,000 PUT requests** (uploads) and **20,000 GET requests** (downloads) per month.
* **Future-Proofing Note:** Once the 12-month window expires, AWS will transition the account to standard pay-as-you-go pricing. Because S3 is highly cost-effective, maintaining a small storage footprint will only incur a few cents per gigabyte each month.

### Storage Configuration (.env)
A dedicated storage container (called a **Bucket**) was created in a specific AWS geographic region. To keep the code modular and secure, these details are abstracted out of the codebase and stored in a local `.env` file:
```env
AWS_S3_BUCKET_NAME="your-unique-bucket-name"
AWS_S3_REGION="your-chosen-region" # e.g., us-east-1
```

---

## 3. Security & Access Management (IAM)

To prevent unauthorized access and maintain security, we enforced the **Principle of Least Privilege**. Instead of using root administrative credentials, access was locked down using AWS Identity and Access Management (IAM).

### Step 1: The Custom IAM Policy
A restrictive security policy was created to ensure that whoever uses it can *only* interact with our specific bucket, and *only* perform necessary actions.
* **Allowed Actions:** `s3:PutObject` (Uploading) and `s3:DeleteObject` (Deleting).
* **Restricted Actions:** Cannot list other buckets, cannot delete the bucket itself, and cannot modify account settings.

### Step 2: The Programmatic IAM User
A dedicated IAM **User** was created specifically for the web application API.
1. The user was configured for **Programmatic Access** (API usage) rather than console login access.
2. The custom IAM policy created in Step 1 was directly attached to this user.
3. A unique pair of permanent credentials (**Access Key ID** and **Secret Access Key**) was generated for this user.

### Step 3: Secure Credential Storage (.env)
The generated user keys were securely added to our `.env` file. They must **never** be hardcoded into the Python files or pushed to public Git repositories:
```env
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="your-secret-key-string"
```

---

## 4. API Integration (Flask & Boto3)

The application utilizes **Flask** to handle API requests and the **Boto3** library (the official AWS SDK for Python) to interact with S3.

### Resolving Boto3 Credential Precedence
During setup, Boto3 may throw a `NoCredentialsError` or a validation error if it attempts to read corrupted background system configuration files on your local development machine.

To future-proof the application across any environment (Local, Docker, or Production Cloud), we explicitly bypass background system files by instantiating a Boto3 **Session** using our loaded `.env` variables before spawning the S3 client:

```python
import os
import boto3
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# 1. Establish an isolated session with explicit credentials
aws_session = boto3.Session(
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_S3_REGION')
)

# 2. Spawn the S3 client directly from the secure session
s3_client = aws_session.client('s3')

# The s3_client is now ready for use by your Flask API routes!
```

## 5. Use of CloudFront as an Image Distributor
Now that we have our S3 bucket, we are able to use boto3 to access and pull images from the bucket via API endpoint. However, note that this method requires sending the binary string of the entire image which had to be b64 encoded. This string would be a few megabytes long for a small photo alone. Naturally a website containing tens or hundreds of photos such as this one would be impractical with this method of image extraction.

Making the bucket public wouldn't work either. While this lets us access images via the URL, meaning we simply have to store the URL as an attribute in the database, this leaves the bucket vulnerable to attacks. It's generally advisable to keep buckets and other backend structures as private as possible.

The option I ended up using was Amazon CloudFront, it acts as a content delivery network (CDN) that fetches images from the S3 bucket. Amazon CloudFront allows global caching, keeps buckets private and is fairly cheap, making it very valuable. It also builds off of S3 meaning nothing has to be discarded when setting up a CloudFront Distribution. After setting it up and connecting it to your S3 bucket, you use the distribution domain name of the CloudFront Distribution along with the key to your image in your S3 bucket, and that is your image URL. notice that the images themselves are publicly available but no other information about your bucket is possible to acquire.

Amazon CloudFront may cost (base?) $6 a month.





import S3 from "aws-sdk/clients/s3";

export const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

export const s3 = new S3({
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey,
  },
});

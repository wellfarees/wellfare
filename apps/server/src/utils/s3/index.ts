import S3 from "aws-sdk/clients/s3";
import * as dotenv from "dotenv";
dotenv.config();

export const bucketName = process.env._AWS_BUCKET_NAME;
const region = process.env._AWS_BUCKET_REGION;
const accessKey = process.env._AWS_ACCESS_KEY;
const secretAccessKey = process.env._AWS_SECRET_KEY;

export const s3 = new S3({
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey,
  },
});

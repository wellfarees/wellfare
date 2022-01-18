import { s3, bucketName } from ".";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { Buffer } from "buffer";

export const uploadObject = async (
  body: Buffer,
  uid: string,
  extension: string
): Promise<ManagedUpload.SendData> => {
  return s3
    .upload({
      Bucket: bucketName,
      Body: body,
      Key: uid + extension,
    })
    .promise();
};

export const deleteObject = async (filename: string) => {
  return await s3
    .deleteObject({
      Bucket: bucketName,
      Key: filename,
    })
    .promise();
};

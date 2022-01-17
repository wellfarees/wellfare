import { s3, bucketName } from ".";
import { ReadStream } from "fs-capacitor";
import { ManagedUpload } from "aws-sdk/clients/s3";

export const upload = async (
  stream: ReadStream,
  uid: string,
  extension: string
): Promise<ManagedUpload.SendData> => {
  return s3
    .upload({
      Bucket: bucketName,
      Body: stream,
      Key: uid + extension,
    })
    .promise();
};

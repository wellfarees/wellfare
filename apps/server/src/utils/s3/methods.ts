import { s3, bucketName } from ".";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { Buffer } from "buffer";

export const uploadObject = async (
  body: Buffer,
  uid: string,
  extension: string
): Promise<ManagedUpload.SendData> => {
  console.log(bucketName);
  return s3
    .upload({
      Bucket: "wellfare-storage",
      Body: body,
      Key: uid + extension,
    })
    .promise();
};

export const deleteObject = async (filename: string) => {
  return await s3
    .deleteObject({
      Bucket: "wellfare-storage",
      Key: filename,
    })
    .promise();
};

export const deleteByPrefix = async (prefix: string) => {
  // Set up the parameters for listObjectsV2
  const params = {
    Bucket: "wellfare-storage",
    Prefix: `images/${prefix}`,
  };

  // Call listObjectsV2 to get a list of objects matching the prefix
  return await s3
    .listObjectsV2(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Create an array of objects to delete
        const deleteParams = {
          Bucket: "wellfare-storage",
          Delete: {
            Objects: data.Contents.map((object) => {
              console.log(object.Key);
              return { Key: object.Key };
            }),
          },
        };

        // Call deleteObjects to delete the objects
        s3.deleteObjects(deleteParams, (err, data) => {
          if (err) {
            // Handle error
            console.error(err);
          } else {
            console.log(`Successfully deleted ${data.Deleted.length} objects`);
          }
        });
      }
    })
    .promise();
};

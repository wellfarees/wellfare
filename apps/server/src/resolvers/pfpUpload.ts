import { FileUpload, GraphQLUpload } from "graphql-upload";
import { uploadObject, deleteObject } from "../utils/s3/methods";
import verifyJWT from "../utils/verifyJWT";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import { decodedToken } from "../types/jwt";
import server from "../server";
import { createWriteStream, unlinkSync } from "fs";
import path from "path";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    pfpUpload: async (
      _: unknown,
      args: { image: Promise<FileUpload> },
      headers: { token: string }
    ) => {
      const dToken = verifyJWT(headers.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");
      const id = (dToken as decodedToken).id;

      const data = await server.db.user.findFirst({
        where: { id },
        select: {
          information: true,
        },
      });

      const { createReadStream, filename } = await args.image;
      const extension = "." + /[^.]+$/.exec(filename);
      const stream = createReadStream();

      let imageLocation = "";
      try {
        // delete the previous avatar
        if (data.information.pfp) {
          const targetFilename = /([^\/]+$)/.exec(data.information.pfp)[0];
          await deleteObject(targetFilename);
        }

        // save the image file locally
        await new Promise((res) =>
          stream
            .pipe(
              createWriteStream(
                path.join(__dirname, "../../images", `${id}${extension}`)
              )
            )
            .on("close", res)
        );

        // compress / minify the image
        const files = await imagemin([`images/$}${extension}`], {
          plugins: [
            imageminJpegtran(),
            imageminPngquant({
              quality: [0.4, 0.5],
            }),
          ],
        });

        // store in aws s3
        const res = await uploadObject(files[0].data, id, extension);
        imageLocation = res.Location;

        // delete the local file
        unlinkSync(path.join(__dirname, "../../images/" + `${id}${extension}`));
        await server.db.user.update({
          where: {
            id,
          },
          data: {
            information: {
              update: {
                pfp: imageLocation,
              },
            },
          },
        });
      } catch (e) {
        throw new Error("Failed to upload avatar.");
      }

      return {
        location: imageLocation,
      };
    },
  },
};

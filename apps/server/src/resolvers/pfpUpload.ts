import server from "../server";

import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

import { createWriteStream, unlinkSync } from "fs";
import path from "path";

import { FileUpload, GraphQLUpload } from "graphql-upload";
import { uploadObject, deleteByPrefix } from "../utils/s3/methods";
import verifyJWT from "../utils/verifyJWT";

import { decodedToken } from "../types/jwt";

import { ApolloError } from "apollo-server-core";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";

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
        // delete all previous user profile pictures with extensions that may vary
        if (data.information.pfp) await deleteByPrefix(id);

        // save the image file locally
        await new Promise((res) =>
          stream
            .pipe(
              createWriteStream(
                path.join(__dirname, "../images", `${id}${extension}`)
              )
            )
            .on("close", res)
        ).catch();

        // compress / minify the image
        const files = await imagemin(
          [path.join(__dirname, `../images`, `${id}${extension}`)],
          {
            plugins: [
              imageminJpegtran(),
              imageminPngquant({
                quality: [0.4, 0.5],
              }),
            ],
          }
        ).catch(() => {
          return new ApolloError("Could not minify the image.");
        });

        if (!files.length) {
          return new ApolloError("Could not minify the image.");
        }

        // store in aws s3
        const res = await uploadObject(
          files[0].data,
          `images/${id}`,
          extension
        );

        imageLocation = res.Location;

        // delete the local file
        unlinkSync(path.join(__dirname, "../images/" + `${id}${extension}`));
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
        console.log(e);
        return new ApolloError("Failed to upload the profile picture.");
      }

      return {
        location: imageLocation,
      };
    },
  },
};

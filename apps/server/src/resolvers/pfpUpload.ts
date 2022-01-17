import { FileUpload, GraphQLUpload } from "graphql-upload";
import { upload } from "../utils/s3/methods";
import verifyJWT from "../utils/verifyJWT";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import { decodedToken } from "../types/jwt";
import server from "../server";

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
      const id = Number((dToken as decodedToken).id);

      const data = await server.db.user.findFirst({
        where: { id },
        select: {
          information: true,
          uid: true,
        },
      });

      const { createReadStream, filename } = await args.image;
      const extension = "." + /[^.]+$/.exec(filename);
      const stream = createReadStream();

      let imageLocation = "";
      try {
        const res = await upload(stream, data.uid, extension);
        imageLocation = res.Location;
        console.log(imageLocation);
      } catch (e) {
        throw new Error("Failed to upload avatar.");
      }

      return {
        location: imageLocation,
      };
    },
  },
};

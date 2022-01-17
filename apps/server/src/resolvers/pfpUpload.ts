import { FileUpload, GraphQLUpload } from "graphql-upload";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    pfpUpload: async (_: unknown, args: { image: Promise<FileUpload> }) => {
      // const { createReadStream, filename } = await args.image;
      // const stream = createReadStream();

      return {
        success: true,
      };
    },
  },
};

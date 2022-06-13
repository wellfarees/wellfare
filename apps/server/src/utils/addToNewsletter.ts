import server from "../server";

const addToNewsletter = async (email: string, id: string): Promise<void> => {
  // adding to newsletter
  const hasSubbedPreviously = await server.db.newsletterUser.findFirst({
    where: {
      email,
    },
  });

  if (hasSubbedPreviously) {
    await server.db.newsletterUser.update({
      where: {
        id: hasSubbedPreviously.id,
      },
      data: {
        email: null,
        relationId: id,
      },
    });
  } else {
    await server.db.newsletterUser.create({
      data: {
        relationId: id,
      },
    });
  }
};

export { addToNewsletter };

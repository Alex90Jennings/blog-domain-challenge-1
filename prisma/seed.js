const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUsersConfirmation = await prisma.user.createMany({
    data: [
      {
        username: "alicemarti",
        name: "Alice Martin",
        email: "alice@hotmail.com",
        password: "AliceM99",
      },
      {
        username: "alexJ",
        name: "Alex J",
        email: "alexj@hotmail.com",
        password: "AlexJ99",
      },
    ],
  });

  const createdUsers = await prisma.user.findMany();

  const createdProfile = await prisma.profile.createMany({
    data: [
      {
        userId: createdUsers[0].id,
        bio: "you miss all the shots you don't take",
        profileIMG: "greatpicalice.jpeg",
      },
      {
        userId: createdUsers[1].id,
        bio: "let's go",
        profileIMG: "greatpicalex.jpeg",
      },
    ],
  });

  const createdPostConfirmation = await prisma.post.createMany({
    data: [
      {
        userId: createdUsers[0].id,
        title: "wonderful title",
        content: "amazing post by Alice",
        published: true,
      },
      {
        userId: createdUsers[1].id,
        title: "wonderful title",
        content: "amazing post by Alex",
        picture: "amazingphoto.jpeg",
        published: false,
      },
    ],
  });

  const createdPosts = await prisma.post.findMany();

  const createdComment = await prisma.comment.createMany({
    data: [
      {
        userId: createdUsers[0].id,
        postId: createdPosts[0].id,
        content: "amazing comment by Alice",
      },
      {
        userId: createdUsers[1].id,
        postId: createdPosts[1].id,
        content: "amazing comment by Alex",
      },
    ],
  });

  console.log(`${createdUsers.count} users created`, createdUsers);
  console.log(`user 1`, createdUsers[0]);
  console.log("Profile created", createdProfile);
  console.log("Post created", createdPosts);
  console.log("Comment created", createdComment);

  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});

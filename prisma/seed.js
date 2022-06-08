const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUsers = await prisma.user.createMany({
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

  const createdProfile = await prisma.profile.createMany({
    data: [
      {
        userId: 1,
        bio: "you miss all the shots you don't take",
        profileIMG: "greatpicalice.jpeg",
      },
      {
        userId: 2,
        bio: "let's go",
        profileIMG: "greatpicalex.jpeg",
      },
    ],
  });

  const createdPost = await prisma.post.createMany({
    data: [
      {
        userId: 1,
        title: "wonderful title",
        content: "amazing post by Alice",
        published: true,
      },
      {
        userId: 2,
        title: "wonderful title",
        content: "amazing post by Alex",
        picture: "amazingphoto.jpeg",
        published: false,
      },
    ],
  });

  const createdComment = await prisma.comment.createMany({
    data: [
      {
        userId: 1,
        postId: 1,
        content: "amazing comment by Alice",
      },
      {
        userId: 2,
        postId: 2,
        content: "amazing comment by Alex",
      },
    ],
  });

  console.log(`${createdUsers.count} users created`, createdUsers);
  console.log("Profile created", createdProfile);
  console.log("Post created", createdPost);
  console.log("Comment created", createdComment);

  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});

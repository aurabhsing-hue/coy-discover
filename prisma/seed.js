
import { PrismaClient } from "@prisma/client";
import profiles from "../app/data/profiles.js";

const prisma = new PrismaClient();

async function main() {
  for (const profile of profiles) {
    await prisma.profile.upsert({
      where: { id: String(profile.id) },
      update: {},
      create: {
        id: String(profile.id),
        name: profile.name,
        age: profile.age,
        bio: profile.bio,
        city: profile.city,
        photo: profile.photo,
        interests: profile.interests.join(","),
        likedCurrentUser: profile.likedCurrentUser,
      },
    });
  }

  console.log("30 profiles seeded successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

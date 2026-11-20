
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const swipedProfiles = await prisma.swipe.findMany({
      select: {
        profileId: true,
      },
    });

    const swipedIds = swipedProfiles.map(
      (swipe) => swipe.profileId
    );

    const profiles = await prisma.profile.findMany({
      where: {
        id: {
          notIn: swipedIds,
        },
      },
      select: {
        id: true,
        name: true,
        age: true,
        bio: true,
        city: true,
        photo: true,
        interests: true,
      },
    });

    const safeProfiles = profiles.map((profile) => ({
      ...profile,
      interests: profile.interests.split(","),
    }));

    return NextResponse.json(safeProfiles);
  } catch (error) {
    console.error("Feed API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}

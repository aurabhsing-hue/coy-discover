
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { profileId, action } = body;

    // Validate request
    if (!profileId || !["like", "pass"].includes(action)) {
      return NextResponse.json(
        { error: "Valid profileId and action are required" },
        { status: 400 }
      );
    }

    // Check profile exists
    const profile = await prisma.profile.findUnique({
      where: { id: String(profileId) },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    // Prevent duplicate swipes
    const existingSwipe = await prisma.swipe.findUnique({
      where: { profileId: String(profileId) },
    });

    if (existingSwipe) {
      return NextResponse.json(
        { error: "You have already swiped this profile" },
        { status: 409 }
      );
    }

    let match = null;

    await prisma.$transaction(async (tx) => {
      // Save swipe
      await tx.swipe.create({
        data: {
          profileId: String(profileId),
          action,
        },
      });

      // Check mutual like
      if (action === "like" && profile.likedCurrentUser) {
        match = await tx.match.create({
          data: {
            profileId: String(profileId),
          },
        });
      }
    });

    return NextResponse.json({
      success: true,
      action,
      matched: Boolean(match),
      match: match
        ? {
            id: profile.id,
            name: profile.name,
            age: profile.age,
            photo: profile.photo,
          }
        : null,
    });
  } catch (error) {
    console.error("Swipe API error:", error);

    return NextResponse.json(
      { error: "Failed to save swipe" },
      { status: 500 }
    );
  }
}

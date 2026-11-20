
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            age: true,
            bio: true,
            city: true,
            photo: true,
            interests: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = matches.map((item) => ({
      ...item.profile,
      interests: item.profile.interests.split(","),
      matchedAt: item.createdAt,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Matches API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}

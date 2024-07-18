import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("unauthorised", { status: 401 });
  }
  const body = await req.json();
  const { name, imageUrl } = body;

  if (!imageUrl) {
    return new NextResponse("Image URL is required", { status: 400 });
  }

  const note_ids = await db
    .insert($notes)
    .values({
      name,
      userId,
      imageUrl:imageUrl,
    })
    .returning({
      insertedId: $notes.id,
    });

  return NextResponse.json({
    note_id: note_ids[0].insertedId,
  });
}
// app/api/history/save/route.ts
import { NextResponse } from "next/server";
import { addOrUpdateHistory } from "@/app/actions/history";

export async function POST(req: Request) {
  const body = await req.json();
  await addOrUpdateHistory(body.animeInfo, body.email); // update or create history
  return NextResponse.json({ success: true });
}

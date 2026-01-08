import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params; // ⭐ สำคัญมาก (Next.js 14+)

  if (!id) {
    return NextResponse.json({ error: "Missing match id" }, { status: 400 });
  }

  const body = await req.json();

  const { data, error } = await supabase
    .from("matches")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { court_id } = body;

  if (!court_id) {
    return NextResponse.json(
      { error: "court_id is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("matches")
    .update({
      court_id,
      status: "ready",
    })
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

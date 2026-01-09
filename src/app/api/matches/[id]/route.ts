import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const { score_a, score_b } = body;

  if (score_a == null || score_b == null) {
    return NextResponse.json(
      { error: "score_a and score_b are required" },
      { status: 400 }
    );
  }

  const { data: match, error: fetchError } = await supabase
    .from("matches")
    .select("player_a, player_b")
    .eq("id", id)
    .single();

  if (fetchError || !match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  let winner = null;
  if (score_a > score_b) winner = match.player_a;
  if (score_b > score_a) winner = match.player_b;

  const { data, error } = await supabase
    .from("matches")
    .update({
      score_a,
      score_b,
      winner,
      status: "finished",
    })
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

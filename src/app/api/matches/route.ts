import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("matches").select(`
    id,
    round,
    match_order,
    status,
    court_id,
    score_a,
    score_b,
    player_a,
    player_b,
    playerA:player_a ( id, full_name ),
    playerB:player_b ( id, full_name )
  `);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("matches")
    .insert(body)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

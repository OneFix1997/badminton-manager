import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateSingleElimBracket } from "@/lib/bracket";

export async function POST(req: Request) {
  const { tournamentId } = await req.json();

  // 1) ดึงผู้เล่นในทัวร์
  const { data: players, error: playersError } = await supabase
    .from("tournament_players")
    .select("player_id")
    .eq("tournament_id", tournamentId);

  if (playersError || !players || players.length < 2) {
    return NextResponse.json({ error: "Not enough players" }, { status: 400 });
  }

  const playerIds = players.map((p) => p.player_id);

  // 2) สร้าง bracket logic
  const bracket = generateSingleElimBracket(playerIds);

  // 3) แปลงเป็น matches
  const matches = bracket.map((m) => ({
    tournament_id: tournamentId,
    player_a: m.player_a,
    player_b: m.player_b,
    round: `R${m.round}`,
    match_order: m.match_order,
    status: "pending",
  }));

  // 4) บันทึกลง DB
  const { data, error } = await supabase
    .from("matches")
    .insert(matches)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, matches: data });
}

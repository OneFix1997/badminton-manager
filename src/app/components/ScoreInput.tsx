"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";


export default function ScoreInput({ matchId }: { matchId: string }) {
  const [scores, setScores] = useState<{ a?: number; b?: number }[]>([{},{},{}]);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    // decide winner
    const aWins = (scores[0].a ?? 0) + (scores[1].a ?? 0) + (scores[2].a ?? 0);
    const bWins = (scores[0].b ?? 0) + (scores[1].b ?? 0) + (scores[2].b ?? 0);
    // naive decide: check larger total games won; in real: check games count with 2-out-of-3
    const winner = aWins > bWins ? "A" : "B";

    const { data, error } = await supabase.from("matches").update({
      score: scores,
      status: "finished",
      // winner: set to profile id accordingly (need match data)
    }).eq("id", matchId);

    setLoading(false);
    if (error) alert(error.message);
    else alert("Saved");
  };

  return (
    <div className="p-3">
      <h4 className="font-medium mb-2">Enter Score</h4>
      {[0,1,2].map(i => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <input type="number" className="w-16 p-2 border rounded" placeholder="A" value={scores[i].a ?? ""} onChange={e => {
            const v = Number(e.target.value || 0);
            const newS = [...scores]; newS[i] = { ...(newS[i]||{}), a: v }; setScores(newS);
          }} />
          <span>-</span>
          <input type="number" className="w-16 p-2 border rounded" placeholder="B" value={scores[i].b ?? ""} onChange={e => {
            const v = Number(e.target.value || 0);
            const newS = [...scores]; newS[i] = { ...(newS[i]||{}), b: v }; setScores(newS);
          }} />
        </div>
      ))}
      <button disabled={loading} onClick={save} className="mt-2 px-3 py-2 bg-primary-500 text-white rounded">
        Save Score
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";

type Props = {
  matchId: string;
  onAction: () => void; // callback เพื่อรีเฟรช matches
};

export default function ScoreInput({ matchId, onAction }: Props) {
  const [scoreA, setScoreA] = useState<number | "">("");
  const [scoreB, setScoreB] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const saveScore = async () => {
    if (scoreA === "" || scoreB === "") {
      return alert("Please enter both scores");
    }

    setLoading(true);

    await fetch(`/api/matches/${matchId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score_a: Number(scoreA),
        score_b: Number(scoreB),
      }),
    });

    setLoading(false);
    setScoreA("");
    setScoreB("");
    onAction(); // 👈 รีเฟรช matches
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="number"
        className="border px-2 py-1 w-16 rounded"
        placeholder="A"
        value={scoreA}
        onChange={(e) =>
          setScoreA(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
      <span>-</span>
      <input
        type="number"
        className="border px-2 py-1 w-16 rounded"
        placeholder="B"
        value={scoreB}
        onChange={(e) =>
          setScoreB(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      <button
        disabled={loading}
        onClick={saveScore}
        className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

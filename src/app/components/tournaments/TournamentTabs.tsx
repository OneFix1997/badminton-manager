"use client";
import { useState } from "react";

const tabs = ["Players", "Matches", "Courts", "Bracket"] as const;
type Tab = (typeof tabs)[number];

export default function TournamentTabs({
  players,
  matches,
  courts,
  bracket,
}: {
  players: React.ReactNode;
  matches: React.ReactNode;
  courts: React.ReactNode;
  bracket: React.ReactNode;
}) {
  const [active, setActive] = useState<Tab>("Players");

  return (
    <>
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-3 py-2 rounded ${
              active === t ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div>
        {active === "Players" && players}
        {active === "Matches" && matches}
        {active === "Courts" && courts}
        {active === "Bracket" && bracket}
      </div>
    </>
  );
}

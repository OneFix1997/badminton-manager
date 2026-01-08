/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TournamentHeader from "./TournamentHeader";
import TournamentTabs from "./TournamentTabs";
import { PlayersTab } from "./PlayersTab";
import { MatchesTab } from "./MatchesTab";
import { CourtsTab } from "./CourtsTab";
import { BracketTab } from "./BracketTab";
import AppLayout from "../layout/AppLayout";

export default function TournamentPageClient({ tournament }: any) {
  if (!tournament) return <p className="p-6">Tournament not found</p>;

  return (
    <AppLayout>
      <TournamentHeader
        title={tournament.title}
        location={tournament.location}
        status={tournament.status}
      />

      <TournamentTabs
        players={<PlayersTab tournamentId={tournament.id} />}
        matches={<MatchesTab tournamentId={tournament.id} />}
        courts={<CourtsTab tournamentId={tournament.id} />}
        bracket={<BracketTab tournamentId={tournament.id} />}
      />
    </AppLayout>
  );
}

export type BracketMatch = {
  id: string;
  round: number;
  match_order: number;
  player_a?: string;
  player_b?: string;
  winner?: string;
};

export function generateSingleElimBracket(playerIds: string[]) {
  const total = playerIds.length;
  const rounds = Math.ceil(Math.log2(total));
  const bracket: BracketMatch[] = [];

  let currentPlayers = [...playerIds];

  for (let round = 1; round <= rounds; round++) {
    const nextRoundPlayers: string[] = [];

    for (let i = 0; i < currentPlayers.length; i += 2) {
      const a = currentPlayers[i];
      const b = currentPlayers[i + 1];

      bracket.push({
        id: crypto.randomUUID(),
        round,
        match_order: i / 2 + 1,
        player_a: a,
        player_b: b,
      });

      if (!b) nextRoundPlayers.push(a); // bye
    }

    currentPlayers = nextRoundPlayers;
  }

  return bracket;
}

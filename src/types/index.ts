export type Profile = {
  id: string;
  full_name?: string;
  club?: string;
  ranking_points?: number;
};

export type Tournament = {
  id: string;
  title: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
};

export type Category = {
  id: string;
  tournament_id: string;
  name: string;
  max_players: number;
};

export type Registration = {
  id: string;
  category_id: string;
  player1?: Profile;
  player2?: Profile | null;
};

export type Match = {
  id: string;
  category_id: string;
  round: number;
  position: number;
  reg_a?: Registration | null;
  reg_b?: Registration | null;
  court?: string | null;
  scheduled_at?: string | null;
  score?: string;
  winner?: Profile | null;
  status?: string;
};

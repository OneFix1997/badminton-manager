import { supabase } from "@/lib/supabase";
import TournamentPageClient from "@/app/components/tournaments/TournamentPageClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function TournamentPage({ params }: PageProps) {
  const { id } = await params;

  const { data: tournament } = await supabase
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .single();

  if (!tournament) {
    return <div className="p-6">Tournament not found</div>;
  }

  return <TournamentPageClient tournament={tournament} />;
}

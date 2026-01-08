import { Registration, Match } from "../types";
import { v4 as uuidv4 } from "uuid";

/**
 * createBracket: รับ list of registrations (length may be not power of 2)
 * คืน array of matches (round: 1..n), position index for ordering.
 */
export function createSingleEliminationBracket(regs: Registration[]): Match[] {
  // Make players slots byes included
  const nextPow2 = (n: number) => 1 << Math.ceil(Math.log2(n));
  const slots = nextPow2(regs.length);
  const filled: (Registration | null)[] = [...regs, ...Array(slots - regs.length).fill(null)];

  const matches: Match[] = [];
  const rounds = Math.log2(slots);

  // Round 1 matches
  let position = 1;
  for (let i = 0; i < slots / 2; i++) {
    const a = filled[i];
    const b = filled[slots - 1 - i];
    matches.push({
      id: uuidv4(),
      category_id: "", // set later
      round: 1,
      position: position++,
      reg_a: a ?? undefined,
      reg_b: b ?? undefined,
      status: a && b ? "scheduled" : a || b ? "scheduled" : "bye"
    } as unknown as Match);
  }

  // higher rounds (placeholders)
  for (let r = 2; r <= rounds; r++) {
    const matchesInRound = slots / (2 ** r);
    for (let m = 0; m < matchesInRound; m++) {
      matches.push({
        id: uuidv4(),
        category_id: "",
        round: r,
        position: position++,
        reg_a: undefined,
        reg_b: undefined,
        status: "pending"
      } as unknown as Match);
    }
  }
  return matches;
}

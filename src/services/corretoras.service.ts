import { http } from "./http";
import type { Corretora } from "@/types/corretora";

const RESOURCE = "/cvm/corretoras/v1";

function dedupeByCnpj(corretoras: Corretora[]): Corretora[] {
  const unique = new Map<string, Corretora>();
  for (const corretora of corretoras) {
    if (!unique.has(corretora.cnpj)) {
      unique.set(corretora.cnpj, corretora);
    }
  }
  return Array.from(unique.values());
}

export async function getCorretoras(): Promise<Corretora[]> {
  const { data } = await http.get<Corretora[]>(RESOURCE);
  return dedupeByCnpj(data);
}

export async function getCorretoraByCnpj(cnpj: string): Promise<Corretora> {
  const { data } = await http.get<Corretora>(`${RESOURCE}/${cnpj}`);
  return data;
}

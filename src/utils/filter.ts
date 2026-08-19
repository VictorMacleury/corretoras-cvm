import type { Corretora } from "@/types/corretora";
import { normalize, onlyDigits } from "./text";

/** Filtra por nome comercial, razão social (nome_social), CNPJ e situação. */
export function filterCorretoras(
  corretoras: Corretora[],
  term: string,
  status: string,
): Corretora[] {
  const text = normalize(term);
  const digits = onlyDigits(term);
  // Só busca por CNPJ quando o termo não tem letras — senão "4um" casaria pelo dígito "4".
  const isCnpjQuery = digits.length > 0 && !/[a-z]/.test(text);
  const hasQuery = text.length > 0 || digits.length > 0;

  return corretoras.filter((corretora) => {
    if (status && corretora.status !== status) return false;
    if (!hasQuery) return true;

    const matchesName =
      text.length > 0 &&
      (normalize(corretora.nome_comercial).includes(text) ||
        normalize(corretora.nome_social).includes(text));
    const matchesCnpj = isCnpjQuery && corretora.cnpj.includes(digits);

    return matchesName || matchesCnpj;
  });
}

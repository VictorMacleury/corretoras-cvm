import { onlyDigits } from "./text";

const EMPTY = "—";

export function formatCnpj(cnpj: string): string {
  const digits = onlyDigits(cnpj).padStart(14, "0");
  if (digits.length !== 14) return cnpj || EMPTY;
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5",
  );
}

export function formatCep(cep: string): string {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) return cep || EMPTY;
  return digits.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export function formatTelefone(telefone: string): string {
  const digits = onlyDigits(telefone);
  if (digits.length === 11) return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  if (digits.length === 10) return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  if (digits.length === 9) return digits.replace(/^(\d{5})(\d{4})$/, "$1-$2");
  if (digits.length === 8) return digits.replace(/^(\d{4})(\d{4})$/, "$1-$2");
  return telefone || EMPTY;
}

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCurrency(value: string): string {
  const parsed = Number(value);
  if (!value || Number.isNaN(parsed)) return EMPTY;
  return currency.format(parsed);
}

export function formatDate(value: string): string {
  if (!value) return EMPTY;
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

export function formatText(value: string): string {
  return value && value.trim() ? value : EMPTY;
}

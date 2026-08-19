import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_BRASIL_API_URL ?? "https://brasilapi.com.br/api";

export const http = axios.create({
  baseURL,
  timeout: 15000,
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 404) {
        return "Nenhuma corretora encontrada para os dados informados.";
      }
      return `A Brasil API respondeu com o status ${error.response.status}.`;
    }
    if (error.code === "ECONNABORTED") {
      return "O tempo de conexão esgotou. Tente novamente.";
    }
    return "Não foi possível conectar à Brasil API. Verifique sua conexão.";
  }
  return "Ocorreu um erro inesperado ao carregar os dados.";
}

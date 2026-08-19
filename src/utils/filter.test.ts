import { describe, it, expect } from "vitest";
import { filterCorretoras } from "./filter";
import type { Corretora } from "@/types/corretora";

function makeCorretora(overrides: Partial<Corretora>): Corretora {
  return {
    cnpj: "00000000000000",
    type: "CORRETORAS",
    nome_social: "",
    nome_comercial: "",
    status: "EM FUNCIONAMENTO NORMAL",
    email: "",
    telefone: "",
    cep: "",
    pais: "",
    uf: "",
    municipio: "",
    bairro: "",
    complemento: "",
    logradouro: "",
    codigo_cvm: "",
    data_patrimonio_liquido: "",
    valor_patrimonio_liquido: "",
    data_inicio_situacao: "",
    data_registro: "",
    ...overrides,
  };
}

const corretoras: Corretora[] = [
  makeCorretora({
    cnpj: "02332886000104",
    nome_comercial: "XP INVESTIMENTOS",
    nome_social: "XP INVESTIMENTOS CCTVM S.A.",
    status: "EM FUNCIONAMENTO NORMAL",
  }),
  makeCorretora({
    cnpj: "33817677000176",
    nome_comercial: "ABC BRASIL DTVM",
    nome_social: "BANCO ABC BRASIL S.A.",
    status: "CANCELADA",
  }),
  makeCorretora({
    cnpj: "92856905000186",
    nome_comercial: "AÇÃO CORRETORA",
    nome_social: "AÇÃO S.A. CVC",
    status: "EM FUNCIONAMENTO NORMAL",
  }),
];

describe("filterCorretoras", () => {
  it("retorna todas quando não há termo nem situação", () => {
    expect(filterCorretoras(corretoras, "", "")).toHaveLength(3);
  });

  it("busca por nome comercial ignorando a caixa", () => {
    const result = filterCorretoras(corretoras, "xp", "");
    expect(result).toHaveLength(1);
    expect(result[0].nome_comercial).toBe("XP INVESTIMENTOS");
  });

  it("busca pela razão social (nome_social)", () => {
    const result = filterCorretoras(corretoras, "banco abc", "");
    expect(result).toHaveLength(1);
    expect(result[0].cnpj).toBe("33817677000176");
  });

  it("busca por nome ignorando acentos", () => {
    const result = filterCorretoras(corretoras, "acao", "");
    expect(result).toHaveLength(1);
    expect(result[0].nome_comercial).toBe("AÇÃO CORRETORA");
  });

  it("busca por CNPJ com ou sem máscara", () => {
    expect(filterCorretoras(corretoras, "02.332.886", "")).toHaveLength(1);
    expect(filterCorretoras(corretoras, "02332886", "")).toHaveLength(1);
  });

  it("filtra por situação", () => {
    expect(filterCorretoras(corretoras, "", "EM FUNCIONAMENTO NORMAL")).toHaveLength(2);
    expect(filterCorretoras(corretoras, "", "CANCELADA")).toHaveLength(1);
  });

  it("combina busca e situação", () => {
    expect(filterCorretoras(corretoras, "xp", "CANCELADA")).toHaveLength(0);
    expect(filterCorretoras(corretoras, "xp", "EM FUNCIONAMENTO NORMAL")).toHaveLength(1);
  });

  it("retorna vazio quando nada corresponde", () => {
    expect(filterCorretoras(corretoras, "inexistente", "")).toHaveLength(0);
  });

  it("não casa pelo dígito quando o termo tem letras (ex.: 4um)", () => {
    const dados = [
      makeCorretora({
        cnpj: "24361690000172",
        nome_comercial: "4UM INVESTIMENTOS",
        nome_social: "4UM INVESTIMENTOS DTVM S.A.",
      }),
      makeCorretora({ cnpj: "02332886000104", nome_comercial: "XP INVESTIMENTOS" }),
    ];
    const result = filterCorretoras(dados, "4um", "");
    expect(result).toHaveLength(1);
    expect(result[0].nome_comercial).toBe("4UM INVESTIMENTOS");
  });
});

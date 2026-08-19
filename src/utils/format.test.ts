import { describe, it, expect } from "vitest";
import {
  formatCep,
  formatCnpj,
  formatCurrency,
  formatDate,
  formatTelefone,
  formatText,
} from "./format";

describe("formatCnpj", () => {
  it("formata 14 dígitos", () => {
    expect(formatCnpj("02332886000104")).toBe("02.332.886/0001-04");
  });

  it("completa com zeros à esquerda", () => {
    expect(formatCnpj("2332886000104")).toBe("02.332.886/0001-04");
  });
});

describe("formatCep", () => {
  it("formata 8 dígitos", () => {
    expect(formatCep("22440032")).toBe("22440-032");
  });

  it("retorna traço quando vazio", () => {
    expect(formatCep("")).toBe("—");
  });
});

describe("formatTelefone", () => {
  it("formata celular com 11 dígitos", () => {
    expect(formatTelefone("11987654321")).toBe("(11) 98765-4321");
  });

  it("formata fixo com 10 dígitos", () => {
    expect(formatTelefone("1133334444")).toBe("(11) 3333-4444");
  });

  it("formata número local de 8 dígitos", () => {
    expect(formatTelefone("40033710")).toBe("4003-3710");
  });
});

describe("formatCurrency", () => {
  it("formata valor em reais", () => {
    expect(formatCurrency("5514593491.29")).toContain("5.514.593.491,29");
  });

  it("retorna traço para valores inválidos", () => {
    expect(formatCurrency("")).toBe("—");
    expect(formatCurrency("abc")).toBe("—");
  });
});

describe("formatDate", () => {
  it("converte ISO para dd/mm/aaaa", () => {
    expect(formatDate("1998-02-10")).toBe("10/02/1998");
  });

  it("retorna traço quando vazio", () => {
    expect(formatDate("")).toBe("—");
  });
});

describe("formatText", () => {
  it("retorna traço para texto vazio", () => {
    expect(formatText("")).toBe("—");
    expect(formatText("   ")).toBe("—");
  });

  it("mantém texto preenchido", () => {
    expect(formatText("XP INVESTIMENTOS")).toBe("XP INVESTIMENTOS");
  });
});

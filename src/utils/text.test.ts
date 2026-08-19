import { describe, it, expect } from "vitest";
import { normalize, onlyDigits } from "./text";

describe("normalize", () => {
  it("remove acentos e converte para minúsculas", () => {
    expect(normalize("São Paulo")).toBe("sao paulo");
    expect(normalize("CÂMBIO")).toBe("cambio");
  });

  it("remove espaços nas extremidades", () => {
    expect(normalize("  Ação  ")).toBe("acao");
  });
});

describe("onlyDigits", () => {
  it("mantém apenas dígitos", () => {
    expect(onlyDigits("02.332.886/0001-04")).toBe("02332886000104");
    expect(onlyDigits("abc123def")).toBe("123");
  });
});

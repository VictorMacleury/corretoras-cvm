import { describe, it, expect } from "vitest";
import { formatStatusLabel, statusChipColor } from "./status";

describe("statusChipColor", () => {
  it("usa verde para funcionamento normal", () => {
    expect(statusChipColor("EM FUNCIONAMENTO NORMAL")).toBe("success");
  });

  it("usa vermelho para cancelada ou suspensa", () => {
    expect(statusChipColor("CANCELADA")).toBe("error");
    expect(statusChipColor("SUSPENSA")).toBe("error");
  });

  it("usa default para as demais situações", () => {
    expect(statusChipColor("EM ANÁLISE")).toBe("default");
  });
});

describe("formatStatusLabel", () => {
  it("converte a situação para caixa de sentença", () => {
    expect(formatStatusLabel("EM FUNCIONAMENTO NORMAL")).toBe(
      "Em funcionamento normal",
    );
    expect(formatStatusLabel("CANCELADA")).toBe("Cancelada");
  });
});

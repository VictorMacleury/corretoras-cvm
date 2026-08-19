import { describe, it, expect } from "vitest";
import { PAGE_SIZE, pageCount, paginate } from "./pagination";

const items = Array.from({ length: 30 }, (_, index) => index + 1);

describe("paginate", () => {
  it("retorna a fatia correspondente à página", () => {
    expect(paginate(items, 1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(paginate(items, 2, 10)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(paginate(items, 3, 10)).toEqual([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
  });

  it("usa o tamanho de página padrão", () => {
    expect(paginate(items, 1)).toHaveLength(PAGE_SIZE);
  });

  it("retorna vazio para páginas fora do intervalo", () => {
    expect(paginate(items, 99, 10)).toEqual([]);
  });
});

describe("pageCount", () => {
  it("calcula o número de páginas", () => {
    expect(pageCount(30, 10)).toBe(3);
    expect(pageCount(31, 10)).toBe(4);
  });

  it("retorna no mínimo uma página", () => {
    expect(pageCount(0, 10)).toBe(1);
  });
});

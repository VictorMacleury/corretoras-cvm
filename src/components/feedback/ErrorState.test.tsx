import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("exibe a mensagem de erro", () => {
    render(<ErrorState message="Falha ao carregar" />);
    expect(screen.getByText("Falha ao carregar")).toBeInTheDocument();
  });

  it("chama onRetry ao clicar em tentar novamente", async () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Erro" onRetry={onRetry} />);

    await userEvent.click(
      screen.getByRole("button", { name: /tentar novamente/i }),
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("não renderiza o botão quando onRetry não é informado", () => {
    render(<ErrorState message="Erro" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

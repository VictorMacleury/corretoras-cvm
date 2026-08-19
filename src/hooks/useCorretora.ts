"use client";

import { useCallback, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { corretorasAtom } from "@/store/corretoras.atoms";
import { getCorretoraByCnpj } from "@/services/corretoras.service";
import { getErrorMessage } from "@/services/http";
import type { Corretora } from "@/types/corretora";
import type { RequestStatus } from "@/types/request";

export function useCorretora(cnpj: string) {
  const cached = useAtomValue(corretorasAtom).find((item) => item.cnpj === cnpj);
  const [fetched, setFetched] = useState<Corretora | null>(null);
  const [status, setStatus] = useState<RequestStatus>(cached ? "success" : "loading");
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setStatus("loading");
    setError(null);
    getCorretoraByCnpj(cnpj)
      .then((data) => {
        setFetched(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(getErrorMessage(err));
        setStatus("error");
      });
  }, [cnpj]);

  useEffect(() => {
    if (cached) return;

    let ignore = false;
    getCorretoraByCnpj(cnpj)
      .then((data) => {
        if (ignore) return;
        setFetched(data);
        setStatus("success");
      })
      .catch((err) => {
        if (ignore) return;
        setError(getErrorMessage(err));
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [cnpj, cached]);

  const corretora = cached ?? fetched;

  return { corretora, status, error, reload };
}

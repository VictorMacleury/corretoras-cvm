"use client";

import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { corretorasAtom } from "@/store/corretoras.atoms";
import { getCorretoras } from "@/services/corretoras.service";
import { getErrorMessage } from "@/services/http";
import type { RequestStatus } from "@/types/request";

export function useCorretoras() {
  const [corretoras, setCorretoras] = useAtom(corretorasAtom);
  const hasData = corretoras.length > 0;
  const [status, setStatus] = useState<RequestStatus>(hasData ? "success" : "loading");
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setStatus("loading");
    setError(null);
    getCorretoras()
      .then((data) => {
        setCorretoras(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(getErrorMessage(err));
        setStatus("error");
      });
  }, [setCorretoras]);

  useEffect(() => {
    if (hasData) return;

    let ignore = false;
    getCorretoras()
      .then((data) => {
        if (ignore) return;
        setCorretoras(data);
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
  }, [hasData, setCorretoras]);

  return { status, error, reload };
}

import { atom } from "jotai";
import type { Corretora } from "@/types/corretora";
import { filterCorretoras } from "@/utils/filter";
import { pageCount, paginate } from "@/utils/pagination";

export const corretorasAtom = atom<Corretora[]>([]);

export const searchTermAtom = atom("");
export const statusFilterAtom = atom("");
export const pageAtom = atom(1);

export const setSearchTermAtom = atom(null, (_get, set, value: string) => {
  set(searchTermAtom, value);
  set(pageAtom, 1);
});

export const setStatusFilterAtom = atom(null, (_get, set, value: string) => {
  set(statusFilterAtom, value);
  set(pageAtom, 1);
});

export const statusOptionsAtom = atom((get) => {
  const statuses = new Set(
    get(corretorasAtom)
      .map((corretora) => corretora.status)
      .filter(Boolean),
  );
  return Array.from(statuses).sort();
});

export const filteredCorretorasAtom = atom((get) =>
  filterCorretoras(
    get(corretorasAtom),
    get(searchTermAtom),
    get(statusFilterAtom),
  ),
);

export const pageCountAtom = atom((get) =>
  pageCount(get(filteredCorretorasAtom).length),
);

export const paginatedCorretorasAtom = atom((get) =>
  paginate(get(filteredCorretorasAtom), get(pageAtom)),
);

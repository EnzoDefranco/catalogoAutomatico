"use client";
import useSWR from "swr";
const fetcher = url => fetch(url).then(r=>r.json());

export default function useFacets() {
  const { data, error } = useSWR("/api/products/facets", fetcher);
  return {
    data,                    // { brands: [...], categories: [...] }
    isLoading: !error && !data,
    isError: !!error
  };
}

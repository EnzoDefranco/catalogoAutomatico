// hooks/useProducts.js
"use client";
import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());

export default function useProducts(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach(v => params.append(key, v));
    } else if (val != null && val !== "") {
      params.append(key, val);
    }
  });

  const { data, error } = useSWR(`/api/products?${params.toString()}`, fetcher);

  return {
    products: data?.data ?? [],         // ¡nunca undefined!
    total:    data?.meta?.total ?? 0,
    isLoading: !error && !data,
    isError:   !!error
  };
}

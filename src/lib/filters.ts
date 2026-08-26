export type ItemsSearchParams = {
  q?: string;
  category?: string;
  condition?: string;
  sort?: string;
};

export function buildItemsHref(
  current: ItemsSearchParams,
  overrides: Partial<Record<keyof ItemsSearchParams, string | undefined>>
) {
  const merged: ItemsSearchParams = { ...current, ...overrides };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.category) params.set("category", merged.category);
  if (merged.condition) params.set("condition", merged.condition);
  if (merged.sort && merged.sort !== "newest") params.set("sort", merged.sort);
  const qs = params.toString();
  return `/items${qs ? `?${qs}` : ""}`;
}

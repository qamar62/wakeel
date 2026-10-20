// Fills {placeholders} in a content string: fill("AED {n}k", { n: 92 }) -> "AED 92k"
export const fill = (t: string, v: Record<string, string | number>) =>
  t.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? ""));

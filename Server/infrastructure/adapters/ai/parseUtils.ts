export * from '../../../src/infrastructure/adapters/ai/parseUtils';

export function extractFirstJSONArray(text: string): string | null {
  const start = text.indexOf('[');
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

export function parseOptionsFromText(raw: string): string[] {
  const cleaned = raw.replace(/```[\s\S]*?```/g, '').trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {}
  const extracted = extractFirstJSONArray(raw) || extractFirstJSONArray(cleaned);
  if (extracted) {
    try {
      const parsed = JSON.parse(extracted);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {}
  }
  return cleaned
    .split(/\r?\n/)
    .map(l => l.replace(/^\s*[-\d\.\)\s]*/, '').trim())
    .filter(Boolean)
    .map(l => l.replace(/^['"]|['"]$/g, ''))
    .filter(l => l.length > 0);
}

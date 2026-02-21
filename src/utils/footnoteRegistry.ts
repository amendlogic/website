const footnoteMap = new Map<string, number>();

export function registerFootnote(key: string) {
  if (!footnoteMap.has(key)) {
    footnoteMap.set(key, footnoteMap.size + 1);
  }
  return footnoteMap.get(key);
}

export function getFootnotes() {
  return Array.from(footnoteMap.entries());
}

export function resetFootnotes() {
  footnoteMap.clear();
}

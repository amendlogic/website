const autoFootnotes = new Set<string>();
let manualOrder: string[] = [];

export function registerFootnote(key: string) {
  autoFootnotes.add(key);
}

export function setManualFootnotes(keys: string[]) {
  manualOrder = keys;
}

export function getFootnotes() {
  const result: string[] = [];

  // 1️⃣ Zuerst manuelle Reihenfolge
  manualOrder.forEach(key => {
    if (!result.includes(key)) {
      result.push(key);
    }
  });

  // 2️⃣ Danach automatisch registrierte,
  // die nicht manuell definiert wurden
  autoFootnotes.forEach(key => {
    if (!result.includes(key)) {
      result.push(key);
    }
  });

  // 3️⃣ Nummerierung erzeugen
  return result.map((key, index) => [key, index + 1] as [string, number]);
}

export function resetFootnotes() {
  autoFootnotes.clear();
  manualOrder = [];
}
export const HISTORY_CATEGORIES = ["participants", "invoices", "products"];

export class ActivityHistory {
  #entries = [];
  #nextId = 1;

  add(category, key, params = {}, at = new Date()) {
    if (!HISTORY_CATEGORIES.includes(category)) {
      throw new Error("Categoria de histórico inválida.");
    }
    const entry = { id: `history-${this.#nextId++}`, category, key, params, at };
    this.#entries.push(entry);
    return { ...entry };
  }

  // Mais recentes primeiro; "all" (ou filtro desconhecido) devolve tudo.
  list(filter = "all") {
    const entries = HISTORY_CATEGORIES.includes(filter)
      ? this.#entries.filter(({ category }) => category === filter)
      : this.#entries;
    return entries.map((entry) => ({ ...entry })).reverse();
  }
}

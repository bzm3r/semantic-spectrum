export type Meaning = {
  // How collection-like is this label?
  collection: number;
  // How terminal-like (e.g. literal) is this label?
  terminal: number;
  // How mechanism-like (algorithm, function) is this label?
  mechanism: number;
  // How placeholder-like is this label?
  placeholder: number;
};

export interface Identifier {
  isMatch(other: Identifier): boolean;
}

export interface Semantic<T> {
  data: T;
  info: Meaning;
}

export interface Semantic<T> {
  label: String;
  data: T;
}

export type Library<T> = Map<Identifier, Semantic<T>>;

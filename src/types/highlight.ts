import { PathLike } from "fs";
import { Library, Meaning } from "./semantics";
import { Coloring } from "./coloring";

export interface HightlightTheme {
  name: String;
  baseSemantics: Library<Coloring>;
  modifierSemantics: Library<Coloring>;
  // fallbackSemantics?
}

export interface HighlightThemeFamily {
  readmeOut: PathLike;
  readmeTemplate: PathLike;
  main: HightlightTheme;
  derived: Array<HightlightTheme>;
}

export interface Relativistic {
  // Normalize this Meaning relative to a baseline
  normalize: (baseline: Meaning) => Meaning;
}

export type StandardTokenColors<T> = {
  // For identifiers that declare or reference a namespace, module, or package.
  namespace: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference a class type.
  class: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference an enumeration type.
  enum: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference an interface type.
  interface: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference a struct type.
  struct: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference a type parameter.
  typeParameter: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference a type that is not covered above.
  type: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference a function or method parameters.
  parameter: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference a local or global variable.
  variable: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference a member property, member field, or member variable.
  property: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference an enumeration property, constant, or member.
  enumMember: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare or reference decorators and annotations.
  decorator: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare an event property.
  event: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare a function.
  function: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare a member function or method.
  method: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare a macro.
  macro: { data: T; modifiers: Array<StandardModifier<T>> };
  // For identifiers that declare a label.
  label: { data: T; modifiers: Array<StandardModifier<T>> };
  // For tokens that represent a comment.
  comment: { data: T; modifiers: Array<StandardModifier<T>> };
  // For tokens that represent a string literal.
  string: { data: T; modifiers: Array<StandardModifier<T>> };
  // For tokens that represent a language keyword.
  keyword: { data: T; modifiers: Array<StandardModifier<T>> };
  // For tokens that represent a number literal.
  number: { data: T; modifiers: Array<StandardModifier<T>> };
  // For tokens that represent a regular expression literal.
  regexp: { data: T; modifiers: Array<StandardModifier<T>> };
  // For tokens that represent an operator.
  operator: { data: T; modifiers: Array<StandardModifier<T>> };
};

export interface CustomModifier<T> {
  label: String;
  data: T;
}

export type StandardModifier<T> = {
  //	For declarations of symbols.
  declaration: T;
  //	For definitions of symbols, for example, in header files.
  definition: T;
  //	For readonly variables and member fields (constants).
  readonly: T;
  //	For class members (static members).
  static: T;
  //	For symbols that should no longer be used.
  deprecated: T;
  //	For types and member functions that are abstract.
  abstract: T;
  //	For functions that are marked async.
  async: T;
  //	For variable references where the variable is assigned to.
  modification: T;
  //	For occurrences of symbols in documentation.
  documentation: T;
  //	For symbols that are part of the standard library.
  defaultLibrary: T;
};

export type SemanticTokenScopes = {
  "parameter": [
    "variable.parameter.function",
    "variable.parameter",
    "variable.parameter.function-call",
    "meta.function.parameter",
    "meta.function.parameters",
  ];
  "function": [
    "entity.name.function",
    "meta.function-call",
    "entity.name.command",
  ];
  "variable": [
    "variable.other.readwrite",
    "variable.other",
    "variable",
    "support.variable",
    "string.other.link.title.markdown",
  ];
  "variable.readonly": [
    "entity.name.tag",
  ];
  "macro": [
    "entity.name.other.preprocessor.macro",
  ];
  "macro.defaultLibrary": [
    "entity.name.other.preprocessor.macro.predefined",
  ];
  "variable.declaration": [
    "variable.other.assignment.shell",
  ];
  "type": [
    "entity.name.type.alias",
    "support.type",
    "markup.italic.markdown",
    "entity.name.type.kotlin",
  ];
  "type.readonly": [
    "markup.bold.markdown",
  ];
  "interface.readonly": [
    "comment.line.double-dash.doc variable",
  ];
  "type.defaultLibrary.static.async": [
    "markup.strikethrough.markdown",
  ];
  "type.static": [
    "markup.math.inline.markdown",
    "entity.name.type.cpp",
    "entity.name.type.parameter",
  ];
  "type.async": [
    "support.type.primitive",
    "storage.type.built-in.primitive",
    "support.type.builtin",
  ];
  "type.defaultLibrary": [
    "support.type.built-in",
    "comment.line.double-dash.doc support.type",
  ];
  "function.static": [
    "storage.type.template",
  ];
  "typeParameter": [
    "entity.name.type.template",
    "storage.type.template.argument",
  ];
  "namespace": [
    "meta.symbol.namespace",
    "entity.name.scope-resolution",
  ];
  "class.defaultLibrary": [
    "support.class",
  ];
  "function:lua": [
    "support.function.any-method",
  ];
  "function.defaultLibrary": [
    "support.function.builtin",
    "support.function.misc",
    "support.function",
    "keyword.operator.cast.static_cast",
    "entity.name.function.definition.special",
  ];
  "property.readonly": [
    "markup.list.numbered.markdown",
  ];
  "property": [
    "variable.other.property",
    "support.variable.property",
    "variable.other.object.property",
    "variable.other.table.property",
    "meta.attribute",
    "constant.other.option",
    "support.type.property-name",
    "variable.object.property",
    "meta.flow-mapping.yaml",
    "entity.other.attribute",
    "support.type.property-name.css",
    "meta.property-name",
    "entity.other.attribute-name",
    "entity.name.tag.yaml",
    "markup.list.unnumbered.markdown",
  ];
  "class": [
    "entity.name.type.class",
    "entity.name.class",
    "entity.other.inherited-class",
    "entity.name.function-table",
    "entity.other.attribute-name.class",
  ];
  "method": [
    "meta.directive.vue",
    "entity.name.method-function",
    "entity.other.attribute-name.pseudo-class",
    "entity.name.function.member",
  ];
  "selfParameter": [
    "variable.language.this",
    "variable.language.self",
    "variable.language.special.self",
  ];
  "variable.defaultLibrary.readonly": [
    "const",
  ];
};

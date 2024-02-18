import { Instance } from "tinycolor2";

export interface Meaning {
  [prop: string]: number;
}

export interface TokenMeaning extends Meaning {
  // How collection-like is this selector?
  collection: number;
  // How literal-like is this selector?
  literal: number;
  // How action-like (algorithm, function) is this selector?
  action: number;
  // How placeholder-like (e.g. variable) is this selector?
  placeholder: number;
}

export interface UiMeaning extends Meaning {}

export type Selector = string | Array<string>;

export interface Library<T> {
  [selector: string]: T;
}

export type Coloring = Instance;

export type ScopesEntry = {
  language?: string;
  scopes: Library<Selector>;
};
export type SemanticTokenScopes = Array<ScopesEntry>;

function assertIsTokenScopes(obj: any): asserts obj is SemanticTokenScopes {
  let array = obj as Array<ScopesEntry>;
}

export const knownSemanticTokenScopes: SemanticTokenScopes = [
  {
    scopes: {
      parameter: [
        "variable.parameter.function",
        "variable.parameter",
        "variable.parameter.function-call",
        "meta.function.parameter",
        "meta.function.parameters",
      ],
      function: [
        "entity.name.function",
        "meta.function-call",
        "entity.name.command",
      ],
      variable: [
        "variable.other.readwrite",
        "variable.other",
        "variable",
        "support.variable",
        "string.other.link.title.markdown",
      ],
      "variable.readonly": ["entity.name.tag"],
      macro: ["entity.name.other.preprocessor.macro"],
      "macro.defaultLibrary": [
        "entity.name.other.preprocessor.macro.predefined",
      ],
      "variable.declaration": ["variable.other.assignment.shell"],
      type: [
        "entity.name.type.alias",
        "support.type",
        "markup.italic.markdown",
        "entity.name.type.kotlin",
      ],
      "type.readonly": ["markup.bold.markdown"],
      "interface.readonly": ["comment.line.double-dash.doc variable"],
      "type.defaultLibrary.static.async": ["markup.strikethrough.markdown"],
      "type.static": [
        "markup.math.inline.markdown",
        "entity.name.type.cpp",
        "entity.name.type.parameter",
      ],
      "type.async": [
        "support.type.primitive",
        "storage.type.built-in.primitive",
        "support.type.builtin",
      ],
      "type.defaultLibrary": [
        "support.type.built-in",
        "comment.line.double-dash.doc support.type",
      ],
      "function.static": ["storage.type.template"],
      typeParameter: [
        "entity.name.type.template",
        "storage.type.template.argument",
      ],
      namespace: ["meta.symbol.namespace", "entity.name.scope-resolution"],
      "class.defaultLibrary": ["support.class"],
      "function:lua": ["support.function.any-method"],
      "function.defaultLibrary": [
        "support.function.builtin",
        "support.function.misc",
        "support.function",
        "keyword.operator.cast.static_cast",
        "entity.name.function.definition.special",
      ],
      "property.readonly": ["markup.list.numbered.markdown"],
      property: [
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
      ],
      class: [
        "entity.name.type.class",
        "entity.name.class",
        "entity.other.inherited-class",
        "entity.name.function-table",
        "entity.other.attribute-name.class",
      ],
      method: [
        "meta.directive.vue",
        "entity.name.method-function",
        "entity.other.attribute-name.pseudo-class",
        "entity.name.function.member",
      ],
      selfParameter: [
        "variable.language.this",
        "variable.language.self",
        "variable.language.special.self",
      ],
      "variable.defaultLibrary.readonly": ["const"],
    },
  },
];

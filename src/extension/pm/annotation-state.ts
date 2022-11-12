import { EditorState, Transaction } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

import { AnnotationDecoration } from "./annotation-decoration";
import { AnnotationPluginKey } from "./annotation-plugin";
import {
  AddAnnotationAction,
  DeleteAnnotationAction,
  RenderStyles,
  UpdateAnnotationAction,
} from "../annotation-magic";
import { createAnnotationRendering } from "../rendering/engine";
import { Annotation } from "../../contracts";

interface AnnotationStateOptions<K> {
  styles: RenderStyles;
  map: Map<string, Annotation<K>>;
  instance: string;
  onAnnotationListChange: (items: Annotation<K>[]) => void;
  onSelectionChange: (items: Annotation<K>[]) => void;
}

export class AnnotationState<K> {
  options: AnnotationStateOptions<K>;

  decorations = DecorationSet.empty;

  constructor(options: AnnotationStateOptions<K>) {
    this.options = options;
  }

  randomId() {
    return Math.floor(Math.random() * 0xffffffff).toString();
  }

  addAnnotation(action: AddAnnotationAction<K>) {
    const { map } = this.options;
    const { from, to, data } = action;

    const id = this.randomId();

    map.set(id, { id, from, to, data });
  }

  updateAnnotation(action: UpdateAnnotationAction<K>) {
    const { map } = 
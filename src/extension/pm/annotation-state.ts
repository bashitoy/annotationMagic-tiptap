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
    const { map } = this.options;

    const annotationToUpdate = map.get(action.id);

    if (annotationToUpdate) {
      annotationToUpdate.data = action.data;
    }
  }

  deleteAnnotation(id: string) {
    const { map } = this.options;

    map.delete(id);
  }

  termsAt(position: number, to?: number): Annotation<K>[] {
    return this.decorations.find(position, to || position).map((decoration) => {
      return new AnnotationDecoration(decoration);
    });
  }

  allAnnotations(): Annotation<K>[] {
    const { map } = this.options;
    return Array.from(map.entries(), ([_, value]) => {
      return value;
    });
  }

  createDecorations(state: EditorState) {
    const { map, styles } = this.options;
    const decorations: Decoration[] = [];

    // only terms, not connectives, are rendered
    const termList = Array.from(map, ([key, value]) => {
      return { ...value, id: key };
    }).filter((value) => {
      return "from" in value && "to" in value;
    });

    const annotationRendering = createAnnotationRendering(termList);

    annotationRendering.forEach((annotation) => {
      const from = annotation.from;
      const to = annotation.to;

      // eslint-disable-next-line
      console.log(`[${this.options.instance}] Decoration.inline()`, from, to, {
        id: annotation.id,
        data: annotation,
      });

      
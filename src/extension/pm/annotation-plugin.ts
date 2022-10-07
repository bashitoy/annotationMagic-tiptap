
import { Plugin, PluginKey } from "@tiptap/pm/state";

import { AnnotationState } from "./annotation-state";
import { RenderStyles } from "../annotation-magic";
import { Annotation } from "../../contracts";

export const AnnotationPluginKey = new PluginKey("annotation-magic");
export interface AnnotationPluginOptions<K> {
  styles: RenderStyles;
  onSelectionChange: (items: Annotation<K>[]) => void;
  onAnnotationListChange: (items: Annotation<K>[]) => void;
  instance: string;
}

export const AnnotationPlugin = <K>(options: AnnotationPluginOptions<K>) =>
  new Plugin({
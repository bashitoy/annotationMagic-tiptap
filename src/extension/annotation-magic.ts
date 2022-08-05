import { Extension } from "@tiptap/core";
import { AnnotationPlugin, AnnotationPluginKey } from "./pm/annotation-plugin";
import { Annotation } from "../contracts";

export interface RenderStyles {
  rightFragment: string;
  leftFragment: string;
  normal: string;
  middleFragment: string;
}

export interface AddAnnotationAction<K> {
  type: "addAnnotation";
  from: number;
  to: number;
  data: K;
}

export interface UpdateAnnotationAction<K> {
  type: "updateAnnotation";
  id: string;
  data: K;
}

export interface DeleteAnnotationAction {
  type: "deleteAnnotation";
  id: string;
}

interface AnnotationOptions<K> {
  styles: RenderStyles;
  /**
   * An event listener which receives annotations for the current selection.
   */
  onSelectionChange: (items: Annotation<K>[]) => void;
  /**
   * An event listener which receives all annotations.
   */
  onAnnotationListChange: (items: Annotation<K>[]
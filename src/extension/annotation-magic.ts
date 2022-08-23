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
  onAnnotationListChange: (items: Annotation<K>[]) => void;
  instance: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    annotation: {
      addAnnotation: (data: any) => ReturnType;
      updateAnnotation: (id: string, data: any) => ReturnType;
      deleteAnnotation: (id: string) => ReturnType;
    };
  }
}

export function AnnotationMagic<K>(): Extension {
  return Extension.create<AnnotationOptions<K>>({
    name: "annotation-magic",

    priority: 1000,

    addOptions() {
      return {
        styles: {
          rightFragment: "",
          leftFragment: "",
          normal: "",
          middleFragment: "",
        },
        onSelectionChange: (items) => items,
        onAnnot
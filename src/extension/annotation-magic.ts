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

export interface UpdateAnnotationAction<K> 
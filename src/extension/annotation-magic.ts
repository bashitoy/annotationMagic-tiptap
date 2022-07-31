import { Extension } from "@tiptap/core";
import { AnnotationPlugin, AnnotationPluginKey } from "./pm/annotation-plugin";
import { Annotation } from "../contracts";

export interface RenderStyles {
  rightFragment: string;
  leftFragment:
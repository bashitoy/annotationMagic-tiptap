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
  onAnnotationListChange: (items: Annotation<K
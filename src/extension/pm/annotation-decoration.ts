import { Decoration } from "@tiptap/pm/view";
import { Annotation } from "../../contracts";

export class AnnotationDecoration<K> implements Annotation<K> {
  private decoration!: any;

  cons
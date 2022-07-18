export declare type AnnotationRendering =
  | "normal"
  | "fragment-right"
  | "fragment-left"
  | "fragment-middle";

export interface Annotation<K> {
  id: string;
  from: number;
  to: number;
  displayName?: string;
  data?: K;
  tag?: string;
  selectedText?: string;
  render
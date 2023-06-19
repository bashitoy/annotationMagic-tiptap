import {
  Annotation,
  AnnotationRendering,
  AnnotationFragment,
} from "../../contracts/annotation";

interface ActionKeyframe {
  action: "open" | "close";
  annotationIndex: number;
  textAnchor: number;
}

export const isConflicting = (
  fromA: number,
  toA: number,
  fromB: number,
  toB: number,
): boolean => {
  // case 1: (non-conflicting) A is before B
  if (fromA < toB && toA < fromB) return false;
  // case 2: (non-conflicting) B is before A
  if (fromB < toA && toB < fromA) return false;
  // case 3: (conflicting) some kind of overlap
  return true;
};

export const createAnnotationRendering = (
  annotations: Annotation<any>[],
): AnnotationFragment<any>[] => {
  const renderedAnnotations: AnnotationFragment<any>[] = [];
  const openAnnotationStack: ActionKeyframe[] = [];
  const actionMap: ActionKeyframe[][] = [];
  const annotationFragmentation: boolean[] = [];

  // STEP 1: Create a Map, containing the rendering actions for each index in the document.
  // this could be opening or closing an annotation
  annotations.forEach((term, index) => {
    // create an opening action keyframe
    let open: ActionKeyframe = {
    
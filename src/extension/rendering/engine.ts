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
      action: "open",
      annotationIndex: index,
      textAnchor: term.from,
    };
    // create a closing action keyframe
    let close: ActionKeyframe = {
      action: "close",
      annotationIndex: index,
      textAnchor: term.to,
    };
    let openMapElement = actionMap[open.textAnchor];
    // create empty actions list if necessary
    if (!openMapElement) actionMap[open.textAnchor] = [];
    actionMap[open.textAnchor].push(open);

    let closeMapElement = actionMap[close.textAnchor];
    if (!closeMapElement) actionMap[close.textAnchor] = [];
    actionMap[close.textAnchor].push(close);
  });

  actionMap // STEP 2: iterate the actionMap and generate the annotation UI elements
    .forEach((actions, _) => {
      actions.forEach((action) => {
        // check if there are still open annotations
        if (openAnnotationStack.length != 0) {
          let actionStackPeek =
            openAnnotationStack[openAnnotationStack.length - 1];
          if (
            actionStackPeek.action === "open" &&
            actionStackPeek.annotationIndex === action.annotationIndex &
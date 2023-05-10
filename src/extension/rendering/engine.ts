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

export const createAnnotationRender
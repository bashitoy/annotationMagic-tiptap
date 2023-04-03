
import {
  createAnnotationRendering,
  isConflicting,
  sortAnnotationsByStart,
} from "./engine";
import { Annotation, AnnotationFragment } from "../../contracts/annotation";

const conflictTestCases = [
  { a: { from: 1, to: 2 }, b: { from: 2, to: 3 }, overlapping: true },
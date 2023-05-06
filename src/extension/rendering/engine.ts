import {
  Annotation,
  AnnotationRendering,
  AnnotationFragment,
} from "../../contracts/annotation";

interface ActionKeyframe {
  action: "open" | "close";
  annotationIndex: number;
  textAnchor: numbe
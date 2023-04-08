
import {
  createAnnotationRendering,
  isConflicting,
  sortAnnotationsByStart,
} from "./engine";
import { Annotation, AnnotationFragment } from "../../contracts/annotation";

const conflictTestCases = [
  { a: { from: 1, to: 2 }, b: { from: 2, to: 3 }, overlapping: true },
  { b: { from: 1, to: 2 }, a: { from: 2, to: 3 }, overlapping: true },
  { a: { from: 1, to: 3 }, b: { from: 2, to: 3 }, overlapping: true },
  { b: { from: 1, to: 3 }, a: { from: 2, to: 3 }, overlapping: true },
  { a: { from: 1, to: 2 }, b: { from: 3, to: 4 }, overlapping: false },
  { b: { from: 1, to: 2 }, a: { from: 3, to: 4 }, overlapping: false },
];

describe("Test conflicting annotation", () => {
  test("Should declare non conflicting test cases as such", () => {
    for (let testCase of conflictTestCases) {
      expect(
        isConflicting(
          testCase.a.from,
          testCase.a.to,
          testCase.b.from,
          testCase.b.to,
        ),
      ).toBe(testCase.overlapping);
    }
  });
});

describe("Test sorting of annotation list", () => {
  const testList: Annotation<any>[] = [
    {
      id: "abc",
      from: 5,
      to: 6,
      displayName: "X",
      tag: "X",
    },
    {
      id: "abc",
      from: 3,
      to: 9,
      displayName: "X",
      tag: "X",
    },
    {
      id: "abc",
      from: 0,
      to: 5,
      displayName: "X",
      tag: "X",
    },
  ];

  const resultList: Annotation<any>[] = [
    {
      id: "abc",
      from: 0,
      to: 5,
      displayName: "X",
      tag: "X",
    },
    {
      id: "abc",
      from: 3,
      to: 9,
      displayName: "X",
      tag: "X",
    },
    {
      id: "abc",
      from: 5,
      to: 6,
      displayName: "X",
      tag: "X",
    },
  ];

  test("should sort the annotation list by starting point of the annotation", () => {
    expect(sortAnnotationsByStart(testList)).toEqual(resultList);
  });
});

describe("Mapping the annotation list to a flat representation", () => {
  const testCases: {
    inputAnnotations: Annotation<any>[];
    flatMapping: AnnotationFragment<any>[];
    name?: string;
  }[] = [
    {
      name: "Simple overlap",
      inputAnnotations: [
        {
          id: "abc",
          from: 0,
          to: 5,
          displayName: "X",
          tag: "X",
        },
        {
          id: "abc",
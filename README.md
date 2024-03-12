
# AnnotationMagic for Tiptap
## Description

A unique extension for the [Tiptap](https://github.com/ueberdosis/tiptap) editor (based on ProseMirror). It is known for its ability to **render overlapping annotations** as fragments. Annotations are illustrated as [Decorations](https://prosemirror.net/docs/ref/#view.Decorations) and hence are not part of the Prosemirror Document.
![Example](./assets/demo.jpg)

## Setup

### Install Tiptap

`npm install --save @tiptap/core @tiptap/pm @tiptap/starter-kit`

### Install Annotation Magic

`npm install --save annotationMagic-tiptap`

### Configuration

Specify a model if you wish to persist data in annotations.

```{ts}
interface AnnotationData {
    name: string;
    magicNumber: number;
}
```

Include `AnnotationMagic` in your extensions list.

```{ts}
extensions: [
    StarterKit,
    AnnotationMagic<AnnotationData>().configure({
        onAnnotationListChange: (annotations: Annotation<AnnotationData>[]) => {
            // Callback implemented when an annotation is created/deleted/updated
        },
        onSelectionChange: (selectedAnnotations: Annotation<AnnotationData>[]) => {
            // Callback implemented when the selected editor text changes
        },
        styles: {
            // CSS classes to apply for different fragments
            leftFragment: 'fragment-left',
            rightFragment: 'fragment-right',
            middleFragment: 'fragment-middle',
            normal: 'annotation-normal',
        }
    })
]
```

## Commands

```{ts}
// Create an annotation containing `data` at the selected text location
editor.chain().focus().addAnnotation(data).run();

// Update an annotations `data`
editor.chain().focus().addAnnotation(id, data).run();

// Remove an existing annotation
editor.chain().focus().deleteAnnotation(id).run();
```

## Demo

Explore a Demo with React on [Stackblitz](https://stackblitz.com/edit/stackblitz-starters-4gxggz?file=src%2FTiptap.tsx)
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add missing attributes if any
    title?: string;
  }
}

declare module 'react/jsx-runtime' {
  const content: any;
  export default content;
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module 'react' {
  const content: any;
  export default content;
  export const useState: <T>(initialState: T | (() => T)) => [T, (newState: T | ((prevState: T) => T)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const useCallback: <T extends (...args: any[]) => any>(callback: T, deps: any[]) => T;
  export const useMemo: <T>(factory: () => T, deps: any[] | undefined) => T;
  export const useRef: <T>(initialValue: T) => { current: T };
  export const useId: any;
  export const createContext: any;
  export const useContext: any;
  export const useReducer: any;
  export const useLayoutEffect: any;
  export const useInsertionEffect: any;
  export const useTransition: any;
  export const useDeferredValue: any;
  export const useSyncExternalStore: any;
  export const useImperativeHandle: any;
  export const forwardRef: any;
  export const memo: any;
  export const Fragment: any;
  export const StrictMode: any;
  export const Suspense: any;
  export const Profiler: any;
  export const createElement: any;
  export const cloneElement: any;
  export const isValidElement: any;
  export const Children: any;
  export const Component: any;
  export const PureComponent: any;
  export type FormEvent = any;
  export type ChangeEvent<T = any> = any;
  export type ReactNode = any;
  export type ReactElement = any;
  export type JSXElementConstructor<T> = any;
}

declare module 'react/jsx-runtime' {
  const content: any;
  export default content;
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

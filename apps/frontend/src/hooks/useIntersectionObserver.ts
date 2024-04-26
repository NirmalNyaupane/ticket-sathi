import { DependencyList, useCallback, useRef } from "react";

export default function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T) => {
      if (deps.every((val) => val === true)) {
        //disconnect the previous ref
        observer.current?.disconnect();

        //add new ref
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        });
        if (node) {
          observer.current.observe(node);
        }
      }
    },
    [deps, callback]
  );
  return ref;
}

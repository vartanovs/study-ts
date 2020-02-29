import * as React from 'react';
import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { createPortal } from 'react-dom';

const Modal: React.FC = ({ children }) => {
  const elementRef: MutableRefObject<null|HTMLDivElement> = useRef(null);
  if (!elementRef.current) {
    const div = document.createElement('div');
    elementRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (modalRoot && elementRef.current) {
      modalRoot.appendChild(elementRef.current);
      return () => modalRoot.removeChild(elementRef.current!);
    }
    return () => {};
  }, []);

  return createPortal(<div>{children}</div>, elementRef.current);
}

export default Modal;

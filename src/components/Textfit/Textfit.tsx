import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { Parent, Wrapper, WrapperHidden, WrapperVisible } from './style';

interface TextfitProps {
  children?: React.ReactNode;
  min?: number;
  max?: number;
  throttle?: number;
  autoResize?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

function innerHeight(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  return el.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
}
function assertElementFitsHeight(el: HTMLElement, height: number) {
  return el.scrollHeight - 1 <= height;
}
function throttleFn<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let last = 0;
  let timeout: any = null;
  return function (this: any, ...args: any[]) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(
        () => {
          last = Date.now();
          fn.apply(this, args);
        },
        wait - (now - last)
      );
    }
  } as T;
}

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 100;
const DEFAULT_THROTTLE = 100;

const Textfit: React.FC<TextfitProps> = ({
  children,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  throttle = DEFAULT_THROTTLE,
  autoResize = true,
  style,
  className,
  ...props
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  const process = useCallback(() => {
    const el = parentRef.current;
    const wrapper = childRef.current;
    if (!el || !wrapper) return;
    const originalHeight = innerHeight(el);
    if (originalHeight <= 0 || isNaN(originalHeight)) {
      console.warn(
        'Can not process element without height. Make sure the element is displayed and has a static height.'
      );
      return;
    }
    // Step 1: Binary search for height (primary)
    let low = min;
    let high = max;
    while (high - low > 1) {
      const mid = (low + high) / 2;
      wrapper.style.fontSize = mid + 'px';
      if (assertElementFitsHeight(wrapper, originalHeight)) {
        low = mid;
      } else {
        high = mid;
      }
    }
    // Step 2: Clamp and set
    const finalFontSize = Math.max(min, Math.min(low, max));
    wrapper.style.fontSize = finalFontSize + 'px';
    setFontSize(finalFontSize);
  }, [min, max, children]);

  // Throttled resize handler
  const handleWindowResize = useCallback(
    throttleFn(() => {
      process();
    }, throttle),
    [process, throttle]
  );

  // Run process on mount, prop change, or resize
  useLayoutEffect(() => {
    if (autoResize) {
      window.addEventListener('resize', handleWindowResize);
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }
    return undefined;
  }, [autoResize, handleWindowResize]);

  useLayoutEffect(() => {
    process();
  }, [min, max, children, style]);

  const finalStyle: React.CSSProperties = {
    ...style,
    fontSize: fontSize || undefined,
  };

  return (
    <Parent ref={parentRef} style={finalStyle} className={className} {...props}>
      <WrapperHidden ref={childRef}>{children}</WrapperHidden>
      <WrapperVisible>{children}</WrapperVisible>
    </Parent>
  );
};

export { Textfit };

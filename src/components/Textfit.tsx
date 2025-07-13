import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';

interface TextfitProps {
  children?: React.ReactNode;
  text?: string;
  min?: number;
  max?: number;
  forceSingleModeWidth?: boolean; // will be ignored, but keep for compatibility
  throttle?: number;
  autoResize?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

function innerWidth(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  return el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
}
function innerHeight(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  return el.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
}
function assertElementFitsWidth(el: HTMLElement, width: number) {
  return el.scrollWidth - 1 <= width;
}
function assertElementFitsHeight(el: HTMLElement, height: number) {
  return el.scrollHeight - 1 <= height;
}
function throttleFn<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let last = 0;
  let timeout: any = null;
  return function(this: any, ...args: any[]) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        last = Date.now();
        fn.apply(this, args);
      }, wait - (now - last));
    }
  } as T;
}

let uniqueIdCounter = 0;
function uniqueId() {
  return ++uniqueIdCounter;
}

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 100;
const DEFAULT_THROTTLE = 50;

const Textfit: React.FC<TextfitProps> = ({
  children,
  text,
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
  const [ready, setReady] = useState(false);
  const pidRef = useRef<number>(uniqueId());

  // Cancel running process by changing pid
  const cancelProcess = () => {
    pidRef.current = uniqueId();
  };

  // Main fitting logic (always multi-line)
  const process = useCallback(() => {
    const el = parentRef.current;
    const wrapper = childRef.current;
    if (!el || !wrapper) return;
    const originalWidth = innerWidth(el);
    const originalHeight = innerHeight(el);
    if (originalHeight <= 0 || isNaN(originalHeight)) {
      console.warn('Can not process element without height. Make sure the element is displayed and has a static height.');
      return;
    }
    if (originalWidth <= 0 || isNaN(originalWidth)) {
      console.warn('Can not process element without width. Make sure the element is displayed and has a static width.');
      return;
    }
    const pid = uniqueId();
    pidRef.current = pid;
    const shouldCancelProcess = () => pid !== pidRef.current;
    // Step 1: Binary search for height (primary)
    let low = min;
    let high = max;
    setReady(false);
    while (high - low > 0.1) {
      if (shouldCancelProcess()) return;
      const mid = (low + high) / 2;
      wrapper.style.fontSize = mid + 'px';
      if (assertElementFitsHeight(wrapper, originalHeight)) {
        low = mid;
      } else {
        high = mid;
      }
    }
    // Step 2: Binary search for width (secondary)
    wrapper.style.fontSize = high + 'px';
    if (!assertElementFitsWidth(wrapper, originalWidth)) {
      low = min;
      // Don't reset high, keep it from previous step
      while (high - low > 0.1) {
        if (shouldCancelProcess()) return;
        const mid = (low + high) / 2;
        wrapper.style.fontSize = mid + 'px';
        if (assertElementFitsWidth(wrapper, originalWidth)) {
          low = mid;
        } else {
          high = mid;
        }
      }
    }
    // Step 3: Clamp and set
    let finalFontSize = Math.max(min, Math.min(high, max));
    if (shouldCancelProcess()) return;
    setFontSize(finalFontSize);
    setReady(true);
  }, [min, max, text, children]);

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
    return cancelProcess;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, text, children, style]);

  // Compose style
  const finalStyle: React.CSSProperties = {
    ...style,
    fontSize: fontSize || undefined,
  };
  const wrapperStyle: React.CSSProperties = {
    display: ready ? 'block' : 'inline-block',
    whiteSpace: 'normal',
  };

  return (
    <div ref={parentRef} style={finalStyle} className={className} {...props}>
      <div ref={childRef} style={wrapperStyle}>
        {text !== undefined && typeof children === 'function'
          ? ready
            ? (children as (t: string) => React.ReactNode)(text)
            : text
          : text !== undefined ? text : children}
      </div>
    </div>
  );
};

export default Textfit; 
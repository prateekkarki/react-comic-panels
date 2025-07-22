import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import './Textfit.css';

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
  console.log("innerHeight---", el.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom), el.clientHeight, parseFloat(style.paddingTop), parseFloat(style.paddingBottom));
  return el.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
}
function assertElementFitsHeight(el: HTMLElement, height: number) {
  console.log("height---", el.scrollHeight - 1, height);
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
const DEFAULT_THROTTLE = 500;

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
  const [ready, setReady] = useState(false);
  const pidRef = useRef<number>(uniqueId());

  // Cancel running process by changing pid
  const cancelProcess = () => {
    console.log("cancelProcess")
    pidRef.current = uniqueId();
  };

  const process = useCallback(() => {
    const el = parentRef.current;
    const wrapper = childRef.current;
    if (!el || !wrapper) return;
    const originalHeight = innerHeight(el);
    if (originalHeight <= 0 || isNaN(originalHeight)) {
      console.warn('Can not process element without height. Make sure the element is displayed and has a static height.');
      return;
    }
    const pid = uniqueId();
    pidRef.current = pid;
    const shouldCancelProcess = () => pid !== pidRef.current;
    // Step 1: Binary search for height (primary)
    let low = min;
    let high = max;
    setReady(false);
    wrapper.style.visibility = 'hidden';
    while (high - low > 1) {
      if (shouldCancelProcess()) return;
      const mid = (low + high) / 2;
      wrapper.style.fontSize = mid + 'px';
      console.log('fitsHeight', assertElementFitsHeight(wrapper, originalHeight), `mid: ${mid}, low: ${low}, high: ${high}`);
      if (assertElementFitsHeight(wrapper, originalHeight)) {
        low = mid;
      } else {
        high = mid;
      }
    }
    // Step 2: Clamp and set
    let finalFontSize = Math.max(min, Math.min(low, max));
    console.log("finalFontSize", finalFontSize, `low: ${low}, min: ${min}, max: ${max}`);
    if (shouldCancelProcess()) return;
    wrapper.style.fontSize = finalFontSize + 'px';
    wrapper.style.visibility = 'visible';
    setFontSize(finalFontSize);
    setReady(true);
  }, [min, max,  children]);

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
  }, [min, max,  children, style]);

  const finalStyle: React.CSSProperties = {
    ...style,
    fontSize: fontSize || undefined,
  };

  const wrapperStyle: React.CSSProperties = {
    visibility: ready ? 'visible' : 'hidden',
  };

  console.log("fontSize", fontSize);
  console.log("finalStyle", finalStyle);

  return (
    <div className={`Textfit--parent ${className ?? ""}`} ref={parentRef} style={finalStyle} {...props}>
      <div className={`Textfit--wrapper`} ref={childRef} style={wrapperStyle} >
        {children}
      </div>
    </div>
  );
};

export { Textfit }; 
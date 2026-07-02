'use client';

import {
  CheckCircle2,
  CircleAlert,
  Info,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

type ToastVariant = 'success' | 'error' | 'info';
type ToastPhase = 'enter' | 'open' | 'exit';

type ToastOptions = {
  title: string;
  description?: string;
  duration?: number;
};

type ToastItem = ToastOptions & {
  id: string;
  variant: ToastVariant;
  phase: ToastPhase;
};

type ToastTimers = {
  enterFrame?: number;
  dismissTimer?: number;
  removeTimer?: number;
};

type ToastContextValue = {
  show: (variant: ToastVariant, options: ToastOptions) => string;
  success: (options: ToastOptions) => string;
  error: (options: ToastOptions) => string;
  info: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
};

type ToastVariantConfig = {
  icon: LucideIcon;
  className: string;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 6500;
const EXIT_DURATION_MS = 240;

const toastVariantConfig: Record<ToastVariant, ToastVariantConfig> = {
  success: {
    icon: CheckCircle2,
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-950 shadow-emerald-950/5',
  },
  error: {
    icon: CircleAlert,
    className: 'border-red-200 bg-red-50 text-red-950 shadow-red-950/5',
  },
  info: {
    icon: Info,
    className: 'border-sky-200 bg-sky-50 text-sky-950 shadow-sky-950/5',
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const toastSequenceRef = useRef(0);
  const timersRef = useRef<Map<string, ToastTimers>>(new Map());

  useEffect(() => {
    setIsMounted(true);

    const timersMap = timersRef.current;

    return () => {
      timersMap.forEach((timers) => {
        if (timers.enterFrame !== undefined) {
          window.cancelAnimationFrame(timers.enterFrame);
        }

        if (timers.dismissTimer !== undefined) {
          window.clearTimeout(timers.dismissTimer);
        }

        if (timers.removeTimer !== undefined) {
          window.clearTimeout(timers.removeTimer);
        }
      });

      timersMap.clear();
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    const timers = timersRef.current.get(id);

    if (timers?.removeTimer) {
      return;
    }

    if (timers?.enterFrame) {
      window.cancelAnimationFrame(timers.enterFrame);
    }

    if (timers?.dismissTimer) {
      window.clearTimeout(timers.dismissTimer);
    }

    setToasts((currentToasts) =>
      currentToasts.map((toast) =>
        toast.id === id && toast.phase !== 'exit'
          ? { ...toast, phase: 'exit' }
          : toast,
      ),
    );

    const removeTimer = window.setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id),
      );

      timersRef.current.delete(id);
    }, EXIT_DURATION_MS);

    timersRef.current.set(id, {
      ...timers,
      removeTimer,
    });
  }, []);

  const show = useCallback(
    (variant: ToastVariant, options: ToastOptions) => {
      const id = `toast-${Date.now()}-${++toastSequenceRef.current}`;
      const duration = options.duration ?? DEFAULT_DURATION_MS;

      const toast: ToastItem = {
        id,
        variant,
        title: options.title,
        description: options.description,
        phase: 'enter',
      };

      const timers: ToastTimers = {};

      timersRef.current.set(id, timers);

      setToasts((currentToasts) => [...currentToasts, toast]);

      timers.enterFrame = window.requestAnimationFrame(() => {
        setToasts((currentToasts) =>
          currentToasts.map((currentToast) =>
            currentToast.id === id
              ? { ...currentToast, phase: 'open' }
              : currentToast,
          ),
        );
      });

      timers.dismissTimer = window.setTimeout(() => {
        dismiss(id);
      }, duration);

      return id;
    },
    [dismiss],
  );

  const contextValue = useMemo<ToastContextValue>(
    () => ({
      show,
      dismiss,
      success: (options) => show('success', options),
      error: (options) => show('error', options),
      info: (options) => show('info', options),
    }),
    [dismiss, show],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {isMounted
        ? createPortal(
            <div
              className="pointer-events-none fixed top-4 right-4 z-100 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3"
              aria-label="Notifications"
            >
              {toasts.map((toast) => {
                const config = toastVariantConfig[toast.variant];
                const Icon = config.icon;

                // const isVisible = toast.phase === 'open';

                return (
                  <article
                    key={toast.id}
                    role={toast.variant === 'error' ? 'alert' : 'status'}
                    aria-live={
                      toast.variant === 'error' ? 'assertive' : 'polite'
                    }
                    aria-atomic="true"
                    className={cn(
                      'pointer-events-auto flex gap-3 rounded-2xl border p-4 shadow-xl',
                      'transition-all duration-200 ease-out motion-reduce:transition-none',
                      // isVisible
                      //   ? 'translate-x-0 opacity-100'
                      //   : 'translate-x-4 opacity-0',
                      config.className,
                    )}
                  >
                    <Icon
                      className="mt-0.5 size-5 shrink-0"
                      aria-hidden="true"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{toast.title}</p>

                      {toast.description ? (
                        <p className="mt-1 text-sm leading-5 opacity-80">
                          {toast.description}
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      aria-label="Dismiss notification"
                      onClick={() => dismiss(toast.id)}
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-lg',
                        'opacity-70 transition hover:bg-black/5 hover:opacity-100',
                        'focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none',
                      )}
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </article>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider.');
  }

  return context;
}

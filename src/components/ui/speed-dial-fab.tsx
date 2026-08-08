'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

const MOON_STAGGER_MS = 0;
const SUN_STAGGER_MS = 50;

const fabButtonClassName = cn(
  'border-border bg-surface text-foreground inline-flex items-center justify-center rounded-full border shadow-md',
  'hover:bg-muted transition-colors',
  'focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none',
);

const themeActionClassName = cn(
  fabButtonClassName,
  'speed-dial-fab__action size-11',
);

type ThemeMode = 'light' | 'dark';

export function SpeedDialFab() {
  const rootRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const themeReady = mounted;
  const activeMode: ThemeMode =
    themeReady && resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const selectTheme = useCallback(
    (mode: ThemeMode) => {
      setTheme(mode);
    },
    [setTheme],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!rootRef.current?.contains(target)) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, isOpen]);

  return (
    <nav
      ref={rootRef}
      className={cn(
        'speed-dial-fab fixed z-40',
        'right-[max(1rem,env(safe-area-inset-right))]',
        'bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]',
      )}
      data-open={isOpen ? 'true' : 'false'}
      aria-label="Theme settings"
    >
      <div
        id={menuId}
        role="menu"
        aria-hidden={!isOpen}
        className="speed-dial-fab__menu flex flex-col items-center gap-3"
      >
        <button
          type="button"
          role="menuitemradio"
          className={cn(
            themeActionClassName,
            themeReady &&
              activeMode === 'light' &&
              'speed-dial-fab__theme-option--selected',
          )}
          style={
            { '--speed-dial-stagger': `${SUN_STAGGER_MS}ms` } as CSSProperties
          }
          tabIndex={isOpen ? 0 : -1}
          aria-label="Light mode"
          aria-checked={themeReady ? activeMode === 'light' : false}
          onClick={() => selectTheme('light')}
        >
          <Sun className="size-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          role="menuitemradio"
          className={cn(
            themeActionClassName,
            themeReady &&
              activeMode === 'dark' &&
              'speed-dial-fab__theme-option--selected',
          )}
          style={
            { '--speed-dial-stagger': `${MOON_STAGGER_MS}ms` } as CSSProperties
          }
          tabIndex={isOpen ? 0 : -1}
          aria-label="Dark mode"
          aria-checked={themeReady ? activeMode === 'dark' : false}
          onClick={() => selectTheme('dark')}
        >
          <Moon className="size-5" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        className={cn(fabButtonClassName, 'speed-dial-fab__trigger size-12')}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label={isOpen ? 'Close theme options' : 'Open theme options'}
        onClick={toggleOpen}
      >
        <SunMoon
          className="speed-dial-fab__trigger-icon size-5"
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}

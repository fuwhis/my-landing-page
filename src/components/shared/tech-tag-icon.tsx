import {
  Bot,
  Braces,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Database,
  Layers,
  Server,
  WandSparkles,
  Wrench,
} from 'lucide-react';
import { JSX } from 'react';
import * as simpleIcons from 'simple-icons';

type SimpleIconData = {
  title: string;
  hex: string;
  path: string;
};

type IconFactory = (className: string) => JSX.Element;

const simpleIconMap: Record<string, string> = {
  JavaScript: 'siJavascript',
  TypeScript: 'siTypescript',
  React: 'siReact',
  'Next.js': 'siNextdotjs',
  'Vue 3': 'siVuedotjs',
  'Nuxt 3': 'siNuxt',
  HTML: 'siHtml5',
  'CSS/SCSS': 'siCss',
  SCSS: 'siSass',
  'Tailwind CSS': 'siTailwindcss',
  'Redux Toolkit': 'siRedux',
  Redux: 'siRedux',
  Zustand: 'siZustand',
  Recoil: 'siRecoil',
  Pinia: 'siPinia',
  'TanStack Query': 'siReactquery',
  GraphQL: 'siGraphql',
  'Ant Design': 'siAntdesign',
  'Material UI': 'siMui',
  ESLint: 'siEslint',
  Prettier: 'siPrettier',
  Vitest: 'siVitest',
  Git: 'siGit',
  GitHub: 'siGithub',
  GitLab: 'siGitlab',
  SourceTree: 'siSourcetree',
  Docker: 'siDocker',
  ChatGPT: 'siOpenai',
  'Cursor IDE': 'siCursor',
  Nginx: 'siNginx',
  Django: 'siDjango',
  Svelte: 'siSvelte',
  Python: 'siPython',
  Rollup: 'siRollupdotjs',
};

const iconLabelAliases: Record<string, string> = {
  'Vue.js': 'Vue 3',
  'Nuxt.js': 'Nuxt 3',
  HTML5: 'HTML',
  CSS3: 'CSS/SCSS',
};

const lucideFallbackMap: Record<string, IconFactory> = {
  'Prompt Engineering': (className) => (
    <WandSparkles className={className} aria-hidden="true" />
  ),
  'AI-assisted debugging': (className) => (
    <Bot className={className} aria-hidden="true" />
  ),
  'AI-assisted refactoring': (className) => (
    <CircuitBoard className={className} aria-hidden="true" />
  ),
  'Manual validation before production': (className) => (
    <CheckCircle2 className={className} aria-hidden="true" />
  ),
};

const categoryFallbacks: Array<{ pattern: RegExp; iconFactory: IconFactory }> =
  [
    {
      pattern: /(react|next|vue|nuxt|svelte|ui|html|css|tailwind)/i,
      iconFactory: (className) => (
        <Layers className={className} aria-hidden="true" />
      ),
    },
    {
      pattern: /(redux|zustand|recoil|pinia|query|graphql|data)/i,
      iconFactory: (className) => (
        <Database className={className} aria-hidden="true" />
      ),
    },
    {
      pattern: /(docker|nginx|kubernetes|aws|server|deploy|django|python)/i,
      iconFactory: (className) => (
        <Server className={className} aria-hidden="true" />
      ),
    },
    {
      pattern: /(eslint|prettier|vitest|jest|git|workflow|tool)/i,
      iconFactory: (className) => (
        <Wrench className={className} aria-hidden="true" />
      ),
    },
  ];

function getSimpleIcon(iconName: string) {
  return (simpleIcons as Record<string, SimpleIconData | undefined>)[iconName];
}

function renderSimpleIcon(icon: SimpleIconData) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5"
      aria-hidden="true"
      role="img"
      style={{ color: `#${icon.hex}` }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function renderMonogramIcon(label: string) {
  const initial = label.trim().charAt(0).toUpperCase();
  return (
    <span
      className="inline-flex size-3.5 items-center justify-center rounded-[3px] bg-neutral-200 text-[9px] font-semibold text-neutral-700"
      aria-hidden="true"
    >
      {initial || '?'}
    </span>
  );
}

export function getTechTagIcon(label: string) {
  const normalizedLabel = iconLabelAliases[label] ?? label;
  const iconName = simpleIconMap[normalizedLabel];

  if (iconName) {
    const simpleIcon = getSimpleIcon(iconName);
    if (simpleIcon) {
      return renderSimpleIcon(simpleIcon);
    }
  }

  const fallbackIconFactory = lucideFallbackMap[normalizedLabel];
  if (fallbackIconFactory) {
    return fallbackIconFactory('size-3.5');
  }

  const categoryFallback = categoryFallbacks.find((item) =>
    item.pattern.test(normalizedLabel),
  );
  if (categoryFallback) {
    return categoryFallback.iconFactory('size-4');
  }

  if (normalizedLabel.length > 0) {
    return renderMonogramIcon(normalizedLabel);
  }

  return <Code2 className="size-3.5" aria-hidden="true" />;
}

export function getNonTechnicalTagIcon() {
  return <Braces className="size-3.5" aria-hidden="true" />;
}

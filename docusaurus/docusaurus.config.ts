import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js at build time. Change the title, url and links to your own.
const config: Config = {
  title: 'Docs on Grro',
  tagline: 'A documentation site built with Docusaurus',
  favicon: 'favicon.svg',

  future: {
    v4: true,
  },

  // Your site's public address, used for canonical links and the sitemap.
  url: 'https://example.com',
  baseUrl: '/',
  // Pages are written as folder/index.html and linked with a trailing slash,
  // so nginx serves them without a redirect.
  trailingSlash: true,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Docs on Grro',
      logo: {
        alt: '',
        src: 'favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `Built with Docusaurus. Hosted on Grro.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

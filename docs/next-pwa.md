# next-pwa (@ducanh2912/next-pwa)

Paste docs here from: https://context7.com/ducanhgh/next-pwa
---

### Install next-pwa and webpack

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/getting-started.mdx

Instructions to install the `@ducanh2912/next-pwa` package and `webpack` as a development dependency using npm, yarn, or pnpm.

```bash
npm i @ducanh2912/next-pwa && npm i -D webpack
```

```bash
yarn add @ducanh2912/next-pwa && yarn add -D webpack
```

```bash
pnpm add @ducanh2912/next-pwa && pnpm add -D webpack
```

--------------------------------

### Build and Start next-pwa next-i18next Example

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/next-i18next/README.md

This snippet provides commands to navigate into the example directory, build the Next.js application, and then start the development server. It assumes pnpm is installed and configured.

```bash
cd examples/next-i18next
pnpm build
pnpm start
```

--------------------------------

### Build and Start `next-pwa` Example

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/basic/README.md

Navigate to the example directory and execute commands to build and start the `next-pwa` application.

```bash
cd examples/basic
pnpm build
pnpm start
```

--------------------------------

### Build and Start next-pwa Lifecycle Example

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/lifecycle/README.md

Instructions to build and start the `next-pwa` lifecycle example project after navigating into its directory using pnpm.

```bash
cd examples/lifecycle
pnpm build
pnpm start
```

--------------------------------

### Run a next-pwa Example Locally

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/examples/adding-examples.md

Instructions to navigate into an example directory, build the project, and start the development server using pnpm.

```bash
cd examples/DIRECTORY_NAME
pnpm build
pnpm start
```

--------------------------------

### Build and Start Next.js PWA Example with pnpm

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/next-image/README.md

Provides instructions to navigate into the `next-image` example directory, build the Next.js application, and then start the development server using `pnpm`. This sequence is essential for running the local example.

```bash
cd examples/next-image
pnpm build
pnpm start
```

--------------------------------

### Build and start next-pwa web-push application

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/web-push/README.md

Compiles the Next.js application for production and then launches the server, making the web push example accessible.

```bash
pnpm build
```

```bash
pnpm start
```

--------------------------------

### Install project dependencies with pnpm

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/README.md

Installs all required project dependencies using the pnpm package manager. This command should be executed from the root directory of the project.

```bash
pnpm i
```

--------------------------------

### Run documentation development server with pnpm

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/README.md

Navigates into the 'docs' directory and starts the local development server for the documentation site using pnpm. The site will be accessible via a web browser at http://localhost:3000.

```bash
cd docs && pnpm dev
```

--------------------------------

### Build and Start next-pwa Offline Fallback Example

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/offline-fallback-v2/README.md

Commands to navigate into the example directory, build the Next.js application with `next-pwa`, and then start the server to run the application locally.

```bash
cd examples/offline-fallback-v2
pnpm build
pnpm start
```

--------------------------------

### Build project packages with pnpm

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/README.md

Builds all packages within the project using pnpm. This step is typically performed after installing dependencies and before running the development server.

```bash
pnpm build
```

--------------------------------

### Build and Start Next.js PWA with Custom Server

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/custom-server/README.md

Instructions to navigate into the example directory and then build and start the Next.js PWA application using pnpm, leveraging the custom Fastify server.

```bash
cd examples/custom-server
pnpm build
pnpm start
```

--------------------------------

### Run next-pwa custom worker example

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/custom-worker/README.md

Navigates into the custom worker example directory, builds the project, and then starts the application for local development.

```bash
cd examples/custom-worker
pnpm build
pnpm start
```

--------------------------------

### Conditionally apply withPWA for production builds

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/getting-started.mdx

Shows how to conditionally apply the `withPWA` plugin only during development server or production build phases to optimize image size for deployment platforms.

```js
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require("next/constants");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require("@ducanh2912/next-pwa").default({
      dest: "public"
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};
```

```js
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} from "next/constants.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public"
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;
```

--------------------------------

### Bootstrap a next-pwa Example with create-next-app

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/examples/adding-examples.md

Commands to initialize a new Next.js application pre-configured with a specific `next-pwa` example using different package managers like npm, Yarn, pnpm, and Bun.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/DIRECTORY_NAME DIRECTORY_NAME-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/DIRECTORY_NAME DIRECTORY_NAME-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/DIRECTORY_NAME DIRECTORY_NAME-app
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/DIRECTORY_NAME DIRECTORY_NAME-app
```

--------------------------------

### Bootstrap next-pwa web-push example project

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/web-push/README.md

Initializes a new Next.js application pre-configured with the `next-pwa` web-push example using various package managers.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/web-push web-push-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/web-push web-push-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/web-push web-push-app
```

--------------------------------

### Add web application manifest (manifest.json)

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/getting-started.mdx

Provides a standard `manifest.json` structure for a web application, defining its name, icons, theme colors, and display properties for PWA functionality.

```json
{
  "name": "My awesome PWA app",
  "short_name": "PWA App",
  "icons": [
    {
      "src": "/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/android-chrome-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#FFFFFF",
  "background_color": "#FFFFFF",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait"
}
```

--------------------------------

### Initialize `next-pwa` Example with `create-next-app`

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/basic/README.md

Bootstrap a new Next.js application pre-configured with the `next-pwa` basic example using different package managers.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic basic-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic basic-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic basic-app
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic basic-app
```

--------------------------------

### Wrap Next.js config with withPWA

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/getting-started.mdx

Demonstrates how to integrate `next-pwa` into `next.config.js` or `next.config.mjs` by wrapping the existing Next.js configuration with `withPWA`.

```js
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public"
});

module.exports = withPWA({
  // Your Next.js config
});
```

```js
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public"
});

export default withPWA({
  // Your Next.js config
});
```

--------------------------------

### Bootstrap Next.js PWA Example Project

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/reproduction-template/README.md

These commands demonstrate how to quickly set up a Next.js project using the `next-pwa` reproduction template. They utilize `create-next-app` with different package managers (npm, Yarn, pnpm, Bun) to clone the example repository, providing a starting point for PWA development.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/reproduction-template reproduction
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/reproduction-template reproduction
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/reproduction-template reproduction
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/reproduction-template reproduction
```

--------------------------------

### Install Project Dependencies with pnpm

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/docs/adding-docs.md

Installs all necessary project dependencies using pnpm, ensuring the development environment is correctly set up before starting work.

```pnpm
pnpm install
```

--------------------------------

### Bootstrap next-pwa Offline Fallback Example with create-next-app

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/offline-fallback-v2/README.md

Commands to initialize a new Next.js application using `create-next-app` and directly pull the `next-pwa` offline fallback example from the GitHub repository. This allows for quick setup with different package managers.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2 offline-fallback-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2 offline-fallback-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2 offline-fallback-app
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2 offline-fallback-app
```

--------------------------------

### Navigate to next-pwa web-push example

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/web-push/README.md

Changes the current directory to the `web-push` example within the `next-pwa` project repository.

```bash
cd examples/web-push
```

--------------------------------

### Bootstrap Next.js PWA Custom Server Example with create-next-app

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/custom-server/README.md

Commands to quickly set up the `next-pwa` custom server example project using `create-next-app` with different package managers: npx, Yarn, pnpm, and bun. This allows for easy project initialization from the GitHub repository.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-server custom-server-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-server custom-server-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-server custom-server-app
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-server custom-server-app
```

--------------------------------

### Bootstrap Next.js PWA Example with create-next-app (npx, yarn, pnpm, bun)

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/next-image/README.md

Demonstrates how to quickly set up a new Next.js project based on the `next-image` example from the `next-pwa` repository. This snippet includes commands for `npx`, `yarn`, `pnpm`, and `bun` to create a new application directory pre-configured with the example's content.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-image next-image-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-image next-image-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-image next-image-app
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-image next-image-app
```

--------------------------------

### Bootstrap next-pwa next-i18next Example with create-next-app

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/next-i18next/README.md

These commands use `create-next-app` with different package managers (npx, yarn, pnpm, bun) to quickly set up a new Next.js project pre-configured with the `next-i18next` example from the `next-pwa` repository.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-i18next next-i18next-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-i18next next-i18next-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-i18next next-i18next-app
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-i18next next-i18next-app
```

--------------------------------

### Bootstrap next-pwa Lifecycle Example with create-next-app

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/lifecycle/README.md

Commands to bootstrap the `next-pwa` lifecycle example project using `create-next-app` with various package managers like npm, Yarn, pnpm, or Bun.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/lifecycle lifecycle-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/lifecycle lifecycle-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/lifecycle lifecycle-app
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/lifecycle lifecycle-app
```

--------------------------------

### Example Paths for next-i18next Application

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/next-i18next/README.md

These are example URLs to test the internationalization (i18n) functionality of the `next-pwa` application, demonstrating different language routes (English and Chinese).

```text
https://localhost:3000/
https://localhost:3000/en
https://localhost:3000/zh
```

--------------------------------

### Recommended .gitignore for next-pwa Examples

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/examples/adding-examples.md

Essential entries for the `.gitignore` file to exclude generated PWA-related files from version control in `next-pwa` projects.

```gitignore
**/public/workbox-*.js
**/public/sw.js
```

--------------------------------

### Start Local Documentation Development Server

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/docs/adding-docs.md

Starts the local development server for the documentation, allowing real-time preview of changes made to the content in 'docs/content'.

```pnpm
pnpm dev
```

--------------------------------

### Start Local Development Server

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/core/developing.md

Starts the local development server and watches for code changes, enabling real-time testing and development feedback.

```pnpm
pnpm dev
```

--------------------------------

### Configure PWA Metadata in Next.js Head

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/getting-started.mdx

This snippet demonstrates how to add essential PWA metadata to the `<head />` section of a Next.js application. It provides two approaches: using the `metadata` and `viewport` exports in `app/layout.tsx` for App Router, or directly embedding meta tags and link tags in `pages/_app.tsx` for Pages Router. This configuration is crucial for PWA features like manifest linking, theme colors, Apple Web App settings, and social media cards.

```TypeScript
import type { Metadata, Viewport } from "next";

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
```

```TSX
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>My awesome PWA app</title>
        <meta name="description" content="Best PWA app in the world!" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="My awesome PWA app" />
        <meta name="twitter:description" content="Best PWA app in the world!" />
        <meta name="twitter:image" content="/icons/twitter.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My awesome PWA app" />
        <meta property="og:description" content="Best PWA app in the world!" />
        <meta property="og:site_name" content="My awesome PWA app" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="/icons/og.png" />
        {/* add the following only if you want to add a startup image for Apple devices. */}
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_2048.png"
          sizes="2048x2732"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1668.png"
          sizes="1668x2224"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1536.png"
          sizes="1536x2048"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1125.png"
          sizes="1125x2436"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1242.png"
          sizes="1242x2208"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_750.png"
          sizes="750x1334"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_640.png"
          sizes="640x1136"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

--------------------------------

### Configure web push environment variables

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/web-push/README.md

Creates or updates the `.env` file with necessary web push configuration, including the sender's email, VAPID private key, and public key for client-side use.

```shell
WEB_PUSH_EMAIL=user@example.com
WEB_PUSH_PRIVATE_KEY=<vapid-private-key>
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=<vapid-public-key>
```

--------------------------------

### Recommended .gitignore Entries for next-pwa

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/next-i18next/README.md

This snippet provides recommended entries for a `.gitignore` file to prevent common `next-pwa` build artifacts (service worker and precache files) from being committed to version control.

```gitignore
**/public/precache.*.js
**/public/sw.js
```

--------------------------------

### Recommended .gitignore entries for next-pwa

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/web-push/README.md

Lists common files and directories generated by `next-pwa` that should be excluded from version control, such as Workbox and service worker scripts.

```gitignore
**/public/workbox-*.js
**/public/sw.js
**/public/worker-*.js
```

--------------------------------

### Bootstrap next-pwa custom worker example with create-next-app

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/custom-worker/README.md

Initializes a new Next.js application using the next-pwa custom worker example, supporting various package managers like npm, Yarn, pnpm, or bun.

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-worker custom-worker-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-worker custom-worker-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-worker custom-worker-app
```

```bash
bun create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-worker custom-worker-app
```

--------------------------------

### Linting the codebase

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/repository/linting.md

Run this command to lint the `next-pwa` codebase, excluding the `examples` and `docs` directories.

```sh
pnpm lint
```

--------------------------------

### Install Project Dependencies with pnpm

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/core/developing.md

Installs all necessary project dependencies using pnpm, ensuring the development environment is fully prepared for building and running the application.

```pnpm
pnpm install
```

--------------------------------

### Basic Setup for Next.js PWA Plugin

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/src/app/(home)/code-showcase.mdx

This snippet demonstrates the fundamental way to integrate `next-pwa` into a Next.js project. By wrapping your `module.exports` with `withPWA`, the plugin is activated, enabling Progressive Web App features with minimal configuration. The `dest` option specifies the public directory for generated PWA assets.

```js
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public"
});

module.exports = withPWA({
  // Your Next.js config
});
```

--------------------------------

### Basic next-pwa Configuration in Next.js

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/configuring.mdx

Demonstrates how to integrate and initialize the `@ducanh2912/next-pwa` plugin in `next.config.js` (CommonJS) and `next.config.mjs` (ES Module) files. It shows the basic setup with `dest: "public"` and commented-out common options like `disable`, `register`, `scope`, and `sw`.

```javascript
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: "/app",
  // sw: "service-worker.js",
  //...
});

// Your Next config is automatically typed!
module.exports = withPWA({
  // Your Next.js config
});
```

```javascript
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: "/app",
  // sw: "service-worker.js",
  //...
});

// Your Next config is automatically typed!
export default withPWA({
  // Your Next.js config
});
```

--------------------------------

### Recommended .gitignore Entries for next-pwa

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/lifecycle/README.md

Recommended entries to add to the `.gitignore` file to prevent service worker and precache files generated by `next-pwa` from being committed to version control.

```gitignore
**/public/precache.*.js
**/public/sw.js
```

--------------------------------

### Clone next-pwa Repository

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/core/developing.md

Clones the next-pwa repository from GitHub, specifying a shallow depth and the master branch for efficient local development setup.

```bash
git clone https://github.com/DuCanhGH/next-pwa -- --depth=3000 --branch master --single-branch
```

--------------------------------

### Generate VAPID keys for web push

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/web-push/README.md

Executes the `pnpm vapid` command to generate VAPID (Voluntary Application Server Identification) keys, which are essential for sending web push notifications.

```bash
pnpm vapid
```

--------------------------------

### TypeScript Support for Next.js PWA Configuration

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/src/app/(home)/code-showcase.mdx

This example highlights `next-pwa`'s robust TypeScript integration. Developers benefit from automatic type hints and detailed descriptions for configuration options, enhancing development experience. Wrapping the Next.js config with `withPWA` ensures it's automatically typed with `NextConfig`, providing compile-time validation.

```js
// @ts-check
const withPWA = require("@ducanh2912/next-pwa").default({
  // You will get hints as you type here. You can also hover over these options
  // to get a detailed description about them!
  dest: "public"
});

// Your Next config is automatically typed with NextConfig!
module.exports = withPWA({
  reactStrictMode: "true" // Type 'string' is not assignable to type 'boolean | null | undefined'.
});
```

--------------------------------

### Configure Custom Service Worker Paths for next-pwa

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/custom-worker.mdx

Example configurations for `next.config.js` (CommonJS) and `next.config.mjs` (ESM) demonstrating how to customize the source, destination, and URL prefix for the `next-pwa` plugin's custom service worker. This allows developers to specify where `next-pwa` looks for the custom worker implementation and where it outputs the bundled file.

```javascript
const withPWA = require("@ducanh2912/next-pwa").default({
  customWorkerSrc: "service-worker",
  customWorkerDest: "somewhere-else", // defaults to `dest`
  customWorkerPrefix: "not/a-worker",
  // ...
});

module.exports = withPWA({
  // Your Next.js config
});
```

```javascript
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  customWorkerSrc: "service-worker",
  customWorkerDest: "somewhere-else", // defaults to `dest`
  customWorkerPrefix: "not/a-worker",
  // ...
});

export default withPWA({
  // Your Next.js config
});
```

--------------------------------

### Clone next-pwa Repository for Development

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/docs/adding-docs.md

Clones the next-pwa repository from GitHub, performing a shallow clone of the master branch to set up the local development environment.

```bash
git clone https://github.com/DuCanhGH/next-pwa -- --depth=3000 --branch master --single-branch
```

--------------------------------

### Recommended `.gitignore` for `next-pwa`

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/basic/README.md

Add these entries to your `.gitignore` file to prevent tracking of generated `next-pwa` service worker and workbox files.

```gitignore
**/public/workbox-*.js
**/public/sw.js
```

--------------------------------

### Create a New Development Branch

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/docs/adding-docs.md

Creates and switches to a new local branch based on the remote master branch, which is recommended for making changes and contributions.

```bash
git checkout -b MY_BRANCH_NAME origin/master
```

--------------------------------

### Push Changes to Forked Repository

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/docs/adding-docs.md

Configures the remote origin to point to a user's forked repository and pushes the committed changes, preparing them for a pull request.

```bash
git remote set-url origin https://github.com/YOURNAME/next-pwa
git push
```

--------------------------------

### Navigate to Documentation Directory

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/docs/adding-docs.md

Changes the current working directory to the 'docs' folder, where the documentation content is located.

```bash
cd docs
```

--------------------------------

### Commit Local Changes to Branch

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/docs/adding-docs.md

Stages all modified and new files, then commits them to the current branch with a descriptive message, saving the development progress.

```bash
git add .
git commit -m "DESCRIBE_YOUR_CHANGES_HERE"
```

--------------------------------

### Advanced Configuration Options for Next.js PWA

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/src/app/(home)/code-showcase.mdx

This snippet showcases the wide array of customization options available for `next-pwa`, powered by Workbox's extensive API. It illustrates how to fine-tune plugin behavior, such as disabling it based on environment, controlling caching strategies, or defining custom service worker paths. The commented-out lines provide a glimpse into the many configurable parameters.

```js
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: "/app",
  // sw: "service-worker.js",
  // customWorkerDest: "service-worker",
  // cacheStartUrl: true,
  // dynamicStartUrl: true,
  // dynamicStartUrlRedirect: "/foo/bar",
  // cacheOnFrontendNav: true,
  // aggressiveFrontEndNavCaching: true,
  // scope: "/beta",
  // workboxOptions: {},
  // ...
});

module.exports = withPWA({
  // Your Next.js config
});
```

--------------------------------

### Customizing Runtime Caching in next-pwa

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/configuring.mdx

Illustrates how to define custom `runtimeCaching` strategies for the `next-pwa` plugin, leveraging `workboxOptions`. This allows developers to specify how different types of network requests should be cached, with an option to extend the default caching rules.

```javascript
const withPWA = require("@ducanh2912/next-pwa").default({
  // Your other options,
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      // Your runtimeCaching array
    ]
  }
});

module.exports = withPWA({
  // Your Next.js config
});
```

```javascript
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  // Your other options,
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      // Your runtimeCaching array
    ]
  }
});

export default withPWA({
  // Your Next.js config
});
```

--------------------------------

### Push Changes to Forked Repository

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/core/developing.md

Updates the remote origin URL to point to a personal fork and then pushes the local branch's changes to that fork, preparing for a pull request.

```bash
git remote set-url origin https://github.com/YOUR_NAME/next-pwa
git push -u origin MY_BRANCH_NAME
```

--------------------------------

### next-pwa Plugin Configuration Options

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/configuring.mdx

Detailed list of configuration options available for the `@ducanh2912/next-pwa` plugin. These options control various aspects of PWA behavior, including caching strategies, service worker registration, scope, and fallback routes.

```APIDOC
cacheOnFrontendNav: Enable additional route caching when users navigate through pages with next/link.
  aggressiveFrontEndNavCaching: Cache every <link rel="stylesheet" /> and <script /> on frontend navigation. Requires cacheOnFrontEndNav to be enabled.
cacheStartUrl: Turn on caching for the start URL.
  dynamicStartUrl: If your start URL returns different HTML document under different states (such as logged in and not logged in), this should be set to true if you also use cacheStartUrl. Effective only when cacheStartUrl is set to true.
  dynamicStartUrlRedirect: If your start URL redirects to another route such as /login, it's recommended to specify this redirected URL for the best user experience. Effective when dynamicStartUrl is set to true.
customWorkerSrc: Change the directory in which next-pwa looks for a custom worker implementation to import into the service worker.
customWorkerDest: The output directory of the custom worker.
customWorkerPrefix: The custom worker's output filename prefix.
disable: Whether next-pwa should be disabled.
dest: The output directory of the service worker. Relative to Next.js's root directory.
extendDefaultRuntimeCaching: Extend the default runtimeCaching array. Only effective when runtimeCaching is specified.
fallbacks: Configure routes to be precached so that they can be used as a fallback when fetching a resource from both the cache and the network fails. If you just need a fallback document, simply create pages/_offline.tsx or app/~offline/page.tsx.
publicExcludes: An array of glob pattern strings to exclude files in the public folder from being precached.
scope: URL scope for PWA. Defaults to basePath in next.config.js. Set to /foo/ so that paths under /foo/ are PWA while others are not.
sw: The service worker's output filename.
register: Whether next-pwa should automatically register the service worker. Set this to false if you want to register the service worker yourself.
reloadOnOnline: Reload the app when it has gone back online.
```

--------------------------------

### Recommended .gitignore for Next.js PWA Generated Files

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/custom-server/README.md

Specifies `.gitignore` entries to prevent version control of automatically generated service worker (`sw.js`) and precache scripts (`precache.*.js`) within the `public` directory of a Next.js PWA project.

```gitignore
**/public/precache.*.js
**/public/sw.js
```

--------------------------------

### Create New Development Branch

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/core/developing.md

Creates and switches to a new local branch based on the 'origin/master' branch, preparing for new feature development or bug fixes.

```bash
git checkout -b MY_BRANCH_NAME origin/master
```

--------------------------------

### Configure Offline Fallbacks for next-pwa

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/offline-fallbacks.mdx

This configuration demonstrates how to set up offline fallbacks for various resource types (documents, data, images, audio, video, fonts) in a Next.js project using `next-pwa`. It defines paths to precached fallback resources that will be served when network requests fail, supporting both CommonJS and ES Module syntax for `next.config.js`.

```js
const withPWA = require("@ducanh2912/next-pwa").default({
  // Your other options,
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/~offline",
    // This is for /_next/.../.json files.
    data: "/fallback.json",
    // This is for images.
    image: "/fallback.webp",
    // This is for audio files.
    audio: "/fallback.mp3",
    // This is for video files.
    video: "/fallback.mp4",
    // This is for fonts.
    font: "/fallback-font.woff2"
  }
});

module.exports = withPWA({
  // Your Next.js config
});
```

```js
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  // Your other options,
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/~offline",
    // This is for /_next/.../.json files.
    data: "/fallback.json",
    // This is for images.
    image: "/fallback.webp",
    // This is for audio files.
    audio: "/fallback.mp3",
    // This is for video files.
    video: "/fallback.mp4",
    // This is for fonts.
    font: "/fallback-font.woff2"
  }
});

export default withPWA({
  // Your Next.js config
});
```

--------------------------------

### Commit Local Changes

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/core/developing.md

Stages all modified and new files, then commits them to the current branch with a descriptive message, saving development progress.

```bash
git add .
git commit -m "DESCRIBE_YOUR_CHANGES_HERE"
```

--------------------------------

### Integrating Workbox Options with next-pwa

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/configuring.mdx

Shows how to pass `workbox-webpack-plugin` options to the `next-pwa` plugin within `next.config.js` (CommonJS) and `next.config.mjs` (ES Module). This allows for fine-grained control over Workbox's behavior, such as service worker generation and caching strategies.

```javascript
const withPWA = require("@ducanh2912/next-pwa").default({
  // Your other options,
  workboxOptions: {
    // Workbox options go here...
  }
});

module.exports = withPWA({
  // Your Next.js config
});
```

```javascript
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  // Your other options,
  workboxOptions: {
    // Workbox options go here...
  }
});

export default withPWA({
  // Your Next.js config
});
```

--------------------------------

### Recommended .gitignore for Next.js PWA Service Worker Files

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/next-image/README.md

Specifies common `.gitignore` entries to prevent service worker and Workbox-related JavaScript files, typically generated in the `public` directory by `next-pwa`, from being committed to version control. This helps maintain a clean repository.

```gitignore
**/public/workbox-*.js
**/public/sw.js
```

--------------------------------

### Recommended .gitignore for next-pwa generated files

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/custom-worker/README.md

Specifies common files generated by next-pwa that should be ignored by Git, including Workbox and service worker files, to keep the repository clean.

```gitignore
**/public/workbox-*.js
**/public/sw.js
**/public/worker-*.js
```

--------------------------------

### Recommended .gitignore for next-pwa Generated Files

Source: https://github.com/ducanhgh/next-pwa/blob/master/examples/offline-fallback-v2/README.md

Specifies common files generated by `next-pwa` that should be ignored by Git to prevent them from being committed to the repository. These files typically include Workbox service worker scripts and fallback assets.

```gitignore
**/public/workbox-*.js
**/public/sw.js
**/public/fallback-*.js
```

--------------------------------

### Auto-fixing linting and formatting errors

Source: https://github.com/ducanhgh/next-pwa/blob/master/contributing/repository/linting.md

Use this command to automatically fix ESLint and Prettier errors. Note that not all rules can be auto-fixed, and some manual changes may still be required.

```sh
pnpm lint -- --fix
```

--------------------------------

### Configure Next.js PWA to Exclude JavaScript Files

Source: https://github.com/ducanhgh/next-pwa/blob/master/docs/content/next-pwa/precaching.mdx

This snippet demonstrates how to configure the `@ducanh2912/next-pwa` plugin in `next.config.js` or `next.config.mjs` to exclude specific JavaScript files from precaching. This is particularly useful for larger applications to prevent unnecessary data from being precached, improving performance and reducing the size of the precache manifest. The `workboxOptions.exclude` array is used to specify paths of files to be ignored.

```JavaScript
const withPWA = require("@ducanh2912/next-pwa").default({
  // Your other options,
  workboxOptions: { exclude: ["/some-js-files.js"] }
});

module.exports = withPWA({
  // Your Next.js config
});
```

```JavaScript
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  // Your other options,
  workboxOptions: { exclude: ["/some-js-files.js"] }
});

export default withPWA({
  // Your Next.js config
});
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.

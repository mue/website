---
title: Development
---

If you want to further customise Mue, fork it, or open a pull request implementing fixes or changes you can follow this guide here to get started.

## Mue Tab

The Mue development utilities we use are Git for version control and Node.js and Webpack to run the development server and create production builds to
be submitted to the extension stores. You should always use the latest versions of each unless noted. Cloudflare Pages is linked to our repository in order to
automatically deploy new changes to our [demo](https://demo.muetab.com) which is embedded on the Mue website. Codacy is also linked to check for errors on the code.

### Installation

#### Requirements

- [Git](https://git-scm.com)
- [Bun](https://bun.sh/)
- A suitable browser (Only modern versions of Firefox and Chromium-based browsers are supported)

#### Starting

1. Clone the repository using `git clone https://github.com/mue/mue.git --depth 1`
2. Run `bun install` to install all needed dependencies
3. Run `bun start` to start the development server
4. Code your heart out! (See the sections below for how to build the extension)

#### Building

1. Run `bun run build`
2. Run the command for your browser (Chrome, Firefox), for example `bun run chrome`

#### Chromium Browser Testing

If you need to add the built extension to your browser, follow these steps:

1. Visit the "extensions" page in your browser (this is normally accessible through `<browsername>://extensions`, e.g `edge://extensions`)
2. Check the "Developer Mode" toggle
3. Click "Load Unpacked" and find your manifest.json in the build directory
4. Click ok and then open a new tab. You may need to disable the production Mue extension for your development one to appear.

#### Firefox Browser Testing

If you need to add the built extension to your browser, follow these steps:

1. Visit the `about:debugging#/runtime/this-firefox` page in Firefox
2. Click "Load Temporary Add-on..."
3. Select your manifest.json in the build directory and then open a new tab. You may need to disable the production Mue extension for your development one to appear.

## API

The API is a [Cloudflare Worker](https://workers.cloudflare.com/) deployed via [Wrangler](https://developers.cloudflare.com/workers/wrangler/). It also serves the marketplace at `marketplace.muetab.com`.

### Requirements

- [Git](https://git-scm.com)
- [Bun](https://bun.sh/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`bun install -g wrangler`)

### Starting

1. Clone the repository using `git clone https://github.com/mue/api.git`
2. Run `bun install` to install dependencies
3. Create a `.dev.vars` file in the root with your local secrets:

```
SUPABASE_URL=
SUPABASE_TOKEN=
UNSPLASH_TOKEN=
PEXELS_TOKEN=
MAPBOX_TOKEN=
OPENWEATHER_TOKEN=
```

4. Run `bun run dev` to start the local Wrangler dev server

### Deploying

Run `bun run deploy` to deploy to Cloudflare Workers. You must be authenticated with `wrangler login` first.

Secrets are set via `wrangler secret put <SECRET_NAME>` rather than `.dev.vars`.

## Marketplace

The marketplace is a static content repository. The build script processes item JSON files and outputs bundled manifests used by the API and extension.

### Requirements

- [Git](https://git-scm.com)
- [Bun](https://bun.sh/)

### Building

1. Clone the repository using `git clone https://github.com/mue/marketplace.git`
2. Run `bun install` to install dependencies
3. Run `bun run build` to generate the output manifests, or `bun run build:full` for the full build including all item data

### Testing

Run `bun test` to run the test suite, or `bun run test:watch` for watch mode.

## Website

The website is built with [Next.js](https://nextjs.org) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

### Requirements

- [Git](https://git-scm.com)
- [Bun](https://bun.sh/)

### Starting

1. Clone the repository using `git clone https://github.com/mue/website.git`
2. Run `bun install` to install dependencies
3. Run `bun dev` to start the development server

### Building

1. Run `bun build` to create a production build (also generates the sitemap via `next-sitemap`)
2. Run `bun start` to serve the production build locally

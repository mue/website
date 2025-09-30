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
- [Node.JS](https://nodejs.org) (or [Bun](https://bun.sh/))
- A suitable browser (Only modern versions of Firefox and Chromium-based browsers are supported)

#### Starting

1. Clone the repository using `git clone https://github.com/mue/mue.git --depth 1`
2. Run `pnpm` to install all needed dependencies
3. Run `pnpm start` to start the development server
4. Code your heart out! (See the sections below for how to build the extension)

#### Building

1. Run `pnpm run build`
2. Run the command for your browser (Chrome, Firefox), for example `pnpm run chrome`

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

This section is under construction.

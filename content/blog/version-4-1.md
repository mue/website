---
title: 'Version 4.1'
date: '2020-10-04'
author: 'David Ralph'
description: 'A bug fixing update for Mue with some new extra features and optimisation, further improving your experience.'
image: 'https://res.cloudinary.com/mue/image/upload/blog/version-4-1.webp'
tags: ['release', 'update']
---

Here's an update that brings many fixes to Mue and a few additions.

## Changelog

### Added

- Setting to adjust background brightness (thanks @edenbun!)
- Maximise button - click it to see just the background
- Settings to enable/disable refresh and maximise
- Favourite button - click it to make it so the background doesn't change on refresh
- Added sideload addons feature
- Added custom background colour feature
- Optimise various features
- Dark theme detection on reset settings

### Fixed

- Translations on reset text, upload and toasts now work
- Prevent dragging of images in the modals
- Image upload dialog only accepts images now instead of erroring when a non-image file is uploaded
- Fix ratelimit returning undefined
- Fix 400 error in console on the marketplace
- Russian language is now correctly auto-detected
- Loading marketplace no longer shows no internet, it now says loading
- Scrollbar no longer escapes modal (thanks @MrZillaGold for finding and @edenbun for fixing!)
- Dark theme dropdowns now work
- Fix error from checkbox in console
- Search bar button now works properly with Yandex
- Fix slider issue on Firefox

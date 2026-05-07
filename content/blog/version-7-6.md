---
title: Version 7.6.0
date: '2026-01-27'
author: David Ralph
description: 'UI polish, a new font, improved storage, and a new quotes experience.'
image: /blog/version-7-6.webp
tags:
  - release
  - update
imagePlaceholder: >-
  data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACQAQCdASoIAAQAAUAmJZwAAp1HI1AA/v0otX49OqrgVBEf1Ip4gTM+AAA=
---

This update brings a range of UI refinements across form components and modals, a switch from Montserrat to Inter as the default font, improvements to custom background handling, and a new default quotes experience. We've also introduced a three-branch release workflow to allow for more structured beta testing going forward.

### Changelog

### Added

- Dropdown closing animation with portal rendering for better layering
- Dynamic storage quota estimation and request persistence
- Reset functionality for Dropdown and Slider components with toast notifications
- Smooth animations on Slider reset
- Auto location reset in Weather settings
- Translation percentage tracking across the app
- Three-branch release workflow automation for structured main, beta, and dev releases

### Changed

- Font replaced - Montserrat swapped for Inter globally
- New default quotes experience with an improved added quotes page
- Form component accessibility overhauled across Checkbox, Dropdown, Radio, Slider, and Text inputs
- Modal close button styling and theming improved
- Clock component now pads digits for consistent time formatting
- Custom background loading and state management refactored
- Reduced offline image bundle size

### Fixed

- Quote author details migration now correctly defaults to visible for all users
- Custom background upload no longer flashes during file processing
- Quote buttons state management and event handling
- Switch and Checkbox components changed from `label` to `div` for correct semantics
- Greeting event text box styling
- Blurhash dependency added for image metadata encoding

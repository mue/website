---
title: 'Version 7.5.0'
date: '2026-01-24'
author: 'David Ralph'
description: 'A major update with a revamped codebase, improved UX, and a new marketplace experience.'
image: '/blog/version-7-5.webp'
tags: ['release', 'update']
---

In this update, we overhauled the codebase, improved a ton of UX issues and released
a new version of the marketplace that links in with the website in order to provide a 
smoother experience for users. We're hoping that this sets the stage for more frequent updates to allow for quicker bug fixes and feature releases in the future.

### Changelog

**Added**
* **Official Safari support** for Apple devices
* **Drag-and-drop functionality** to reorder Quick Links
* **Deep linking support** for specific marketplace items and settings
* **Reactive translation system** for instant language updates
* **System language detection** and localized date/time formatting
* **IndexedDB support** for larger and faster custom background storage
* **Author details toggle** for quotes and photos
* **13 new languages** including Japanese, Arabic, and Vietnamese
* **Docker support** for easier development contributions
* **Skeleton loaders** for a smoother marketplace browsing experience

**Changed**
* **Modernized stack** updated to React 19, Vite 7, and ESLint 9
* **Overhauled Marketplace UI** with better filters, sorting, and item cards
* **Improved Background filters** now use overlays to prevent jitter
* **Enhanced Quote component** with better font scaling and width management
* **Refactored Quick Links** and Greeting components for better performance
* **Updated Color Picker** with improved styles and usability
* **Optimized event handling** and state management throughout the app
* **Updated Documentation** and README with new web store badges

**Fixed**
* **Microsoft Bing icon** export error
* **Firefox manifest** addon ID issues
* **Tooltip animations** and exit behavior
* **Achievement reset bug** where stats wouldn't update correctly
* **Weather component** dependency and loading issues
* **Welcome screen** styling and language selection fixes
* **Marketplace lightbox** and breadcrumb navigation issues
* **Various UI/UX fixes** for better theme handling and button styles
---
title: Changelog
---

The changelog dates use the DD-MM-YYY format.

### 1.8.0 - 06/02/2026

#### Added

- API-enabled photo pack support with settings schema
- Attribution configuration for photo packs to credit image sources
- Validation for required fields in API-enabled photo packs
- API-enabled fields included in item summary output

### 1.7.0 - 27/01/2026

#### Added

- Blurhash generation for photo pack images with caching and rate limiting
- `blur_hash` field on photo objects in processed packs

### 1.6.1 - 27/10/2025

#### Changed

- Improved build system with better error handling, caching, and configuration

### 1.6.0 - 11/10/2025

#### Added

- Stable hash generation and validation for items
- `type` property on all items
- Keywords and category tags on items for improved discoverability
- Testing framework with utility and integration tests
- Full build script option for enhanced build output

#### Changed

- Migrated build script from JavaScript to TypeScript
- Item validation and timestamp tracking for collections
- Refactored code structure for improved readability

### 1.5.0 - 15/06/2024

#### Added

- Average colour computation for photos
- Saturation enhancement for photo colours

### 1.4.1 - 23/05/2024

#### Fixed

- Build script now fetches full git history without mutating source data

### 1.4.0 - 21/05/2024

#### Added

- `updated_at` field added at build time for all items
- Language field on items missing classification
- Image API classification field
- Item issue report template

#### Fixed

- Broken icon links
- Coloured icons restored

### 1.3.1 - 11/03/2024

#### Fixed

- Replaced Discord CDN links with stable alternatives

### 1.3.0 - 20/02/2024

#### Changed

- Schema updated to use objects instead of arrays
- Added `curators` and `in_collections` fields to items

### 1.2.0 - 17/09/2023

#### Added

- Collection item validation in build script
- All pack data included in separate output files

#### Changed

- Consistent file naming across all items
- English descriptions with content notices added
- Build script updated to include full item data

### 1.0.0 - 23/11/2021

#### Added

- Initial changelog release
- Full umami implementation (apart from location and resolution, this is not planned)

#### Removed

- All mentions of addons "updated" field have been removed until future notice

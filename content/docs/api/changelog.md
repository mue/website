---
title: Changelog
---

The changelog dates use the DD-MM-YYY format.

### 2.2.1 - 03/02/2026

#### Added

- Optional analytics data (views, downloads) on marketplace item listings via `include_analytics` parameter
- Download count tracking for marketplace items

#### Changed

- Cache TTL for analytics data set to 1 hour

### 2.2.0 - 28/01/2026

#### Added

- Geocode endpoint (forward geocode query to locations)
- GPS reverse geocode endpoint (lat/lon to location name)
- Weather endpoint now supports lat/lon coordinates in addition to city name

### 2.1.0 - 07/10/2025

#### Added

- Full v2 marketplace API: collections, items, curators, featured, trending, recent, search, and stats endpoints
- Item lookup by ID without requiring category
- Related items endpoint
- Marketplace batch fetch endpoint (up to 100 items by ID)
- View count tracking for marketplace items
- Pagination support for marketplace item listings

### 2.0.0 - 21/09/2024

#### Added

- v2 API with enhanced endpoints for images, quotes, weather, and marketplace
- Unsplash image proxy with support for topics, collections, orientation, and username
- Unsplash topics listing endpoint
- Weather endpoint
- Mapbox static map image endpoint
- OpenTelemetry observability with Baselime edge logger
- v2 images include `blur_hash`, `colour`, and `coordinates` fields

#### Changed

- Migrated from Node.js/Fastify to Cloudflare Workers (via Wrangler) with Bun runtime
- Supabase replaces previous database backend
- Edge caching via Cloudflare KV and Cache API

#### Removed

- Admin routes (`/images/add`, `/images/delete`) - use the [uploader](https://github.com/mue/uploader) utility directly
- Pexels image fetching

### 1.6.2 - 18/05/2024

#### Added

- Autocomplete search proxy (via Ecosia)
- Marketplace pagination on v1

#### Changed

- Unsplash endpoint now uses all collections if none specified
- Unsplash collections parameter trims whitespace

### 1.6.1 - 23/11/2021

#### Added

- Full umami implementation (apart from location and resolution, this is not planned)
- Log unauthorized errors to umami

### Changed

- Code modifications

### 1.6.0 - 16/08/2021

#### Added

- Admin API for adding and removing quotes
- Better ratelimit control

#### Changed

- Optimisation

#### Removed

- Resolution from image response

### 1.5.1 - 06/07/2021

#### Removed

- API no longer returns IDs for images and quotes

### 1.5.0 - 20/05/2021

#### Changed

- URLs for all endpoints have been changed

#### Removed

- Unsplash documentation as it's private
- Information about marketplace themes as they are no longer planned
- /getUpdate endpoint removed, use blog API instead
- You can no longer get images or quotes by ID

### 1.4.0 - 14/01/2021

#### Added

- Documentation now covers marketplace information
- /getQuoteLanguages route and allow getting quotes in other languages

#### Changed

- API optimisations
- Various fixes and changes

### 1.3.0 - 31/08/2020

#### Added

- A lot more info to the /getUpdate endpoint, now using data from the blog
- /getPhotographers endpoint
- /getImages now includes camera model and resolution

### 1.2.1 - 14/12/2019

#### Changed

- Make error messages like the Fastify default

### 1.2.0 - 10/12/2019

#### Added

- Status codes on invalid ID and invalid category (400) as well as 404
- Make [source code](https://github.com/mue/api) public

#### Changed

- Changed "Category not found" to "Invalid Category"
- Changed "404" to "404 Not Found"
- Update internal libraries (less broken now)
- Possibly improve performance (removed no longer needed module)

### 1.1.1 - 07/12/2019

#### Changed

- Improve error messages
- Update internal libraries (less broken now)
- Improve security (and possibly performance)

### 1.1.0 - 03/12/2019

#### Added

- Support for getting images and quotes via specific ID

### 1.0.0 - 26/06/2019

Please note the date for this update may not be exact

#### Added

- Initial Release

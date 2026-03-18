---
title: Introduction
---

Mue comes with an API which is used by default to get random images and quotes curated by the Mue team. Please note that unlike the rest of Mue, these images are not free to be used without permission
from the photographer.

## Information

Base URL: `https://api.muetab.com`

The API is deployed as a Cloudflare Worker. v1 endpoints are available at the base URL; v2 endpoints are at `/v2`.

Ratelimits are per route:

```
# v2 Images
/v2/images/random - 100 requests per minute
/v2/images/categories - 50 requests per minute
/v2/images/photographers - 50 requests per minute
/v2/images/unsplash - 50 requests per minute

# v2 Quotes
/v2/quotes/random - 100 requests per minute
/v2/quotes/languages - 50 requests per minute

# v2 Marketplace
/v2/marketplace/* - 60 requests per minute

# v2 Weather & Location
/v2/weather - 30 requests per minute
/v2/gps - 30 requests per minute
/v2/geocode - 30 requests per minute

# v1 Public
/ - 30 requests per minute
/images/random - 100 requests per minute
/images/photographers - 50 requests per minute
/images/categories - 50 requests per minute
/quotes/random - 100 requests per minute
/quotes/languages - 50 requests per minute

```

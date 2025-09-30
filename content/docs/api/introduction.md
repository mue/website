---
title: Introduction
---

Mue comes with an API which is used by default to get random images and quotes curated by the Mue team. Please note that unlike the rest of Mue, these images are not free to be used without permission
from the photographer.

## Information

Base URL: `https://api.muetab.com`

Ratelimits are per route:

```
# Public
/ - 30 requests per minute
/images/random - 100 requests per minute
/images/photographers - 50 requests per minute
/images/categories - 50 requests per minute
/quotes/random - 100 requests per minute
/quotes/languages - 50 requests per minute
# Admin
/images/add - 10 requests per minute
/images/delete - 10 requests per minute
```

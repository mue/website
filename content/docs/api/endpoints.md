---
title: Endpoints
order: 2
---

The API has two versions. v2 endpoints are available at `https://api.muetab.com/v2` and include enhanced fields and additional services. v1 endpoints are available at `https://api.muetab.com` for backwards compatibility.

## v2

v2 endpoints are available at `https://api.muetab.com/v2`.

### Images

#### Get Random Image

`https://api.muetab.com/v2/images/random`

Returns a random image with enhanced fields including blur hash, dominant colour, and coordinates.

##### Request

| Parameter           | Type   | Info                                           |
| ------------------- | ------ | ---------------------------------------------- |
| category (optional) | string | Returns random image from specific category    |
| exclude (optional)  | string | Exclude a specific image filename from results |

##### Response

```json
{
  "category": "Outdoors",
  "file": "https://res.cloudinary.com/mue/image/upload/photos/old/78ff331a7aa4bda3.jpg",
  "photographer": "David Ralph",
  "location": "Cotswold Wildlife Park",
  "camera": "Samsung Galaxy S8",
  "blur_hash": "LGF5?xYk^6#M@-5c,1Ex@@or[j6o",
  "colour": "#8db3c8",
  "coordinates": {
    "latitude": 51.7,
    "longitude": -1.6
  },
  "pun": null
}
```

#### Get Categories

`https://api.muetab.com/v2/images/categories`

Returns all image categories as full objects.

#### Get Photographers

`https://api.muetab.com/v2/images/photographers`

Returns all photographers as full objects.

#### Get Unsplash Image

`https://api.muetab.com/v2/images/unsplash`

Proxies a random image from Unsplash.

##### Request

| Parameter              | Type   | Info                                      |
| ---------------------- | ------ | ----------------------------------------- |
| categories (optional)  | string | Comma-separated Unsplash category names   |
| collections (optional) | string | Comma-separated Unsplash collection IDs   |
| orientation (optional) | string | `landscape`, `portrait`, or `squarish`    |
| topics (optional)      | string | Comma-separated Unsplash topic slugs      |
| username (optional)    | string | Limit results to a specific Unsplash user |

#### Get Unsplash Topics

`https://api.muetab.com/v2/images/unsplash/topics`

Returns a list of available Unsplash topics.

### Quotes

#### Get Random Quote

`https://api.muetab.com/v2/quotes/random`

Returns a random quote.

##### Request

| Parameter           | Type   | Info                                      |
| ------------------- | ------ | ----------------------------------------- |
| language (optional) | string | Get a random quote in a specific language |

#### Get Quote Languages

`https://api.muetab.com/v2/quotes/languages`

Returns all available quote languages from the database.

### Marketplace

#### Get Collections

`https://api.muetab.com/v2/marketplace/collections`

Returns all marketplace collections.

#### Get Collection

`https://api.muetab.com/v2/marketplace/collection/:collection`

Returns a single collection by name.

#### Get Curators

`https://api.muetab.com/v2/marketplace/curators`

Returns all marketplace curators.

#### Get Curator Items

`https://api.muetab.com/v2/marketplace/curator/:curator`

Returns all items by a specific curator.

#### Get Featured Items

`https://api.muetab.com/v2/marketplace/featured`

Returns featured marketplace items.

#### Get Trending Items

`https://api.muetab.com/v2/marketplace/trending`

Returns trending items ranked by a weighted score of views and downloads.

#### Get Recent Items

`https://api.muetab.com/v2/marketplace/recent`

Returns the most recently added marketplace items.

#### Get Items by Category

`https://api.muetab.com/v2/marketplace/items/:category`

Returns items in the given category. Supports filtering, sorting, pagination, and optional analytics data.

##### Request

| Parameter                    | Type    | Info                                         |
| ---------------------------- | ------- | -------------------------------------------- |
| page (optional)              | number  | Page number for pagination                   |
| limit (optional)             | number  | Number of items per page                     |
| sort (optional)              | string  | Sort field                                   |
| include_analytics (optional) | boolean | Include view and download counts in response |

#### Get Item by ID

`https://api.muetab.com/v2/marketplace/item/:item`

Returns a specific marketplace item by its ID, without needing to specify category.

#### Get Item by Category and Name

`https://api.muetab.com/v2/marketplace/item/:category/:item`

Returns a specific marketplace item by category and name.

#### Get Related Items

`https://api.muetab.com/v2/marketplace/item/:item/related`

Returns items related to the given item.

#### Get Random Item

`https://api.muetab.com/v2/marketplace/random`

Returns a random marketplace item.

#### Get Random Item by Category

`https://api.muetab.com/v2/marketplace/random/:category`

Returns a random marketplace item from a specific category.

#### Search

`https://api.muetab.com/v2/marketplace/search`

Full-text search with relevance scoring across marketplace items.

##### Request

| Parameter | Type   | Info         |
| --------- | ------ | ------------ |
| q         | string | Search query |

#### Batch Fetch Items

`POST https://api.muetab.com/v2/marketplace/batch`

Fetches up to 100 marketplace items by ID in a single request.

##### Request body

```json
{
  "ids": ["item-id-1", "item-id-2"]
}
```

#### Global Stats

`https://api.muetab.com/v2/marketplace/stats/global`

Returns global marketplace statistics.

#### Category Stats

`https://api.muetab.com/v2/marketplace/stats/category/:category`

Returns statistics for a specific marketplace category.

#### Increment View Count

`POST https://api.muetab.com/v2/marketplace/item/:item/view`

Increments the view count for an item.

#### Increment Download Count

`POST https://api.muetab.com/v2/marketplace/item/:item/download`

Increments the download count for an item.

### Weather & Location

#### Get Weather

`https://api.muetab.com/v2/weather`

Returns current weather data.

##### Request

| Parameter       | Type   | Info                 |
| --------------- | ------ | -------------------- |
| city (optional) | string | City name            |
| lat (optional)  | number | Latitude coordinate  |
| lon (optional)  | number | Longitude coordinate |

#### Reverse Geocode

`https://api.muetab.com/v2/gps`

Converts lat/lon coordinates to a human-readable location name.

##### Request

| Parameter | Type   | Info      |
| --------- | ------ | --------- |
| lat       | number | Latitude  |
| lon       | number | Longitude |

#### Forward Geocode

`https://api.muetab.com/v2/geocode`

Converts a query string to a list of matching locations with coordinates.

##### Request

| Parameter | Type   | Info       |
| --------- | ------ | ---------- |
| q         | string | Place name |

#### Static Map

`https://api.muetab.com/v2/map`

Returns a Mapbox static map image.

### Other

#### Search Autocomplete

`https://api.muetab.com/v2/search/autocomplete`

Proxies autocomplete suggestions from Ecosia.

##### Request

| Parameter | Type   | Info         |
| --------- | ------ | ------------ |
| q         | string | Search query |

#### News

`https://api.muetab.com/v2/news`

Returns news data.

#### Stats

`https://api.muetab.com/v2/stats`

Returns stats from the web stores service.

#### Versions

`https://api.muetab.com/v2/versions`

Returns version information from the web stores service.

---

## v1

These endpoints are available at `https://api.muetab.com` for backwards compatibility.

### Images

#### Get Random Image

`https://api.muetab.com/images/random`

Returns a random image. If no category is specified, a random image is returned from all categories.

##### Request

| Parameter           | Type   | Info                                        |
| ------------------- | ------ | ------------------------------------------- |
| category (optional) | string | Returns random image from specific category |

##### Response

```json
{
  "category": "Outdoors",
  "file": "https://res.cloudinary.com/mue/image/upload/photos/old/78ff331a7aa4bda3.jpg",
  "photographer": "David Ralph",
  "location": "Cotswold Wildlife Park",
  "camera": "Samsung Galaxy S8"
}
```

#### Get Categories

`https://api.muetab.com/images/categories`

Returns all image categories in an array.

##### Response

```json
["Outdoors"]
```

#### Get Photographers

`https://api.muetab.com/images/photographers`

Returns all photographers in an array.

##### Response

```json
["photographer1", "photographer2"]
```

### Quotes

#### Get Random Quote

`https://api.muetab.com/quotes/random`

Returns a random quote. If no language is specified, a quote in any language may be returned.

##### Request

| Parameter           | Type   | Info                                      |
| ------------------- | ------ | ----------------------------------------- |
| language (optional) | string | Get a random quote in a specific language |

##### Response

```json
{
  "author": "E.E Cummings",
  "quote": "It takes courage to grow up and become who you really are.",
  "language": "English"
}
```

#### Get Quote Languages

`https://api.muetab.com/quotes/languages`

Returns all available quote languages in an array.

##### Response

```json
["English", "French"]
```

### Marketplace

#### Get Collection

`https://api.muetab.com/collection/:collection`

Returns a single marketplace collection by name.

#### Get Collections

`https://api.muetab.com/collections`

Returns all marketplace collections.

#### Get Featured Items

`https://api.muetab.com/featured`

Returns featured marketplace items.

#### Get Items by Category

`https://api.muetab.com/items/:category`

Returns all marketplace items in the given category.

#### Get Item

`https://api.muetab.com/item/:category/:item`

Returns a specific marketplace item by category and name.

### Other

#### /

`https://api.muetab.com`

Returns a hello world message.

##### Response

```json
{
  "version": "1.7.0",
  "message": "Hello World! API docs: https://docs.muetab.com"
}
```

---
title: Endpoints
---

There are endpoints for images, quotes and update information.

## Public

These endpoints can be used by anyone

### Images

#### Get Random Image

`https://api.muetab.com/images/random`

This endpoint allows you to get a random image. If category isn't specified it will get a random image from all categories.

##### Request

| Parameter           | Type   | Info                                        |
| ------------------- | ------ | ------------------------------------------- |
| category (optional) | string | Returns random image from specific category |

#### Response

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

This endpoint returns all categories in an array.

##### Response

```json
["Outdoors"]
```

#### Get Photographers

`https://api.muetab.com/images/photographers`

This endpoint returns all photographers in an array.

#### Response

```json
["photographer1", "photographer2"]
```

### Quotes

#### Get Random Quote

`https://api.muetab.com/quotes/random`

This endpoint allows you to get a random quote. If language isn't specified it will return a random quote in any language.

##### Request

| Parameter           | Type   | Info                                      |
| ------------------- | ------ | ----------------------------------------- |
| language (optional) | string | Get a random quote in a specific language |

#### Response

```json
{
  "author": "E.E Cummings",
  "quote": "It takes courage to grow up and become who you really are.",
  "language": "English"
}
```

#### Get Quote Languages

`https://api.muetab.com/quotes/languages`

This endpoint returns all quote languages in an array.

##### Response

```json
["English", "French"]
```

### Other

#### /

`https://api.muetab.com`

Returns hello world message.

##### Response

```json
{
  "version": "1.4.0",
  "message": "Hello World! API docs: https://docs.muetab.com"
}
```

## Admin

These routes are for admins only. The image routes are designed for our [uploader](https://github.com/mue/uploader) utility.

### Images

#### Add image

`https://api.muetab.com/images/add`

This endpoint allows you to add an image to a database. Before doing so, you should upload the file to your Cloudinary folder first. It's advised to use our uploading utility instead of doing this manually as it is easier.

##### Request

| Parameter    | Type   | Info                                                                                                |
| ------------ | ------ | --------------------------------------------------------------------------------------------------- |
| filename     | string | The name of your file, without the extension                                                        |
| photographer | string | The photographer who took the image, this will appear in /images/photographers                      |
| category     | string | The category the image is in, this will appear in /images/categories                                |
| location     | string | A formatted location string, such as "Manchester, United Kingdom", "Manchester" or "United Kingdom" |
| camera       | string | The name of the camera used, such as "Canon 1300D" or "Samsung Galaxy S8"                           |

#### Response

```json
{
  "id": "3dd1ecaa-78bc-4063-b996-0fc033dfbccd",
  "message": "Success"
}
```

#### Remove image

`https://api.muetab.com/images/delete`

This endpoint allows you to delete an image from the database. Before doing so, you should remove the file from your Cloudinary folder first. It's advised to use our uploading utility instead of doing this manually as it is easier.

##### Request

| Parameter | Type   | Info                                                                                           |
| --------- | ------ | ---------------------------------------------------------------------------------------------- |
| id        | string | The uuid returned by the add image route. You can manually find this in your database as well. |

#### Response

```json
{
  "message": "Success"
}
```

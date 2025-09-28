---
title: Changelog
---

The changelog dates use the DD-MM-YYY format.

### 1.6.1 - 23/11/2021
#### Added
* Full umami implementation (apart from location and resolution, this is not planned)
* Log unauthorized errors to umami

### Changed
* Code modifications

### 1.6.0 - 16/08/2021
#### Added
* Admin API for adding and removing quotes
* Better ratelimit control

#### Changed
* Optimisation

#### Removed
* Resolution from image response

### 1.5.1 - 06/07/2021
#### Removed
* API no longer returns IDs for images and quotes

### 1.5.0 - 20/05/2021
#### Changed
* URLs for all endpoints have been changed
#### Removed
* Unsplash documentation as it's private
* Information about marketplace themes as they are no longer planned
* /getUpdate endpoint removed, use blog API instead
* You can no longer get images or quotes by ID

### 1.4.0 - 14/01/2021
#### Added
* Documentation now covers marketplace information
* /getQuoteLanguages route and allow getting quotes in other languages

#### Changed
* API optimisations
* Various fixes and changes

### 1.3.0 - 31/08/2020
#### Added
* A lot more info to the /getUpdate endpoint, now using data from the blog
* /getPhotographers endpoint
* /getImages now includes camera model and resolution

### 1.2.1 - 14/12/2019
#### Changed
* Make error messages like the Fastify default

### 1.2.0 - 10/12/2019
#### Added
* Status codes on invalid ID and invalid category (400) as well as 404
* Make [source code](https://github.com/mue/api) public

#### Changed
* Changed "Category not found" to "Invalid Category"
* Changed "404" to "404 Not Found"
* Update internal libraries (less broken now)
* Possibly improve performance (removed no longer needed module)

### 1.1.1 - 07/12/2019
#### Changed
* Improve error messages
* Update internal libraries (less broken now)
* Improve security (and possibly performance)

### 1.1.0 - 03/12/2019
#### Added
* Support for getting images and quotes via specific ID

### 1.0.0 - 26/06/2019
Please note the date for this update may not be exact
#### Added
* Initial Release

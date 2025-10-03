---
title: Creating Add-ons
---

## Creating Add-ons with the Online Editor (Recommended)

The easiest way to create Mue Tab add-ons is using our **online visual editor** at [muetab.com/marketplace/create](https://muetab.com/marketplace/create).

### Features of the Web Editor

The online creator provides a guided 6-step wizard that makes creating add-ons easy:

1. **Welcome Screen** - Introduction and draft recovery
2. **Type Selection** - Choose between Photo Pack, Quote Pack, or Preset Settings
3. **Metadata** - Add name, description, author, version, and icons
4. **Content Editor** - Add and manage your photos, quotes, or settings
5. **Preview** - See exactly how your add-on will look in the marketplace
6. **Export** - Download your JSON file ready for submission

#### Advanced Features

- **Auto-Save Drafts** - Never lose your work! Drafts are automatically saved to your browser
- **Draft Management** - Save multiple named drafts, export/import them
- **Image Validation** - Real-time URL validation with visual previews
- **Content Templates** - Start with pre-made templates (Nature, Urban, Motivational, etc.)
- **Smart Validation** - Catch errors, warnings, and get helpful tips before exporting
- **Photo Pack Tools**:
  - Drag-and-drop reordering
  - Search and filter photos
  - Bulk edit photographer/location
  - Thumbnail previews
  - Expand/collapse all
  - Shuffle photos
- **Marketplace Preview** - See exactly how your add-on card will appear
- **One-Click Copy** - Copy the generated JSON to clipboard

### Using the Online Editor

1. Go to [muetab.com/marketplace/create](https://muetab.com/marketplace/create)
2. Click "Get Started" to begin the wizard
3. Select your add-on type (Photos, Quotes, or Settings)
4. Fill in the metadata fields:
   - **Name**: Your add-on's title
   - **Description**: What your add-on provides
   - **Author**: Your name
   - **Version**: Start with "1.0.0"
   - **Icon URL**: Square icon image (recommended 512x512px)
   - **Screenshot URL**: Preview image of your add-on
5. Add your content:
   - **Photo Packs**: Add photos with photographer, location, and image URLs
   - **Quote Packs**: Add quotes with author attribution
   - **Settings**: Paste your exported settings JSON or upload a file
6. Preview your add-on to see how it will appear in the marketplace
7. Download the generated JSON file
8. Test it in Mue Tab via Settings → My Add-ons → Sideload

### Tips for Creating Great Add-ons

- **Use high-quality images** - For photo packs, use images at least 1920x1080px
- **Provide proper attribution** - Always credit photographers and quote authors
- **Write clear descriptions** - Help users understand what your add-on offers
- **Test before sharing** - Use the sideload feature to test your add-on first
- **Use templates** - Click "Browse Templates" in the content step to start quickly
- **Save your work** - Use named drafts to organize multiple projects

---

## Manual Creation (Advanced)

If you prefer to create add-ons manually, all add-ons use the JSON format. This method requires more technical knowledge but gives you complete control.

### Photo Pack Format

```json
{
  "name": "Beautiful Landscapes",
  "description": "A collection of stunning landscape photography",
  "icon_url": "https://example.com/icon.jpg",
  "screenshot_url": "https://example.com/screenshot.jpg",
  "type": "photos",
  "verified": false,
  "version": "1.0.0",
  "author": "Your Name",
  "photos": [
    {
      "photographer": "John Doe",
      "location": "Norwegian Fjords, Norway",
      "url": {
        "default": "https://example.com/photo1.jpg"
      }
    },
    {
      "photographer": "Jane Smith",
      "location": "Yosemite National Park, USA",
      "url": {
        "default": "https://example.com/photo2.jpg"
      }
    }
  ]
}
```

**Important**: The `location` and `photographer` fields are displayed in Mue Tab, so provide accurate information.

### Quote Pack Format

```json
{
  "name": "Inspirational Quotes",
  "description": "Motivational quotes to start your day",
  "icon_url": "https://example.com/icon.jpg",
  "screenshot_url": "https://example.com/screenshot.jpg",
  "type": "quotes",
  "verified": false,
  "version": "1.0.0",
  "author": "Your Name",
  "quotes": [
    {
      "author": "Albert Einstein",
      "quote": "Life is like riding a bicycle. To keep your balance, you must keep moving."
    },
    {
      "author": "Maya Angelou",
      "quote": "You will face many defeats in life, but never let yourself be defeated."
    }
  ]
}
```

### Preset Settings Format

```json
{
  "name": "Minimalist Setup",
  "description": "A clean, distraction-free Mue Tab configuration",
  "icon_url": "https://example.com/icon.jpg",
  "screenshot_url": "https://example.com/screenshot.jpg",
  "type": "settings",
  "verified": false,
  "version": "1.0.0",
  "author": "Your Name",
  "settings": {
    "greeting": "false",
    "greeterName": "",
    "quicklinks": "false",
    "quote": "false",
    "timezone": "auto",
    "timeType": "24"
  }
}
```

**Finding Setting Keys**: To discover available settings:

1. Open Mue Tab
2. Press F12 to open Developer Tools
3. Go to Application → Local Storage
4. Look for keys starting with your Mue Tab domain
5. Or export your settings from Settings → Advanced → Export Settings

### Testing Your Add-on

After creating your JSON file:

1. Save it with a descriptive filename (e.g., `my_photo_pack.json`)
2. Open Mue Tab
3. Go to Settings → My Add-ons → Sideload
4. Upload your JSON file
5. Test that everything works correctly

### Submitting to the Marketplace

Once your add-on is ready:

1. Ensure all required fields are filled correctly
2. Test thoroughly using sideload
3. Submit your add-on through the Mue Tab submission process
4. **Do not set** `verified` to `true` - verification is handled by the Mue team

### Best Practices

- **Image URLs**: Use HTTPS URLs, avoid HTTP
- **Image Hosting**: Use reliable hosting (Imgur, GitHub, CDN services)
- **File Extensions**: Use `.jpg`, `.jpeg`, `.png`, or `.webp` for images
- **Versioning**: Follow semantic versioning (1.0.0, 1.1.0, 2.0.0, etc.)
- **Descriptions**: Keep under 200 characters for best display
- **Attribution**: Always credit original creators properly
- **Quality**: Include at least 10+ photos or quotes for a good experience
- **Testing**: Test on different screen sizes if possible

### Common Issues

**Images not loading?**

- Check that URLs are accessible (not behind authentication)
- Ensure URLs use HTTPS, not HTTP
- Verify image file extensions are correct
- Check for CORS issues (some hosting services block external access)

**Settings not applying?**

- Verify setting keys match exactly (case-sensitive)
- Check that values are in the correct format (strings, booleans, etc.)
- Export your current settings to see the correct format

**JSON validation errors?**

- Use a JSON validator like [jsonlint.com](https://jsonlint.com)
- Check for missing commas, quotes, or brackets
- Ensure all strings are properly escaped

### Need Help?

- Use the [online editor](https://muetab.com/marketplace/create) for a guided experience
- Check the [Mue Tab documentation](https://muetab.com/docs)
- Join the Mue community for support and feedback

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  field?: string;
}

export interface PhotoValidation {
  url: string;
  issues: ValidationIssue[];
}

export interface QuoteValidation {
  index: number;
  issues: ValidationIssue[];
}

export interface ContentValidationResult {
  isValid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  infos: ValidationIssue[];
  photoValidations?: PhotoValidation[];
  quoteValidations?: QuoteValidation[];
}

// Validate image URL format
export function validateImageUrl(url: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!url || !url.trim()) {
    issues.push({ type: 'error', message: 'Image URL is required' });
    return issues;
  }

  // Check protocol
  if (!url.match(/^https?:\/\//i)) {
    issues.push({ type: 'error', message: 'URL must start with http:// or https://' });
  }

  // Check file extension
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  const hasValidExtension = validExtensions.some((ext) => url.toLowerCase().includes(ext));

  if (!hasValidExtension) {
    issues.push({
      type: 'warning',
      message: 'URL should point to an image file (.jpg, .png, .webp, etc.)',
    });
  }

  // Recommend HTTPS
  if (url.match(/^http:\/\//i)) {
    issues.push({
      type: 'warning',
      message: 'Consider using HTTPS for better security',
    });
  }

  // Check URL length
  if (url.length > 500) {
    issues.push({
      type: 'warning',
      message: 'URL is very long, consider using a URL shortener',
    });
  }

  return issues;
}

// Validate photo pack
export function validatePhotos(
  photos: Array<{ url: { default: string }; photographer?: string; location?: string }>,
): ContentValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const infos: ValidationIssue[] = [];
  const photoValidations: PhotoValidation[] = [];

  // Check if there are photos
  if (!photos || photos.length === 0) {
    errors.push({ type: 'error', message: 'At least one photo is required' });
    return { isValid: false, errors, warnings, infos };
  }

  // Filter out empty photos
  const validPhotos = photos.filter((p) => p.url?.default?.trim());

  if (validPhotos.length === 0) {
    errors.push({ type: 'error', message: 'At least one photo with a valid URL is required' });
    return { isValid: false, errors, warnings, infos };
  }

  // Check for duplicates
  const urlSet = new Set<string>();
  const duplicates: string[] = [];

  validPhotos.forEach((photo) => {
    const url = photo.url.default.trim();
    if (urlSet.has(url)) {
      duplicates.push(url);
    }
    urlSet.add(url);
  });

  if (duplicates.length > 0) {
    warnings.push({
      type: 'warning',
      message: `Found ${duplicates.length} duplicate photo URL${duplicates.length > 1 ? 's' : ''}`,
    });
  }

  // Validate each photo
  validPhotos.forEach((photo) => {
    const photoIssues = validateImageUrl(photo.url.default);

    if (!photo.photographer || !photo.photographer.trim()) {
      photoIssues.push({
        type: 'warning',
        message: 'Photographer name is recommended for attribution',
      });
    }

    if (!photo.location || !photo.location.trim()) {
      photoIssues.push({
        type: 'info',
        message: 'Location helps users discover your photos',
      });
    }

    photoValidations.push({
      url: photo.url.default,
      issues: photoIssues,
    });

    photoIssues.forEach((issue) => {
      if (issue.type === 'error') errors.push(issue);
      else if (issue.type === 'warning') warnings.push(issue);
      else infos.push(issue);
    });
  });

  // Size recommendations
  if (validPhotos.length < 5) {
    infos.push({
      type: 'info',
      message: 'Consider adding more photos (10+ recommended for better variety)',
    });
  } else if (validPhotos.length >= 20) {
    infos.push({
      type: 'info',
      message: `Great! ${validPhotos.length} photos will provide excellent variety`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    infos,
    photoValidations,
  };
}

// Validate quote pack
export function validateQuotes(
  quotes: Array<{ quote: string; author: string; name?: string }>,
): ContentValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const infos: ValidationIssue[] = [];
  const quoteValidations: QuoteValidation[] = [];

  // Check if there are quotes
  if (!quotes || quotes.length === 0) {
    errors.push({ type: 'error', message: 'At least one quote is required' });
    return { isValid: false, errors, warnings, infos };
  }

  // Filter out empty quotes
  const validQuotes = quotes.filter((q) => q.quote?.trim() && q.author?.trim());

  if (validQuotes.length === 0) {
    errors.push({ type: 'error', message: 'At least one quote with text and author is required' });
    return { isValid: false, errors, warnings, infos };
  }

  // Check for duplicates
  const quoteSet = new Set<string>();
  const duplicates: string[] = [];

  validQuotes.forEach((quote) => {
    const key = `${quote.quote.trim()}|${quote.author.trim()}`;
    if (quoteSet.has(key)) {
      duplicates.push(quote.quote);
    }
    quoteSet.add(key);
  });

  if (duplicates.length > 0) {
    warnings.push({
      type: 'warning',
      message: `Found ${duplicates.length} duplicate quote${duplicates.length > 1 ? 's' : ''}`,
    });
  }

  // Validate each quote
  validQuotes.forEach((quote, index) => {
    const quoteIssues: ValidationIssue[] = [];

    // Check quote length
    const quoteLength = quote.quote.trim().length;
    if (quoteLength < 10) {
      quoteIssues.push({
        type: 'warning',
        message: 'Quote is very short, consider adding more context',
      });
    } else if (quoteLength > 300) {
      quoteIssues.push({
        type: 'warning',
        message: 'Quote is very long, it may not display well',
      });
    }

    // Check author length
    if (quote.author.trim().length > 50) {
      quoteIssues.push({
        type: 'warning',
        message: 'Author name is very long',
      });
    }

    quoteValidations.push({
      index,
      issues: quoteIssues,
    });

    quoteIssues.forEach((issue) => {
      if (issue.type === 'error') errors.push(issue);
      else if (issue.type === 'warning') warnings.push(issue);
      else infos.push(issue);
    });
  });

  // Size recommendations
  if (validQuotes.length < 10) {
    infos.push({
      type: 'info',
      message: 'Consider adding more quotes (20+ recommended for better variety)',
    });
  } else if (validQuotes.length >= 50) {
    infos.push({
      type: 'info',
      message: `Excellent! ${validQuotes.length} quotes will provide great variety`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    infos,
    quoteValidations,
  };
}

// Validate settings JSON
export function validateSettings(settingsJson: string): ContentValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const infos: ValidationIssue[] = [];

  if (!settingsJson || !settingsJson.trim()) {
    errors.push({ type: 'error', message: 'Settings JSON is required' });
    return { isValid: false, errors, warnings, infos };
  }

  try {
    const parsed = JSON.parse(settingsJson);

    // Check if it's an object
    if (typeof parsed !== 'object' || Array.isArray(parsed)) {
      errors.push({ type: 'error', message: 'Settings must be a JSON object' });
      return { isValid: false, errors, warnings, infos };
    }

    // Check if it has settings
    const settingsCount = Object.keys(parsed).length;
    if (settingsCount === 0) {
      warnings.push({ type: 'warning', message: 'Settings object is empty' });
    } else if (settingsCount < 5) {
      infos.push({
        type: 'info',
        message: 'Consider adding more settings for a comprehensive preset',
      });
    } else {
      infos.push({
        type: 'info',
        message: `Good! ${settingsCount} settings configured`,
      });
    }
  } catch (e) {
    errors.push({
      type: 'error',
      message: `Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    infos,
  };
}

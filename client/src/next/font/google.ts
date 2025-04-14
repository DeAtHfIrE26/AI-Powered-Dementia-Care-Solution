// Mock implementation of Next.js font system for compatibility
// This simulates the Next.js font API in a non-Next.js environment

type FontOptions = {
  subsets: string[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  weight?: string[] | number[];
  variable?: string;
  style?: 'normal' | 'italic';
};

interface FontObject {
  className: string;
  variable: string;
  style: {
    fontFamily: string;
  };
}

function createFontObject(name: string, options: FontOptions): FontObject {
  const className = `font-${name.toLowerCase().replace(/\s+/g, '-')}`;
  const variable = options.variable || `--font-${name.toLowerCase().replace(/\s+/g, '-')}`;
  
  return {
    className,
    variable,
    style: {
      fontFamily: `var(${variable}), ${getFallbackFonts(name)}`
    }
  };
}

function getFallbackFonts(name: string): string {
  // Default fallbacks by font type
  if (['Inter', 'Roboto', 'Open Sans'].includes(name)) {
    return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  }
  if (['Source Sans Pro', 'Source Sans 3'].includes(name)) {
    return '"Helvetica Neue", Arial, sans-serif';
  }
  return 'sans-serif';
}

export function Inter(options: FontOptions): FontObject {
  return createFontObject('Inter', options);
}

export function Source_Sans_3(options: FontOptions): FontObject {
  return createFontObject('Source Sans 3', options);
}

// Export other common Google fonts
export function Roboto(options: FontOptions): FontObject {
  return createFontObject('Roboto', options);
}

export function Open_Sans(options: FontOptions): FontObject {
  return createFontObject('Open Sans', options);
}

export function Lato(options: FontOptions): FontObject {
  return createFontObject('Lato', options);
}

export function Montserrat(options: FontOptions): FontObject {
  return createFontObject('Montserrat', options);
}

import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'eager' | 'lazy';
  children?: React.ReactNode;
}

export default function Image({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  quality,
  className,
  style,
  onLoad,
  onError,
  loading,
  children,
  ...rest
}: ImageProps) {
  // Build the srcSet for responsive images
  const buildSrcSet = () => {
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
      return undefined;
    }
    
    // Basic implementation for demo purposes
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
    const baseUrl = new URL(src, window.location.href);
    
    // For simplicity, just append width parameter
    return widths
      .map((w) => `${baseUrl.toString()} ${w}w`)
      .join(', ');
  };

  // Calculate the image styles
  const imageStyles: React.CSSProperties = {
    ...style,
  };

  if (fill) {
    imageStyles.objectFit = 'cover';
    imageStyles.position = 'absolute';
    imageStyles.height = '100%';
    imageStyles.width = '100%';
    imageStyles.left = 0;
    imageStyles.top = 0;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      loading={priority ? 'eager' : loading || 'lazy'}
      srcSet={buildSrcSet()}
      onLoad={onLoad}
      onError={onError}
      className={cn(className)}
      style={imageStyles}
      {...rest}
    />
  );
}

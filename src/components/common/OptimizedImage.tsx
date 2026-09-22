import React, { useState } from 'react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
}

/**
 * Utility to generate responsive WebP sources and fallback JPEG/PNG.
 * Supports auto-resolution of -480.webp, -800.webp, -1200.webp for responsive loading.
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px',
  className = '',
  containerClassName = '',
  fallbackSrc,
  loading,
  decoding,
  fetchPriority,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Derive responsive WebP paths if the src is a local raster asset (.jpg, .png, .jpeg)
  const isRaster = /\.(jpe?g|png)$/i.test(src);
  const isSvg = /\.svg$/i.test(src);

  let webpSrcSet: string | undefined;
  let defaultWebp: string | undefined;

  if (isRaster) {
    const basePath = src.replace(/\.(jpe?g|png)$/i, '');
    webpSrcSet = `${basePath}-480.webp 480w, ${basePath}-800.webp 800w, ${basePath}-1200.webp 1200w, ${basePath}.webp 1200w`;
    defaultWebp = `${basePath}.webp`;
  }

  const effectiveLoading = priority ? 'eager' : (loading || 'lazy');
  const effectiveDecoding = decoding || 'async';
  const effectiveFetchPriority = priority ? 'high' : (fetchPriority || 'auto');

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <picture>
        {/* Modern WebP responsive source if raster */}
        {isRaster && !hasError && (
          <source
            type="image/webp"
            srcSet={webpSrcSet}
            sizes={sizes}
          />
        )}

        <img
          src={hasError && fallbackSrc ? fallbackSrc : (isRaster ? (defaultWebp || src) : src)}
          alt={alt}
          width={width}
          height={height}
          loading={effectiveLoading}
          decoding={effectiveDecoding}
          fetchPriority={effectiveFetchPriority}
          referrerPolicy="no-referrer"
          onError={() => {
            if (!hasError) {
              setHasError(true);
            }
          }}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${isLoaded || priority ? 'opacity-100' : 'opacity-90'} ${className}`}
          {...props}
        />
      </picture>
    </div>
  );
};

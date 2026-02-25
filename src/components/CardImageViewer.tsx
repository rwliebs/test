'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Card } from '../types/card';

interface CardImageViewerProps {
  /** Card object containing image URL and metadata */
  card: Card;
  /** Optional CSS class name */
  className?: string;
  /** Image priority for faster loading (default: true) */
  priority?: boolean;
}

/**
 * CardImageViewer component displays a high-resolution MTG card image
 * with optimized loading performance and proper error handling.
 *
 * Performance optimizations:
 * - Uses Next.js Image component for automatic optimization
 * - Loads images with priority for sub-2-second load times
 * - Prevents layout shift with fixed aspect ratio
 * - Supports multiple image quality options
 */
export function CardImageViewer({
  card,
  className = '',
  priority = true
}: CardImageViewerProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Select best available image URL
  const imageUrl = card.imageUrls?.large || card.imageUrls?.normal || card.imageUrl;

  // Standard MTG card aspect ratio (width:height = 5:7)
  const CARD_WIDTH = 488; // High resolution width
  const CARD_HEIGHT = 680; // High resolution height

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      data-testid="card-image-viewer"
      className={`relative ${className}`}
      style={{
        width: '100%',
        maxWidth: `${CARD_WIDTH}px`,
        aspectRatio: '5/7',
      }}
    >
      {!imageError ? (
        <>
          {/* Loading skeleton to prevent layout shift */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          )}

          <Image
            src={imageUrl}
            alt={`${card.name} card image`}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            priority={priority}
            quality={90}
            className={`rounded-lg shadow-lg transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
            onError={handleImageError}
            onLoad={handleImageLoad}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 488px"
            unoptimized={false}
          />
        </>
      ) : (
        // Fallback for image load errors
        <div
          className="flex items-center justify-center bg-gray-100 rounded-lg shadow-lg"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🃏</div>
            <p className="text-gray-600 font-medium">{card.name}</p>
            <p className="text-gray-400 text-sm mt-2">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardImageViewer;

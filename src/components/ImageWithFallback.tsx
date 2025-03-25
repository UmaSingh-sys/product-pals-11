
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  fallbackSrc = '/placeholder.svg',
  className,
  ...rest 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const onError = () => {
    if (!isError) {
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", !isLoaded && "shimmer")}>
      <img
        src={imgSrc}
        alt={alt}
        onError={onError}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...rest}
      />
    </div>
  );
};

export default ImageWithFallback;

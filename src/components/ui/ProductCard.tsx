'use client';

import React from 'react';

interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  imageAlt: string;
  isFreeShipping?: boolean;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  price,
  originalPrice,
  imageUrl,
  imageAlt,
  isFreeShipping = false,
  onAddToCart,
}) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <article
      className="bg-white dark:bg-white/10 rounded-xl overflow-hidden border border-oak-border dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-label={`${name} 상품 카드`}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url("${imageUrl}")` }}>
        {isFreeShipping && (
          <div
            className="absolute top-4 left-4 bg-sage-green text-white px-3 py-1 rounded-lg font-bold text-sm"
            aria-label="무료배송"
          >
            무료배송
          </div>
        )}
        <span className="sr-only">{imageAlt}</span>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <p className="text-primary/60 dark:text-white/60 text-base mb-1 font-semibold">
          {category}
        </p>
        <h3 className="text-primary dark:text-white text-2xl font-bold mb-3 leading-tight">
          {name}
        </h3>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-primary/40 dark:text-white/40 line-through text-lg font-bold">
                {originalPrice.toLocaleString('ko-KR')}원
              </span>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-primary dark:text-white text-3xl font-extrabold">
                {price.toLocaleString('ko-KR')}원
              </span>
              {discount > 0 && (
                <span className="text-error text-xl font-bold" aria-label={`${discount}% 할인`}>
                  {discount}%
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label={`${name} 장바구니에 담기`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }} aria-hidden="true">
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

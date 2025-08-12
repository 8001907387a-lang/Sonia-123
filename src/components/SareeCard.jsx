import React, { useMemo, useState, useCallback } from 'react';
import './SareeCard.css';

/**
 * @typedef {Object} Saree
 * @property {string | number} [id]
 * @property {string} name
 * @property {string} [description]
 * @property {string} [image]
 * @property {number | string} [price]
 * @property {Record<string, any>} [meta]
 */

/**
 * Formats a numeric amount to a localized currency string.
 * Falls back gracefully if Intl is unavailable or input is invalid.
 * @param {number | string | undefined | null} amount
 * @param {string} currency
 * @param {string} locale
 */
export const formatPrice = (amount, currency = 'INR', locale = 'en-IN') => {
  const numericAmount = amount === '' ? NaN : Number(amount);
  if (Number.isNaN(numericAmount)) return null;
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(numericAmount);
  } catch {
    // Fallback simple formatting
    const symbol = currency === 'INR' ? '₹' : '';
    return `${symbol}${numericAmount.toFixed(2)}`;
  }
};

/**
 * Lightweight utility to join class names.
 * @param {...(string | false | null | undefined)} classes
 */
const cx = (...classes) => classes.filter(Boolean).join(' ');

/**
 * @param {{
 *   saree: Saree,
 *   onAddToCart?: (saree: Saree) => void,
 *   className?: string,
 *   showDescription?: boolean,
 *   currency?: string,
 * }} props
 */
const SareeCard = ({
  saree,
  onAddToCart,
  className = '',
  showDescription = true,
  currency = 'INR',
}) => {
  const { name, description, image, price } = saree || {};
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const priceLabel = useMemo(() => formatPrice(price, currency, 'en-IN'), [price, currency]);

  const handleAddToCart = useCallback(() => {
    if (onAddToCart) onAddToCart(saree);
  }, [onAddToCart, saree]);

  const showPrice = priceLabel != null;

  return (
    <article className={cx('saree-card', className)}>
      <div className="saree-card__media">
        {image && !imageError ? (
          <img
            className={cx('saree-card__image', imageLoaded && 'is-loaded')}
            src={image}
            alt={`${name || 'Saree'} product image`}
            loading="lazy"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="saree-card__image--placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="saree-card__body">
        {name && <h3 className="saree-card__title">{name}</h3>}
        {showDescription && description && (
          <p className="saree-card__description">{description}</p>
        )}

        <div className="saree-card__footer">
          <div className="saree-card__price" aria-label={showPrice ? `Price ${priceLabel}` : 'Price on request'}>
            {showPrice ? (
              <span>{priceLabel}</span>
            ) : (
              <span className="saree-card__price--contact">Contact for price</span>
            )}
          </div>

          <button
            type="button"
            className="saree-card__button"
            onClick={handleAddToCart}
            aria-label={`Add ${name || 'item'} to cart`}
            disabled={!onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default React.memo(SareeCard);
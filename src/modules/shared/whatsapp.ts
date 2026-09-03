import { SITE_CONFIG } from '../../core/config/site.config';
import { CATEGORY_DISPLAY_LABELS } from '../catalog/types';
import type { Product } from '../catalog/types';

export function buildWhatsAppLink(product: Product): string {
  const brandPart = product.brand ? ` de la marca ${product.brand}` : '';
  const categoryLabel = CATEGORY_DISPLAY_LABELS[product.category];

  const message = `Hola, deseo consultar por el producto: ${product.name}${brandPart} (${categoryLabel})`;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
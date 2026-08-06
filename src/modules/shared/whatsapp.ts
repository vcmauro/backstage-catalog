import { SITE_CONFIG } from '../../core/config/site.config';
import type { Product } from '../catalog/types';

export function buildWhatsAppLink(product: Product): string {
  const message = `Hola Backstage, deseo consultar por el producto: ${product.name} de la marca ${product.brand}`;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
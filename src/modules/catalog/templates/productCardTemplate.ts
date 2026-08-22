import type { Product } from '../types';

export function renderProductCard(product: Product): string {
  const priceLabel = product.price != null
    ? `S/ ${product.price.toFixed(2)}`
    : 'Consultar precio';

  const imageSrc = product.image_url ?? '/placeholder-product.webp';

  // Tamaño de tarjeta: ver comentarios en ProductGrid.astro (columnas) y aquí (padding/texto).
  return `
    <a href="/producto?id=${product.id}" class="block bg-white rounded-lg overflow-hidden shadow-sm active:scale-[0.98] transition-transform">
      <img
        src="${imageSrc}"
        alt="${product.name}"
        loading="lazy"
        class="w-full aspect-square object-cover bg-gray-100"
      />
      <div class="p-2">
        <p class="font-semibold text-gray-800 text-xs truncate">${product.name}</p>
        <p class="text-[11px] text-gray-500">${product.brand}</p>
        <p class="text-backstage-primary font-bold text-sm mt-0.5">${priceLabel}</p>
      </div>
    </a>
  `;
}
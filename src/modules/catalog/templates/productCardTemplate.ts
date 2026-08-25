import type { Product } from '../types';

export function renderProductCard(product: Product): string {
  const imageSrc = product.image_url ?? '/placeholder-product.webp';

  // Solo se muestra el precio de lista tachado si de verdad representa un descuento
  // (existe, y es mayor al precio actual). Si no, se muestra solo el precio normal.
  const hasDiscount = product.list_price != null && product.price != null && product.list_price > product.price;

  let priceBlock: string;
  if (product.price == null) {
    priceBlock = `<p class="text-backstage-primary font-bold text-sm mt-0.5">Consultar precio</p>`;
  } else if (hasDiscount) {
    priceBlock = `
      <div class="flex items-baseline gap-1.5 mt-0.5">
        <span class="text-backstage-primary font-bold text-sm">S/ ${product.price.toFixed(2)}</span>
        <span class="line-through text-gray-400 text-[10px]">S/ ${product.list_price!.toFixed(2)}</span>
      </div>
    `;
  } else {
    priceBlock = `<p class="text-backstage-primary font-bold text-sm mt-0.5">S/ ${product.price.toFixed(2)}</p>`;
  }

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
        <p class="text-[11px] text-gray-500">${product.brand ?? ''}</p>
        ${priceBlock}
      </div>
    </a>
  `;
}
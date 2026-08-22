import type { Product } from '../../catalog/types';

export function renderAdminProductRow(product: Product): string {
  const priceLabel = product.price != null ? `S/ ${product.price.toFixed(2)}` : 'Sin precio';

  const availabilityBadge = product.is_available
    ? '<span class="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Disponible</span>'
    : '<span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Oculto</span>';

  const imageSrc = product.image_url ?? '/placeholder-product.webp';

  return `
    <div class="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
      <img src="${imageSrc}" alt="${product.name}" class="w-14 h-14 object-cover rounded-lg bg-gray-100 shrink-0" />
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-gray-800 text-sm truncate">${product.name}</p>
        <p class="text-xs text-gray-500">${product.category}${product.brand ? ' · ' + product.brand : ''}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-backstage-primary font-bold text-sm">${priceLabel}</span>
          ${availabilityBadge}
        </div>
      </div>
      <div class="flex flex-col gap-1 shrink-0 items-end">
        <a href="/panel/producto?id=${product.id}" class="text-xs font-semibold text-backstage-primary underline">Editar</a>
        <button type="button" data-delete-id="${product.id}" class="text-xs font-semibold text-red-600 underline">Eliminar</button>
      </div>
    </div>
  `;
}
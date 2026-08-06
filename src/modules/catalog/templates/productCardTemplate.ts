import type { Product } from '../types';

export function renderProductCard(product: Product): string {
  const priceLabel = product.price != null
    ? `$${product.price.toFixed(2)}`
    : 'Consultar precio';

  const imageSrc = product.image_url ?? '/placeholder-product.webp';

  // ------------------------------------------------------------------
  // AJUSTE DE TAMAÑO DE TARJETA — modifica aquí y prueba en el navegador:
  //   - "aspect-square" en <img>   -> proporción de la foto
  //                                   (prueba "aspect-[4/5]" para más alta y angosta)
  //   - "p-2" en el <div> inferior -> padding interno (prueba "p-1.5" para aún más chico)
  //   - "text-xs" (nombre)         -> tamaño del nombre del producto
  //   - "text-[11px]" (marca)      -> tamaño de la marca
  //   - "text-sm" (precio)         -> tamaño del precio
  // El número de columnas (cuántas tarjetas caben por fila) se ajusta
  // en ProductGrid.astro, no aquí.
  // ------------------------------------------------------------------
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
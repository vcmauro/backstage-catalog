import { getAvailableProducts } from './services/catalogApi';
import { renderProductCard } from './templates/productCardTemplate';
import type { Product, ProductCategory } from './types';

// Para Peluches, Regalo Bebés y Juguetes: solo buscador, sin filtros de marca/género
// (a diferencia de /perfumes, que sí los tiene y no se toca).
export async function initSimpleCategoryList(category: ProductCategory) {
  const grid = document.getElementById('product-grid')!;
  const spinner = document.getElementById('catalog-spinner')!;
  const empty = document.getElementById('catalog-empty')!;
  const heading = document.getElementById('catalog-heading')!;
  const searchInput = document.getElementById('catalog-search') as HTMLInputElement;

  let allProducts: Product[] = [];
  let search = '';

  function applyFilters() {
    const term = search.trim().toLowerCase();

    const filtered = allProducts.filter((p) =>
      p.category === category &&
      (term === '' || p.name.toLowerCase().includes(term))
    );

    heading.textContent = `${filtered.length} producto${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      grid.classList.add('hidden');
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      grid.classList.remove('hidden');
      grid.innerHTML = filtered.map(renderProductCard).join('');
    }
  }

  try {
    allProducts = await getAvailableProducts();
    spinner.classList.add('hidden');
    applyFilters();
  } catch (err) {
    spinner.classList.add('hidden');
    empty.textContent = 'No se pudo cargar el catálogo. Intenta de nuevo más tarde.';
    empty.classList.remove('hidden');
    console.error(err);
    return;
  }

  searchInput.addEventListener('input', () => {
    search = searchInput.value;
    applyFilters();
  });
}
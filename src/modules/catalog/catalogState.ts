import { getAvailableProducts } from './services/catalogApi';
import { renderProductCard } from './templates/productCardTemplate';
import type { Product, ProductBrand, ProductCategory, GenderFilterValue } from './types';

interface Filters {
  brand: ProductBrand;
  category: ProductCategory;
  search: string;
  genders: Set<GenderFilterValue>; // vacío = sin filtro = mostrar todos
}

export async function initCatalog() {
  const grid = document.getElementById('product-grid')!;
  const spinner = document.getElementById('catalog-spinner')!;
  const empty = document.getElementById('catalog-empty')!;
  const heading = document.getElementById('catalog-heading')!;
  const searchInput = document.getElementById('catalog-search') as HTMLInputElement;
  const brandButtons = document.querySelectorAll<HTMLButtonElement>('[data-brand-filter]');
  const categoryButtons = document.querySelectorAll<HTMLButtonElement>('[data-category-tab]');
  const genderButtons = document.querySelectorAll<HTMLButtonElement>('[data-gender-filter]');

  let allProducts: Product[] = [];

  const filters: Filters = {
    brand: (brandButtons[0]?.dataset.brandFilter as ProductBrand) ?? 'Yanbal',
    category: (categoryButtons[0]?.dataset.categoryTab as ProductCategory) ?? 'Perfumes',
    search: '',
    genders: new Set<GenderFilterValue>(),
  };

  function matchesGender(product: Product): boolean {
    if (filters.genders.size === 0) return true; // sin filtro activo: pasan todos

    if (product.gender === null) return filters.genders.has('Unisex');
    if (product.gender === 'Damas') return filters.genders.has('Damas');
    if (product.gender === 'Caballeros') return filters.genders.has('Caballeros');
    if (product.gender === 'Niños') return filters.genders.has('Niños');

    return false;
  }

  function applyFilters() {
    const term = filters.search.trim().toLowerCase();

    const filtered = allProducts.filter((p) =>
      p.brand === filters.brand &&
      p.category === filters.category &&
      matchesGender(p) &&
      (term === '' || p.name.toLowerCase().includes(term))
    );

    heading.textContent = `Catálogo - ${filters.brand} (${filtered.length} producto${filtered.length === 1 ? '' : 's'})`;

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

  brandButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      brandButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      filters.brand = btn.dataset.brandFilter as ProductBrand;
      applyFilters();
    });
  });

  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach((b) => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
      filters.category = btn.dataset.categoryTab as ProductCategory;
      applyFilters();
    });
  });

  // Género: selección MÚLTIPLE e independiente (toggle, no exclusivo entre botones)
  genderButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.genderFilter as GenderFilterValue;
      const isActive = btn.getAttribute('aria-pressed') === 'true';

      if (isActive) {
        filters.genders.delete(value);
        btn.setAttribute('aria-pressed', 'false');
      } else {
        filters.genders.add(value);
        btn.setAttribute('aria-pressed', 'true');
      }
      applyFilters();
    });
  });

  searchInput.addEventListener('input', () => {
    filters.search = searchInput.value;
    applyFilters();
  });
}
import { getAllProducts, deleteProduct } from './services/adminApi';
import { renderAdminProductRow } from './templates/adminProductRow';
import type { Product, ProductCategory, ProductBrand } from '../catalog/types';

type AvailabilityFilter = 'Todos' | 'Disponibles' | 'Ocultos';

interface Filters {
  search: string;
  category: ProductCategory | 'Todas';
  brand: ProductBrand | 'Todas';
  availability: AvailabilityFilter;
}

export async function initAdminList() {
  const list = document.getElementById('admin-product-list')!;
  const spinner = document.getElementById('admin-list-spinner')!;
  const empty = document.getElementById('admin-list-empty')!;
  const searchInput = document.getElementById('admin-search') as HTMLInputElement;
  const categorySelect = document.getElementById('admin-category-filter') as HTMLSelectElement;
  const brandSelect = document.getElementById('admin-brand-filter') as HTMLSelectElement;
  const availabilitySelect = document.getElementById('admin-availability-filter') as HTMLSelectElement;

  let allProducts: Product[] = [];

  const filters: Filters = {
    search: '',
    category: 'Todas',
    brand: 'Todas',
    availability: 'Todos',
  };

  function applyFilters() {
    const term = filters.search.trim().toLowerCase();

    const filtered = allProducts.filter((p) => {
      if (filters.category !== 'Todas' && p.category !== filters.category) return false;
      if (filters.category === 'Perfumes' && filters.brand !== 'Todas' && p.brand !== filters.brand) return false;
      if (filters.availability === 'Disponibles' && !p.is_available) return false;
      if (filters.availability === 'Ocultos' && p.is_available) return false;
      if (term !== '' && !p.name.toLowerCase().includes(term)) return false;
      return true;
    });

    if (filtered.length === 0) {
      list.innerHTML = '';
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      list.innerHTML = filtered.map(renderAdminProductRow).join('');
    }
  }

  try {
    allProducts = await getAllProducts();
    spinner.classList.add('hidden');
    applyFilters();
  } catch (err) {
    spinner.classList.add('hidden');
    empty.textContent = 'No se pudo cargar el listado.';
    empty.classList.remove('hidden');
    console.error(err);
    return;
  }

  searchInput.addEventListener('input', () => {
    filters.search = searchInput.value;
    applyFilters();
  });

  // El filtro de marca solo tiene sentido dentro de "Perfumes" (Yanbal/Natura/Ésika/Avon).
  // Se muestra/oculta según la categoría elegida.
  categorySelect.addEventListener('change', () => {
    filters.category = categorySelect.value as ProductCategory | 'Todas';

    const showBrandFilter = filters.category === 'Perfumes';
    brandSelect.classList.toggle('hidden', !showBrandFilter);
    if (!showBrandFilter) {
      filters.brand = 'Todas';
      brandSelect.value = 'Todas';
    }

    applyFilters();
  });

  brandSelect.addEventListener('change', () => {
    filters.brand = brandSelect.value as ProductBrand | 'Todas';
    applyFilters();
  });

  availabilitySelect.addEventListener('change', () => {
    filters.availability = availabilitySelect.value as AvailabilityFilter;
    applyFilters();
  });

  list.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    const deleteId = target.dataset.deleteId;
    if (!deleteId) return;

    const confirmed = window.confirm('¿Eliminar este producto? Esta acción no se puede deshacer.');
    if (!confirmed) return;

    try {
      await deleteProduct(deleteId);
      allProducts = allProducts.filter((p) => p.id !== deleteId);
      applyFilters();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'No se pudo eliminar el producto.');
    }
  });
}
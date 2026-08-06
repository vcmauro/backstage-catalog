export type ProductBrand = 'Yanbal' | 'Natura' | 'Ésika' | 'Avon';
export type ProductCategory = 'Perfumes' | 'Otros';

// Género tal como se guarda en la base de datos.
// null = sin género definido / unisex.
export type ProductGender = 'Damas' | 'Caballeros' | 'Niños' | null;

// Género tal como se filtra en el catálogo (UI).
// 'Unisex' es un valor solo de interfaz: representa gender === null en la base de datos.
// 'Niños' se muestra en pantalla como "Infantes", pero el valor guardado en BD sigue siendo 'Niños'.
export type GenderFilterValue = 'Damas' | 'Caballeros' | 'Niños' | 'Unisex';

export interface Product {
  id: string;
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  gender: ProductGender;
  description: string | null;
  price: number | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  Perfumes: 'Perfumería',
  Otros: 'Cosméticos',
};

export const BRANDS: ProductBrand[] = ['Yanbal', 'Ésika', 'Avon', 'Natura'];

export const GENDER_FILTERS: GenderFilterValue[] = ['Damas', 'Caballeros', 'Niños', 'Unisex'];

export const GENDER_LABELS: Record<GenderFilterValue, string> = {
  Damas: 'Damas',
  Caballeros: 'Caballeros',
  Niños: 'Infantes',
  Unisex: 'Unisex',
};
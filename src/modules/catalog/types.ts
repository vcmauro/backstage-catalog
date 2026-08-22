export type ProductBrand = 'Yanbal' | 'Natura' | 'Ésika' | 'Avon';

export type ProductCategory =
  | 'Perfumes'
  | 'Otros'
  | 'Cosmeticos'
  | 'Peluches'
  | 'RegaloBebes'
  | 'Juguetes';

// Género tal como se guarda en la base de datos.
// null = sin género definido. Ya no tiene botón de filtro propio (se retiró "Unisex").
export type ProductGender = 'Damas' | 'Caballeros' | 'Niños' | null;

export type GenderFilterValue = 'Damas' | 'Caballeros' | 'Niños';

export interface Product {
  id: string;
  name: string;
  brand: ProductBrand | null;
  category: ProductCategory;
  gender: ProductGender;
  description: string | null;
  price: number | null;
  list_price: number | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
}

// Etiquetas visibles del catálogo público de Perfumería (subcategorías dentro de /perfumes).
// El resto de categorías (Peluches, RegaloBebes, Juguetes) se etiquetan cuando armemos esas secciones.
export const CATEGORY_LABELS: Record<'Perfumes' | 'Otros', string> = {
  Perfumes: 'Perfumería',
  Otros: 'Cosméticos',
};

export const BRANDS: ProductBrand[] = ['Yanbal', 'Ésika', 'Avon', 'Natura'];

export const GENDER_FILTERS: GenderFilterValue[] = ['Damas', 'Caballeros', 'Niños'];

export const GENDER_LABELS: Record<GenderFilterValue, string> = {
  Damas: 'Damas',
  Caballeros: 'Caballeros',
  Niños: 'Niños',
};
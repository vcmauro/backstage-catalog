export type ProductBrand = 'Yanbal' | 'Natura' | 'Ésika' | 'Avon';

// 'Otros' se deja en la base de datos por si acaso, pero ya no se usa en ningún lado del frontend.
export type ProductCategory =
  | 'Perfumes'
  | 'Otros'
  | 'Cosmeticos'
  | 'Peluches'
  | 'RegaloBebes'
  | 'Juguetes';

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

// Pestañas dentro de /perfumes: Perfumes y Cosméticos.
export const CATEGORY_LABELS: Record<'Perfumes' | 'Cosmeticos', string> = {
  Perfumes: 'Perfumería',
  Cosmeticos: 'Cosméticos',
};

export const BRANDS: ProductBrand[] = ['Yanbal', 'Ésika', 'Avon', 'Natura'];

export const GENDER_FILTERS: GenderFilterValue[] = ['Damas', 'Caballeros', 'Niños'];

export const GENDER_LABELS: Record<GenderFilterValue, string> = {
  Damas: 'Damas',
  Caballeros: 'Caballeros',
  Niños: 'Niños',
};
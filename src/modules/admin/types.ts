import type { ProductBrand, ProductCategory, ProductGender } from '../catalog/types';

// Forma de los datos que vienen del formulario. No incluye id/created_at:
// esos los maneja la base de datos.
export interface ProductInput {
  name: string;
  brand: ProductBrand | null;
  category: ProductCategory;
  gender: ProductGender;
  description: string | null;
  price: number | null;
  list_price: number | null;
  image_url: string | null;
  is_available: boolean;
}

export const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: 'Perfumes', label: 'Perfumería - Perfumes' },
  { value: 'Otros', label: 'Perfumería - Otros' },
  { value: 'Cosmeticos', label: 'Cosméticos' },
  { value: 'Peluches', label: 'Peluches' },
  { value: 'RegaloBebes', label: 'Regalo Bebés' },
  { value: 'Juguetes', label: 'Juguetes' },
];

export const GENDER_OPTIONS: { value: NonNullable<ProductGender>; label: string }[] = [
  { value: 'Damas', label: 'Damas' },
  { value: 'Caballeros', label: 'Caballeros' },
  { value: 'Niños', label: 'Niños' },
];
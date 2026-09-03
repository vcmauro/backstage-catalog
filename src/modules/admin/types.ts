import type { ProductBrand, ProductCategory, ProductGender } from '../catalog/types';

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
  { value: 'Perfumes', label: 'Perfumes' },
  { value: 'Cosmeticos', label: 'Cosméticos' },
  { value: 'Peluches', label: 'Peluches' },
  { value: 'RegaloBebes', label: 'Regalo Bebés' },
  { value: 'Juguetes', label: 'Juguetes' },
  { value: 'CarterasMochilas', label: 'Carteras y Mochilas' },
  { value: 'BijouterieJoyas', label: 'Bijouterie y Joyas' },
  { value: 'Tecnologia', label: 'Tecnología' },
];

export const GENDER_OPTIONS: { value: NonNullable<ProductGender>; label: string }[] = [
  { value: 'Damas', label: 'Damas' },
  { value: 'Caballeros', label: 'Caballeros' },
  { value: 'Niños', label: 'Niños' },
];
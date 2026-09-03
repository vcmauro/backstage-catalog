export type ProductBrand = 'Yanbal' | 'Natura' | 'Ésika' | 'Avon' | 'Cyzone' | 'LBEL';

export type ProductCategory =
  | 'Perfumes'
  | 'Cosmeticos'
  | 'Peluches'
  | 'RegaloBebes'
  | 'Juguetes'
  | 'CarterasMochilas'
  | 'BijouterieJoyas'
  | 'Tecnologia';

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

// Etiquetas legibles de TODAS las categorías (header, mensaje de WhatsApp, etc.)
export const CATEGORY_DISPLAY_LABELS: Record<ProductCategory, string> = {
  Perfumes: 'Perfumería',
  Cosmeticos: 'Cosméticos',
  Peluches: 'Peluches',
  RegaloBebes: 'Regalo Bebés',
  Juguetes: 'Juguetes',
  CarterasMochilas: 'Carteras y Mochilas',
  BijouterieJoyas: 'Bijouterie y Joyas',
  Tecnologia: 'Tecnología',
};

export const BRANDS: ProductBrand[] = ['Yanbal', 'Ésika', 'Avon', 'Natura', 'Cyzone', 'LBEL'];

export const GENDER_FILTERS: GenderFilterValue[] = ['Damas', 'Caballeros', 'Niños'];

export const GENDER_LABELS: Record<GenderFilterValue, string> = {
  Damas: 'Damas',
  Caballeros: 'Caballeros',
  Niños: 'Niños',
};
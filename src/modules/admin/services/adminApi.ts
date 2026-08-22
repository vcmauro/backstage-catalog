import { supabase } from '../../../core/network/supabaseClient';
import type { Product } from '../../catalog/types';
import type { ProductInput } from '../types';

// A diferencia de catalogApi.getAvailableProducts(), esto trae TODO
// (disponibles y no disponibles) porque la dueña necesita verlos todos
// para poder editarlos o reactivarlos.
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Error al obtener productos: ${error.message}`);
  return data ?? [];
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(`Error al crear producto: ${error.message}`);
  return data;
}

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Error al actualizar producto: ${error.message}`);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Error al eliminar producto: ${error.message}`);
}
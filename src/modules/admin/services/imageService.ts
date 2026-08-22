import { supabase } from '../../../core/network/supabaseClient';

const MAX_DIMENSION = 1200; // px, lado más largo de la imagen
const WEBP_QUALITY = 0.8;

// Redimensiona (si hace falta) y convierte a .webp usando el Canvas nativo del navegador.
// No usa ninguna librería externa.
async function compressToWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  let { width, height } = bitmap;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo procesar la imagen en este navegador.');
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('No se pudo convertir la imagen a webp.'))),
      'image/webp',
      WEBP_QUALITY
    );
  });
}

// Función principal que usará el formulario (paso 4):
// recibe el archivo elegido por la dueña, lo comprime/convierte, lo sube,
// y devuelve la URL pública lista para guardar en products.image_url.
export async function compressAndUploadImage(file: File): Promise<string> {
  const webpBlob = await compressToWebp(file);
  const fileName = `${crypto.randomUUID()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, webpBlob, {
      contentType: 'image/webp',
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw new Error(`Error al subir la imagen: ${uploadError.message}`);

  const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
  return data.publicUrl;
}

// Para cuando se elimina un producto o se reemplaza su foto (se usará en el paso 4/5).
export async function deleteProductImage(imageUrl: string): Promise<void> {
  const fileName = imageUrl.split('/').pop();
  if (!fileName) return;
  await supabase.storage.from('product-images').remove([fileName]);
}
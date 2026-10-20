const maxInputBytes = 12 * 1024 * 1024;
const maxOutputBytes = 450 * 1024;
const maxImageEdge = 1600;
const qualities = [0.82, 0.75, 0.68, 0.61, 0.55, 0.5];

export async function compressProjectPhoto(file: File, index: number): Promise<File> {
  if (file.size > maxInputBytes) {
    throw new Error('Each photo must be 12 MB or smaller before compression.');
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error('One photo could not be opened. Choose JPG, PNG or WEBP, or convert HEIC to JPG.');
  }

  try {
    const originalScale = Math.min(1, maxImageEdge / Math.max(bitmap.width, bitmap.height));
    let scale = originalScale;

    for (const quality of qualities) {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Photo compression is unavailable in this browser.');

      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) resolve(result);
          else reject(new Error('Photo compression failed.'));
        }, 'image/jpeg', quality);
      });
      canvas.width = 0;
      canvas.height = 0;

      if (blob.size <= maxOutputBytes) {
        return new File([blob], `estimate-photo-${Date.now()}-${index + 1}.jpg`, {
          type: 'image/jpeg',
          lastModified: file.lastModified,
        });
      }
      scale *= 0.82;
    }

    throw new Error('One photo could not be reduced enough. Choose a smaller image.');
  } finally {
    bitmap.close();
  }
}

export const ACCEPTED_IMAGES_TYPES = ["jpeg", "png", "jpg"];

type ImageFile = { file: string, thumb: string };

export const handleImageFileInput = async (files: File[] | FileList | null, w?: number, h?: number): Promise<ImageFile[]> => {

  let rawFiles: File[] = []

  if (files instanceof FileList) {
    rawFiles = Array.from(files);
  } else {
    rawFiles = files || [];
  }

  if (!rawFiles || rawFiles.length < 1) return [];

  const filteredFiles = Array.from(rawFiles).filter(file => checkFileType(file));

  if (filteredFiles.length < 1) return [];

  const datas = await Promise.all(filteredFiles.map((file) => {
    return fileToImageBase64(file, w, h);
  }))

  return datas;
}

export const handleFiles = () => {

}

export const checkFileType = (file: File) => {
  const splitFileName = file.name.split('.');
  return ACCEPTED_IMAGES_TYPES.includes(splitFileName[splitFileName.length - 1]);
}


export const fileToImageBase64 = (file: File, maxWidth?: number, maxHeight?: number): Promise<{ file: string, thumb: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject('Could not get context');
        return;
      }

      // Originalgröße erhalten
      let newWidth = img.width;
      let newHeight = img.height;

      // Größere Kante skalieren
      if (maxWidth && newWidth > maxWidth) {
        newHeight = (maxWidth / newWidth) * newHeight;
        newWidth = maxWidth;
      }
      if (maxHeight && newHeight > maxHeight) {
        newWidth = (maxHeight / newHeight) * newWidth;
        newHeight = maxHeight;
      }

      // Erstes Canvas für das komprimierte Originalbild
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const base64Image = canvas.toDataURL("image/jpeg", 0.7).slice(23); // 🔥 80% Qualität für Hauptbild

      // Zweites Canvas für das komprimierte Thumbnail
      const thumbCanvas = document.createElement("canvas");
      const thumbCtx = thumbCanvas.getContext("2d");
      if (!thumbCtx) {
        reject("Could not get thumbnail context");
        return;
      }

      // Thumbnail mit max. 150px an der längeren Kante
      let thumbWidth = newWidth;
      let thumbHeight = newHeight;
      if (thumbWidth > thumbHeight) {
        thumbHeight = (150 / thumbWidth) * thumbHeight;
        thumbWidth = 150;
      } else {
        thumbWidth = (150 / thumbHeight) * thumbWidth;
        thumbHeight = 150;
      }

      thumbCanvas.width = thumbWidth;
      thumbCanvas.height = thumbHeight;
      thumbCtx.drawImage(img, 0, 0, thumbWidth, thumbHeight);
      const imageThumbnail = thumbCanvas.toDataURL("image/jpeg", 0.4).slice(23); // 🔥 60% Qualität für Thumbnail

      URL.revokeObjectURL(img.src);
      resolve({ file: base64Image, thumb: imageThumbnail });
    };
    img.onerror = () => reject("Error loading image");
  });
};
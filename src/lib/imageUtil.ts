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


export const fileToImageBase64 = (file: File, w?: number, h?: number): Promise<{ file: string, thumb: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, w ?? img.width, h ?? img.height);
        const base64Image = canvas.toDataURL("image/jpeg").slice(23);
        canvas.width = 150;
        canvas.height = 150
        ctx.drawImage(img, 0, 0, 150, 150);
        const imageThumbnail = canvas.toDataURL("image/jpeg").slice(23);
        URL.revokeObjectURL(img.src);
        canvas.remove();
        resolve({ file: base64Image, thumb: imageThumbnail });
      } else {
        reject('Could not get context');
      }
    };
  });
}
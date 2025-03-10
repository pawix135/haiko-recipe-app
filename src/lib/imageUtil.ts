const ACCEPTED_FILE_TYPES = ["jpeg", "png", "jpg"];

type ImageFile = { file: string, thumb: string };

export const handleImageFileInput = async (e: React.ChangeEvent<HTMLInputElement>): Promise<ImageFile[]> => {

  const rawFiles = e.target.files;

  if (!rawFiles || rawFiles.length < 1) return [];

  const filteredFiles = Array.from(rawFiles).filter(file => checkFileType(file));

  if (filteredFiles.length < 1) return [];

  const datas = await Promise.all(filteredFiles.map((file) => {
    return fileToImageBase64(file);
  }))

  return datas;
}

export const checkFileType = (file: File) => {
  const splitFileName = file.name.split('.');
  return ACCEPTED_FILE_TYPES.includes(splitFileName[splitFileName.length - 1]);
}


export const fileToImageBase64 = (file: File): Promise<{ file: string, thumb: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height);
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
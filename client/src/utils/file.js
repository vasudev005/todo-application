export const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      name: file.name,
      url: reader.result,
      type: file.type,
      size: file.size
    });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

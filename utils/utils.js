const uploadData = async (data) => {
  return fetch('/api/upload/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];

      return resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });

export { uploadData, convertToBase64 };

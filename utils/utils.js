const uploadData = async (data) => {
  console.log("Upload Started");
  return fetch("/api/upload/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("Upload Ended");
      return res;
    })
    .catch((err) => {
      console.log("Upload Error", err);
      return err;
    });
};

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("Converted Base64");
      // If you want to strip the data: URL prefix, you can do it here
      const base64String = reader.result.split(",")[1];

      return resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });

// const convertToBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsBinaryString(file);
//     reader.onload = () => {
//       console.log("Converted Base64");
//       return resolve(btoa(reader.result));
//     };
//     reader.onerror = (error) => reject(error);
//   });

async function action(e) {
  // Create a new FormData instance
  console.log("e.target", e);
  let formData = new FormData(e.target);

  // Log the form data
  for (let [name, value] of formData) {
    console.log(`${name} = ${value}`);
  }
}

export { uploadData, convertToBase64, action };

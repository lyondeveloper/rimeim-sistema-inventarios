const getFilesFromInput = (input, callback) => {
  const { files } = input.target;
  const new_images = [];

  for (var i = 0; i < files.length; i++) {
    const file = files[i];
    var reader = new FileReader();
    reader.onload = result => {
      new_images.push({
        name: file.name,
        url: result.target.result,
        file
      });

      if (i === files.length) {
        callback(new_images);
      }
    };
    reader.readAsDataURL(file);
  }
};

export default getFilesFromInput;

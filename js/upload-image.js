const fileAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
fileAvatar.addEventListener('change', () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});


const filePhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewHouse = document.querySelector('.ad-form__photo');
filePhoto.addEventListener('change', () => {
  const file = filePhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewHouse.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});

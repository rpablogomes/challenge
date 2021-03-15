function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].setAttribute("value", "");
  ingredients.appendChild(newField);
}
if(document.querySelector(".add-ingredient")){
document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);
}

function addStep() {
  const steps = document.querySelector("#steps");
  const fieldContainer = document.querySelectorAll(".step");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  steps.appendChild(newField);
}

if(document.querySelector(".add-step")){
  document.querySelector(".add-step").addEventListener("click", addStep)
}

function deleteOrNo() {

  const formDelete = document.querySelector("#form-delete");

  formDelete.addEventListener("submit", function (event) {
      alert("Chefs com com receitas cadastradas não podem ser excluídos.")
      event.preventDefault();
    });
}

if(document.querySelector("#deleteConfirmation")) {
const confirmDelete = document.querySelector("#deleteConfirmation").value

if (confirmDelete == "false") {
  deleteOrNo();
}
}

const PhotosUpload = {
  input : "",
  preview : document.querySelector("#photos-preview"),
  uploadLimit: 5,
  files: [],


  handleFileInput(event) {

      const { files: fileList } = event.target;
      PhotosUpload.input = event.target

      if(PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file)

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = PhotosUpload.getContainer(image)
        PhotosUpload.preview.appendChild(div)
      }
      reader.readAsDataURL(file)
    })
    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },
  hasLimit(event){
    const { uploadLimit, input, preview } = PhotosUpload
    const { files:filesList } = input

    if(filesList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault();
      return true 
    } 

    const photosDiv = []
    preview.childNodes.forEach(item => {
      if(item.classList && item.classList.value == "photo")
        photosDiv.push(item)
    })

    const totalPhotos = filesList.length + photosDiv.length
    if(totalPhotos > uploadLimit){
      alert("Você atingiu o número máximo de fotos!")
       event.preventDefault()
       return true
    }

    return false 
  },
  getAllFiles(){
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  getContainer(image){
    const div = document.createElement("div")
    div.classList.add("photo")

    div.onclick =  PhotosUpload.removePhoto

    div.appendChild(image)

    div.appendChild(PhotosUpload.getRemoveButton())

    return div

  },
  getRemoveButton(){
    const button = document.createElement("i")
    button.classList.add("material-icons")
    button.innerHTML = "close" 
    return button
  },
  removePhoto(event){
    const photoDiv =  event.target.parentNode
    const photoArray = Array.from(PhotosUpload.preview.children)
    const index = photoArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoDiv.remove()
  },
  removeOldPhoto(event){
     const photoDiv = event.target.parentNode

     if(photoDiv.id){
       const removedFiles = document.querySelector('input[name="removed_files"')
      if(removedFiles){
        removedFiles.value += `${photoDiv.id},`
      }
     }

     photoDiv.remove( )
  }
};

const ImageGallery = {
  highlight: document.querySelector(".gallery .highlight > img"),
  previews: document.querySelectorAll('.gallery-preview img'),
  setImage(e) {
    const { target } = e

    ImageGallery.previews.forEach(preview => preview.classList.remove('active'))

    target.classList.add('active')

    ImageGallery.highlight.src = target.src
    Lightbox.image.src = target.src 
  }
}
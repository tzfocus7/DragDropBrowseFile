const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("header");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");

let file;

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload file";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload file";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];//getting selected files and choosing only one out of multiple selections
    showFile();
});

function showFile(){
    let fileType = file.type; //from the console
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtensions.includes(fileType)){
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let imgTag = `<img src="${fileReader.result}" alt="">`; //creating an image tag and passing user selected file source into src attribute
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an image file");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload file";
    }
}

button.addEventListener("click", () => {
    input.click();
});

input.addEventListener("change", function(){
   file = this.files[0];
   showFile();
   dropArea.classList.add("active");
})
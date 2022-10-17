import { createPost, uploadImage } from '../fetch-utils.js';

const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
// const imageInput = document.getElementById('image-input');
// const preview = document.getElementById('preview');
const addBtn = document.querySelectorAll('button');

// State
let error = null;
let post = null;

// Events
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    addBtn.disabled = true;
    const imageFile = formData.get('image');
    if (imageFile.size > 10000000) {
        alert('file is too big, must be < 10KB');
        return;
    }
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `images/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('project-images', imagePath, imageFile);

    post = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        image_url: url,
    };

    const response = await createPost(post);
    error = response.error;
    console.log(response);

    displayError();
});

// Display Functions
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

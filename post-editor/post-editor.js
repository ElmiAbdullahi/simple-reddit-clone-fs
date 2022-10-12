import { createPost } from '../fetch-utils.js';

const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const addBtn = document.getElementById('button');

// State
let error = null;

// Events
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addBtn.disabled = true;

    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    if (imageFile.size > 10000000) {
        alert('file is too big, must be < 10KB');
        return;
    }
});
// Display Functions
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

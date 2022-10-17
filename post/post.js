/* Imports */
import '../auth/user.js';

import { getPosts } from '../fetch-utils.js';

// import { renderPost } from '../render-utils.js';

const errorDisplay = document.getElementById('error-display');
const postName = document.getElementById('post-name');
const postImage = document.getElementById('post-image');
const postDescription = document.getElementById('post-description');
// const commentList = document.getElementById('comment-list');
// const addCommentForm = document.getElementById('add-comment-form');

/* State */
let error = null;
let post = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    //   - get the id from the search params
    const id = searchParams.get('id');
    //   - if no id, redirect to list (home) page
    if (!id) {
        // location.replace('/');
        return;
    }
    //  - otherwise, get the post by id and store the error and post data
    const response = await getPosts(id);
    //  - if error, display it
    error = response.error;
    post = response.data;
    //  - of no post, redirect to list (home) page
    if (error) {
        displayError();
    } else {
        displayPosts();
        // displayComments();
    }
    if (!post) {
        location.replace('/');
        //  - otherwise, display pet
    } else {
        displayPosts();
        // also call display comments in addition to display post
        // displayComments();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayPosts() {
    // display the post info
    postName.textContent = post.title;
    postDescription.textContent = post.description;
    postImage.textContent = post.image_url;
    postImage.alt = `${post.title} image`;
}

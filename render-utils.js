export function renderPost(post) {
    const li = document.createElement('li');

    // const a = document.createElement('a');
    // a.href = `/post/?id=${post.id}`;

    const img = document.createElement('img');
    img.src = post.image_url;

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const span = document.createElement('span');
    span.textContent = getCategoryEmoji(post.category);
    h2.append(span);

    const p = document.createElement('p');
    p.textContent = post.description;

    // a.append(img, h2, p);
    li.append(img, h2, p);

    return li;
}

function getCategoryEmoji(category) {
    if (category === 'cars') return '🚘';
    if (category === 'food') return '🍔';
    if (category === 'music') return '🎸';
    if (category === 'clothes') return '👔';
    return '❓';
}

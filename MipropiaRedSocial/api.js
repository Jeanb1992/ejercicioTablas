const feed = document.getElementById('feed');


const fetchData = async (endpoint) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
  return response.json();
};



const renderFeed = async () => {
 
  const [posts, users, photos] = await Promise.all([
    fetchData('posts'),
    fetchData('users'),
    fetchData('photos')
  ]);

  
  posts.slice(0, 10).forEach(post => {
    
    const user = users.find(u => u.id === post.userId);
    
    const photo = photos.find(p => p.id === post.id);

    
    const postDiv = document.createElement('div');
    postDiv.style.border = '1px solid #ccc';
    postDiv.style.margin = '10px';
    postDiv.style.padding = '10px';

    postDiv.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p>Autor: ${user ? user.name : 'Desconocido'}</p>
      ${photo ? `<img src="${photo.thumbnailUrl}" alt="Imagen del post">` : ''}
    `;

    feed.appendChild(postDiv);
  });
};

renderFeed();
const feed = document.getElementById('feed');


const fetchData = async (endpoint) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
  return response.json();
};



const renderFeed = async () => {
 
  const [posts, users] = await Promise.all([
    fetchData('posts'),
    fetchData('users')
  ]);

  const picsumResponse = await fetch('https://picsum.photos/v2/list?page=1&limit=10');
  const picsumPhotos = await picsumResponse.json();

  posts.slice(0, 10).forEach((post, index) => {
    const user = users.find(u => u.id === post.userId);
    const imageUrl = picsumPhotos[index] ? picsumPhotos[index].download_url : `https://picsum.photos/600/300?random=${index}`;

    const postDiv = document.createElement('div');
    

    postDiv.innerHTML = `
      <h2 id="title">${post.title}</h2>
      <p id="div">${post.body}</p>
      <p id="autor" >Autor: ${user ? user.name : 'Desconocido'}</p>
      <img src="${imageUrl}" alt="Imagen del post" style="max-width:100%;height:auto;">
    `;

    feed.appendChild(postDiv);
  });
};

renderFeed();
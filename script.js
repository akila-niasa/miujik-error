const elementById = (id) => {
 return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data.artists));
    keyword.value=''
    elementById("artists").innerHTML=''
    elementById("albums").innerHTML=''
};

const showArtists = (artists) => {
  const artistContainer = elementById("artists");
 
  artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb?artist.strArtistThumb:'https://t3.ftcdn.net/jpg/01/19/16/02/360_F_119160252_KdN6K7w7VEwn4fJhlOeWhyNIost9if4s.jpg'}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist?artist.strArtist:'not found'}</h1>
    <p>Country: ${artist.strCountry?artist.strCountry:'not found'}</p>
    <p>Style: ${artist.strGenre?artist.strGenre:'not found'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
  artistContainer.appendChild(div);
  })
 
};

const fetchAlbums = (id) => {
 
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
    elementById("albums").innerHTML=''
  // const artistContainer = elementById("artists");
  // artistContainer.innerHTML = "";
};

const showAlbum = ({album}) => {
 
  const albumContainer = elementById("albums");
  album.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${album.strAlbumThumb?album.strAlbumThumb:'https://t3.ftcdn.net/jpg/01/19/16/02/360_F_119160252_KdN6K7w7VEwn4fJhlOeWhyNIost9if4s.jpg'}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};

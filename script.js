
async function renderUsers() {
  let users = await getUsers();
  let html = '';
  users.results.forEach(user => {
    let htmlSegment = `<div class="user">
                      <h2>Name: ${user.name}</h2>
                      <div><button onclick="renderUserDetail('${user.url}')">More about ${user.name}..</button></div>
                        </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector('.container');
  container.innerHTML = html;
}
renderUsers();
async function getUsers() {
  let url = 'https://swapi.dev/api/people';
  let fallbackurl = 'https://www.swapi.tech/api/people';
  try {
    let res = await fetch(url);
    if (res.status >= 400)
      res = await fetch(fallbackurl);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderUserDetail(url) {
  let details = await getAPIDetail(url);
  let html = '';
  let filmsegment = '';
  if (details.films)
    details.films.forEach((element, index) => {
      filmsegment += `<div class="filmdetail"><button onclick="renderFilmDetail('${element}')">More about film ${index+1}..</button></div>`;

    });
  let htmlSegment = `<div class="user">
                      <h2>Name: ${details.name} </h2>
                      <div>Gender: ${details.gender}, BirthYear: ${details.birth_year}, HairColor: ${details.hair_color} </div>
                      <div>Total Films : <button>${details.films ? details.films.length : 0}</button></div>
                      <div>${filmsegment}</div>
                      </div>`;

  html += htmlSegment;
  let container = document.querySelector('.container');
  container.innerHTML = html;
}
async function getAPIDetail(url) {
  let fallbackurl = url.replace(".dev", ".tech");
  try {
    let res = await fetch(url);
    if (res.status >= 400)
      res = await fetch(fallbackurl);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderFilmDetail(url) {
  let details = await getAPIDetail(url);
  let html = '';
  let charactersegment = '';
  if (details.characters)
    details.characters.forEach((element, index) => {
      charactersegment += `<div class="characterdetail"><button onclick="renderUserDetail('${element}')">More about character ${index+1}..</button></div>`;

    });
  let htmlSegment = `<div class="user">
                      <h2>Film Title: ${details.title} </h2>
                      <div>Director: ${details.director}, Release Date: ${details.release_date}  </div>
                       <div>Total characters : <button>${details.characters ? details.characters.length : 0}</button></div>
                      <div>${charactersegment}</div>
                      </div>`;

  html += htmlSegment;
  let container = document.querySelector('.container');
  container.innerHTML = html;
}

const form = document.querySelector('#github-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(e){
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
    .then(resp => resp.json())
    .then(data => {
        const usersArray = data.items
        buildUserCard(usersArray)
    })
    .catch(error => console.error(error))
};

function buildUserCard(array){
    array.forEach(user => {
        const div = document.createElement('div')
        div.className = 'users'
        div.innerHTML = `
        <h2> ${user.login} </h2>
        <img src=${user.avatar_url}/>
        <a href=${user.url}>${user.url}</a>
        `;
        div.style.width = '500px';
        document.querySelector('#user-list').appendChild(div);
    
    div.addEventListener('click', () => {
    const userRepos = `https://api.github.com/users/${user.login}/repos`
    
    fetch(userRepos)
    .then(resp => resp.json())
    .then(data => {
    const repos = data.map(repo => ({
        name: repo.name,
        description: repo.description,
        repoUrl: repo.html_url,
    }))
    const repoContainer = document.querySelector('#repos-list')
    repoContainer.innerHTML = `
        <h3>Repositories for ${user.login}</h3>
        <ul>
            ${repos.map(repo => `<li><a href="${repo.html_url}">${repo.name}</a>: ${repo.description}</li>`).join('')}
        </ul>
    `;
    div.appendChild(repoContainer)
    
    })
    })}
    )}


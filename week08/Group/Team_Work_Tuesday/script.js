function getData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let people = data.results;
        for (let i = 0; i < people.length; i++) {
            document.getElementById('people').innerHTML += `
            <div class="card">
                <a href="">${people[i].name}</a>
            </div>
            `;
        }

        return data;
    })
}

function getHome() {
    //var url = 'https://swapi.co/api/people/';
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20'
    //https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20
    getData(url);
}


document.getElementById('next').addEventListener('click', function() {
    getData(url);
})

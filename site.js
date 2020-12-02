// id="barraFilme"
window.onload = function () {
    let key = 'd4ea14f49db327b3575be1f882f06b8b';
    function requisicao() {
        let text = document.getElementById('pesquisa').value;
        if (!text) {
            showSearch(false);
            return;
        }
        showSearch(true);
        let xml = new XMLHttpRequest();
        xml.onload = criaCard;
        xml.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=pt-BR&page=1&query=${text}&include_adult=false`)
        xml.send();
    }

    function verifyEnter(e) {
        if (e.which == 13) {
            requisicao();
        }
    }

    function criaCard() {
        let cards = document.getElementById('barraFilme');
        let aux = '';
        let dados = JSON.parse(this.responseText);
        dados.results.filter((element) => {
            return element.overview.length > 0;
        }).forEach((element, index) => {
            if (index < 4) {
                aux += `<div class="card" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.overview}</p>
                <a href="#" class="btn btn-primary">Abrir Filme</a>
                </div>
                </div >`
            }
        });
        cards.innerHTML = aux;
    }

    document.getElementById('pesquisa').addEventListener('keypress', verifyEnter);
}
function showSearch(show = false) {
    let element = document.getElementById('barraFilme');
    let botao = document.getElementById('fechar');
    let text = document.getElementById('pesquisa');
    if (show === true) {
        element.style.display = 'grid';
        botao.style.display = 'grid';
    } else {
        element.style.display = 'none';
        botao.style.display = 'none';
        text.value = "";
    }
}
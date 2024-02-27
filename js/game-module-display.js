
const gamePage = document.querySelector(".games__card .row")
const showDetalis = document.querySelector('.details__content')
const gamesSections = document.querySelector(".games")
const detailsSection = document.querySelector('.details')
const closeIcon = document.querySelector('.fa-xmark')

export class DisplayGames {
    constructor(category) {
        this.category = category
    }
    async display() {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f933d125bdmsh8ba28456d8d82a2p1bbf89jsn473451910cbb',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        $('.loadingScreen').css('display', 'flex');

        const response = await fetch(url, options);
        const gameApi = await response.json();
        let cartona = ''
        for (let i = 0; i < gameApi.length; i++) {
            cartona += `<div class="card__game col-xl-3 col-lg-4 col-md-6" data-id="${gameApi[i].id}">
            <div class="inner">
                <div class="card">
                    <img src="${gameApi[i].thumbnail}" class="card-img-top" alt="photo">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title">${gameApi[i].title}</h5>
                            <span class="badge__free badge p-2">Free</span>
                        </div>
                        <p class="card-text">${gameApi[i].short_description.split(" ").splice(0,8)}.</p>
                    </div>
                    <div class="card-footer">
                        <span>${gameApi[i].genre}</span>
                        <span>${gameApi[i].platform}</span>
                    </div>
                </div>
            </div>
        </div>`
        }
        console.log();
        $('.loadingScreen').css('display', 'none');
            gamePage.innerHTML = cartona
        const cardGame = document.querySelectorAll('.card__game')
        for (const cards of cardGame) {
            cards.addEventListener('click', function () {
                let cardId = this.getAttribute('data-id');

                (async function (){
                    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${cardId}`;
                    const options = {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': 'f933d125bdmsh8ba28456d8d82a2p1bbf89jsn473451910cbb',
                            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                        }
                    };
                    $('.loadingScreen').css('display', 'flex');
                    const response = await fetch(url, options);
                    const details = await response.json();
                    


                    showDetalis.innerHTML = `<div class="col-lg-4">
                    <img src="${details.thumbnail}" alt="">
                </div>
                <div class="col-lg-8">
                    <h3 class="mb-3">Title: ${details.title}</h3>
                    <div class="mb-3 gap-2 d-flex align-items-center">
                        <p>Category:</p>
                        <span>${details.genre}</span>
                    </div>
                    <div class=" mb-3 gap-2 d-flex align-items-center">
                        <p>Platform:</p>
                        <span>${details.platform}</span>
                    </div>
                    <div class="mb-3 gap-2 d-flex align-items-center">
                        <p>Status:</p>
                        <span>${details.status}</span>
                    </div>
                    <p class="mb-3">${details.description}</p>
                    <a href=${details.game_url} target="_blank" class="btn btn-outline-warning">Show Game</a>
                </div>`
                })()

                // ******** D-none ***** 
                $('.loadingScreen').fadeOut(500)
                detailsSection.classList.remove('d-none')
                gamesSections.classList.add("d-none")                
            })
        }
    }
    
}


(function closeDetails() {
    closeIcon.addEventListener('click', function () {
        detailsSection.classList.add('d-none')
        gamesSections.classList.remove("d-none")
        
    })
})()




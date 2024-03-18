const accessKey = 'KIFJow7qbNoe-AkxlJEvCpyN_Fk1j59jxpd96PLD0hU';

const search = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const resultsSearch = document.querySelector('.results')
let getData = '';
let page = 1;

// Search for images by request in the input
async function searchImages(getData){
    getData = searchInput.value;
    if(!getData)getData = 'random';
    const url = `https://api.unsplash.com/search/photos?query=${getData}&page=${page}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
        if(page === 1) {
            resultsSearch.innerHTML = '';
        } 
   
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        const image = document.createElement('img');
        imageWrapper.classList.add ('results__search');
        image.src = result.urls.small;

        imageWrapper.appendChild(image);
        resultsSearch.appendChild(imageWrapper);
    });

}

search.addEventListener('submit',(event) => {
    event.preventDefault();
    page = 1;
    searchImages();

});

searchImages();

// Breaking header
const header = document.querySelector('.header');
const defaultOffset = 100; 

let lastScroll = 0;

// Determining the scroll position
const scrollPosition = () =>  window.scrollY || document.documentElement.scrollTop;
const containHide= () => header.classList.contains('hide');

window.addEventListener('scroll', () => {

    if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
    // scroll down
    header.classList.add('hide');
    } 
    else if (scrollPosition() < lastScroll && containHide()) {
    // scroll up
    header.classList.remove('hide');
    }
    
    lastScroll = scrollPosition();
})

// Cross clearing requests in input
function clearSearch() {
    document.getElementById('search_id').value = '';
  }

// Cursor in input field
function setFocus() {
    document.getElementById('search_id').focus();
}




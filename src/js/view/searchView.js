import{ elements } from "./base";

const renderRecipe = recipe => {

    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;

    // ul ruugee nemne
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchQuery = () => {
    elements.searchInput.value = "";  // hailt hiisnii daraa bichih talbariig hooslono
};

export const clearSearchResult = () =>{
    elements.searchResultList.innerHTML = "";    // hailtiin ur dun tseverleh
    elements.pageButtons.innerHTML = "";    // btn iig tseverleh
}

export const getIpnut = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {

    // Hailtiin ur dung huudaslaj uzuuleh
    // huudsand massive iin hdduger indexees hdduger indexig uzuuleh 

    // ehleh tseg: 2 dugaar huudas bval (2-1)*10=10 buyu 2r huudsand 10r indexes ehled uzulne
    const start = (currentPage - 1) * resPerPage; 
    // tugsuh tseg: 2 dugaar huudas bval 2*10 buyu 20r index
    const end = currentPage * resPerPage;

    // joruudaar davtalt hiin delgetsend gargah
    recipes.slice(start, end).forEach(renderRecipe);

    // Huudaslaltiin tovchuudiig gargaj ireh
    // Math.ceil ni deeshege buheldene. 4.2 bval 5 bolgono 4.2 iig 4 bolgul huudsand jor maani bagtahgui
    const totalPages = Math.ceil( recipes.length / resPerPage); // recipes ni massive uchir lenghtig ni avna

    // huudas shiljih tovch 
    renderButtons(currentPage, totalPages);
};

// tovchnii type "prev", "next" gej damjulna, arrow functioniig zarlasnaasa door l duuddag.
const createButton = (
    page, type, direction
    ) =>`<button class="btn-inline results__btn--${type}" data-goto=${page}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
<span>Хуудас ${page}</span>
</button>`;

const renderButtons =(currentPage,totalPages) => {
     let buttonHtml;

     if(currentPage === 1 && totalPages > 1){
         // 1r huudsan deer baina: 2-r huudas tovchiig garga.
         buttonHtml = createButton(2, "next", "right");
     }
     else if(currentPage < totalPages){
        // Goliin huudasnuud deer bna: Umnuh bolon daraachiin huudas ruu shiljij tovchuudiig uzul
        buttonHtml = createButton(currentPage-1, "prev", "left");
        buttonHtml += createButton(currentPage+1, "next", "right");// + tavisanr deerh html iin araas zalgagdana
     }
     else if(currentPage === totalPages){
         // hamgiin suuliin huudas deer baina: Umnuh ruu shiljuuleh tovchiig l uzulne.
         buttonHtml = createButton(currentPage-1, "prev", "left");
     }

     elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};



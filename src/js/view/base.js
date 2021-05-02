// ashiglah html css elementuud
export const elements = {
    searchForm: document.querySelector(".search"),  // search hiih uyd
    searchInput: document.querySelector(".search__field"), // search hiihed bichih ug
    searchResultDiv: document.querySelector(".results"), // results div
    searchResultList: document.querySelector(".results__list"), // haisan joriig gargah 
    pageButtons: document.querySelector(".results__pages"), // next,prev button
    recipeDiv: document.querySelector(".recipe"), // jorig delgtsnd uzuleh
    shoppingList: document.querySelector(".shopping__list"), // sagsand hiih
    likesMenu: document.querySelector(".likes__field"),  // baruun deed buland bairlah zurh like
    likesList: document.querySelector(".likes__list") // baruun deed bulnd bairlah zurhend dotr bga joruud
};

export const elementStrings = {
    loader: "loader"
}

// unshaad duussan uyd iconiig ustgah
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    // parentaas ni child element iconig ustgah
    if(loader) loader.parentElement.removeChild(loader); 
};


// loading iconig uzuleh funkts
export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"</use>
        </svg>
    </div>
    `;

    parent.insertAdjacentHTML("afterbegin", loader);
}
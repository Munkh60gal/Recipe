import{elements} from "./base";

// image_url: "http://forkify-api.herokuapp.com/images/PizzaDough1of12edit5779.jpg"
// publisher: "My Baking Addiction"
// publisher_url: "http://www.mybakingaddiction.com"
// recipe_id: "dd21dd"
// social_rank: 99.9999995838859
// source_url: "http://www.mybakingaddiction.com/no-knead-pizza-dough-recipe/"
// title: "Simple No Knead Pizza Dough"


const renderRecipe = recipe => {
    console.log(recipe);
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
    elements.searchResultList.innerHTML = "";
}

export const getIpnut = () => elements.searchInput.value;

export const renderRecipes = (recipes) => {
    recipes.forEach(el => renderRecipe(el));
};
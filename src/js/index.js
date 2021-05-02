// index.js ni Model View Controller iin controller yum
require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';
import { renderRecipe, clearRecipe, highlightSelectedRecipe } from "./view/recipeView";
import List from "./model/List";
import Like from "./model/Like";
import * as likesView from "./view/likesVies";
import * as listView from "./view/listView"; // ene dotros olon funkts butsaah uchir bugdig ni * gj bn 


/**
 * Web app tuluv
 * - Hailtiin query, ur dun
 * - Tuhain uzuulj baigaa jor
 * - Like darsan joruud
 * - Zahialj baigaa joriin nairlaga 
 */
const state = {}; // tuluv



const controlSearch = async () => {
    // 1) Webees hailtiin tulhuur ugiig gargaj avna.
    const query = searchView.getIpnut();

    if(query){
        // 2) Shineer hailtiin object iig uusgej ugnu.
        state.search = new Search(query);

        // 3) Hailt hiihed zoriulj delgets(UI)-iig beltgene.
        searchView.clearSearchQuery();
        searchView.clearSearchResult();

        renderLoader(elements.searchResultDiv);

        // 4) Hailtiig guitsetgene.
        await state.search.doSearch();

        // 5) Hailtiin ur dung delgetsend uzuulne.
        clearLoader();
        if(state.search.result === undefined) alert("Хайлт илэрцгүй...");
        else searchView.renderRecipes(state.search.result);    
    }


};



elements.searchForm.addEventListener("submit", e => {
    e.preventDefault(); // Default uil ajllagaag boliulan uuriin bichsen controlSearchig ajlulah
    controlSearch();
});

// next prev 2iin gadna bga div dr event listener tavin ali tovchig darsnig olj avah
elements.pageButtons.addEventListener("click", e => {
    // daragdsan tovchiig oloy,e gdg maani click hiigdsn event e.target gvl click hiigdsn zuil ni dom deerh elmnt n garj irne. 
    // closest ni target dotrh buyu click hiigdsn yman dotor bga ymar negen css elmntd hamgin oirhn 
    // bga tuhain dom dr bga elmntig olj ugdug. doorh ni btn luu .btn-inline class dotr bga nxt prv 2 buttonni alig darsnig ugnu
    const btn = e.target.closest(".btn-inline")

    if(btn){
        // searchViewiin createButton-ii htmld data-goto attribute nemen tuuger page numberig olj bn
        // tmdgt murur unshigdad bga uchir buhel too ru horvulev ter dundaa 10 tiin toollin systemin too ruu huvirgaj bn
        const gotoPageNumber = parseInt(btn.dataset.goto, 10); 

        // tovch daragdval hailtinha ur dung tsvrlene
        searchView.clearSearchResult(); 

        // hailtiin ur dung delgetleh
        searchView.renderRecipes(state.search.result, gotoPageNumber ); 
    }
});




/**
 * Joriin controller
 */

// hash buyu id gar ni barij avna
// hash uurchlugddug event ni window deer boldog
const controlRecipe = async () => {
    // 1) URL-aas hashaas ni ID-g salgaj avna
    // window.location ni url haygiig zaaj bdg 
    const id = window.location.hash.replace("#", "");  


    // 2) Joriin model iig uusgej ugnu 
    state.recipe = new Recipe(id);

    // url deer id bga esehiig shalgana
    if(id){

        // 3) UI buyu delgetsiig beltgene
        clearRecipe();
        renderLoader(elements.recipeDiv);
        highlightSelectedRecipe(id);

        // 4) Joroo tataj avchirna
        await state.recipe.getRecipe();

        // 5) Joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
        clearLoader();
        state.recipe.calcTime();
        state.recipe.calcHuniiToo();

        // 6) Joroo delgetsend uzuulne
        renderRecipe(state.recipe, state.likes.isLiked(id));
    }

    
};

// hashchange bolon load deer controlRecipe control duudagdan jorig avchirna.
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// deerh 2 mur code iig ingj hylbarchilj bolno. 2uulang ni massivet hiigd elment burer n davtad controlRecipe duudaj ugnu.
["hashchange", "load"].forEach( e => window.addEventListener( e, controlRecipe));


window.addEventListener("load", e => {
    // Like iin modeliig uusgene.
    // herev likes ni hoosn bval shineer uusgej bn door like controlleros iishe avchirav
    // Shineer like modeliig program ehlehed uusgene. 
    if(!state.likes) state.likes = new Like();

    // baruun deed zurhen like tseiig gargah esehiig shiideh
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

    // like uud baival tedgeeriig tsesend nemj haruulna.
    // Likes dotor bga this.like uudaar davtalt hiine
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


/** 
 * Nairlaganii controller 
 */

const controlList = () => {
    // Nairlaganii modeliig uusgene
    state.list = new List();

    // Umnu ni haragdaj bsn nairlaganuudiig delgetsees zailuulna.
    listView.clearItems();

    // Ug model ruu odoo haragdaj bga jornii buh nairlagiig avch hiine
    // bugdengeer ni davtaad list bolon lisViewd hj bn
    if(state.recipe.ingredients){
        state.recipe.ingredients.forEach(n => {
            // Tuhain nairlagiig model ruu hiine
            const item = state.list.addItem(n);
            
            // Tuhain nairlagiig delgetsnd gargana
            listView.renderItem(item);
        });
    }
    
};


/**
 * Like controller
 */
const controlLike = () => {
    // 1) Like iin modeliig uusgene.
    // herev likes ni hoosn bval shineer uusgej bn
    if(!state.likes) state.likes = new Like();

    // 2) Odoo haragdaj bga joriin ID-g olj avah
    const currentRecipeId = state.recipe.id;

    // 3) Ene joriig like lasan esehiig shalgah
    if(state.likes.isLiked(currentRecipeId)){

        // Like lasan bol like iig ni boliulna
        state.likes.deleteLike(currentRecipeId);

        // baruun deed Like iin tsesnees ustgana
        likesView.deleteLike(currentRecipeId);

        // Like tovchnii likelasan baidliig boliulah
        likesView.toggleLikeBtn(false);
    }
    else{
        // Like laagui bol like lana.
        const newLike = state.likes.addLike(
            currentRecipeId, 
            state.recipe.title, 
            state.recipe.publisher, 
            state.recipe.image_url
        );

        // likelagdsn joriig baruun deed zurhen dr haragddag bolgoh
        likesView.renderLike(newLike);

        // Like tovchnii likelasan baidliig likelasan bolgoh
        likesView.toggleLikeBtn(true);
    }

    // baruun deed zurh program ehleh uyd bolon like daragui uyd haragdku
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());


};


elements.recipeDiv.addEventListener("click", (e) => {

    // hervee click hgded dardgsn target ni recipe__btn toi aarch bval 
    if(e.target.matches(".recipe__btn, .recipe__btn *")){
        controlList();
    }
    else if(e.target.matches(".recipe__love, .recipe__love *")){
        controlLike(); 
    }
});    

// ["hashchange", "load"].forEach( e => window.addEventListener( e, controlList));  




elements.shoppingList.addEventListener("click", e => {
    // click hiigdsn li elementiin data-itemid attribte iig shuuj gargaj avah
    // closest() ni click hiigdsn ymtai hamgin oir baiga elementig olno 
    const id = e.target.closest(".shopping__item").dataset.itemid;

    // Oldson id tai ortsiig modeloos ustgana.
    state.list.deleteItem(id);

    // Delgetsees iim id tai ortsiig olj bas ustgana.
    listView.deleteItem(id);

})
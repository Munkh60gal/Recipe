require("@babel/polyfill");
import Search from "./model/Search";
import {elements, renderLoader, clearLoader} from "./view/base";
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';

/**
 * Web app tuluv
 * - Hailtiin query, ur dun
 * - Tuhain zuulj baigaa jor
 * - Like darsan joruud
 * - Zahialj baigaa joriin nairlaga 
 */

const state = {};

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


}

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

const r = new Recipe(47746);
r.getRecipe();
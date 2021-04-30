require("@babel/polyfill");
import Search from "./model/Search";
import {elements} from "./view/base";
import * as searchView from './view/searchView';

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
        // 4) Hailtiig guitsetgene.
        await state.search.doSearch();

        // 5) Hailtiin ur dung delgetsend uzuulne.
        if(state.search.result === undefined) alert("Хайлт илэрцгүй...");
        else searchView.renderRecipes(state.search.result);    
    }


}

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault(); // Default uil ajllagaag boliulan uuriin bichsen controlSearchig ajlulah
    controlSearch();
});
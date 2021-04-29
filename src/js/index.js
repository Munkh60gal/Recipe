require("@babel/polyfill");
import Search from "./model/Search";

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
    const query = "pizza";

    if(query){
        // 2) Shineer hailtiin object iig uusgej ugnu.
        state.search = new Search(query);

        // 3) Hailt hiihed zoriulj delgets(UI)-iig beltgene.

        // 4) Hailtiig guitsetgene.
        await state.search.doSearch();

        // 5) Hailtiin ur dung delgetsend uzuulne.
        console.log(state.search.result);    
    }


}

document.querySelector(".search").addEventListener("submit", e => {
    e.preventDefault(); // Default uil ajllagaag boliulan uuriin bichsen controlSearchig ajlulah
    controlSearch();
});
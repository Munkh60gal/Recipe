// Search.js ni hailtiin queryg dotroo hadgalnahaas gadna tuhain querygeer haigdaad garch irsen ur dung hadgalna. 
require("@babel/polyfill"); // async funktsig babeldehed polyfill hereglene
import axios from "axios"


export default class Search{
    // baigulagch funktsin armgumentar yu haih gj bga ter queryg damjulay
    constructor(query){
        this.query = query; // query g dotro hadgalj bna
    }

    async doSearch(){  //class dotor function keyword ashiglahgui

        try{
            let result = await axios("https://forkify-api.herokuapp.com/api/search?q=" + this.query);
            this.result = result.data.recipes;  // ashiglah api aas zuvhun joriig ni avj bn
            return this.result;
        }
        catch(error){
            console.log('Асуудал гарлаа: ' + error);
        }
    
    
    }
}
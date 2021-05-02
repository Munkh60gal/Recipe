export default class Likes {
    constructor(){

        this.readDataFromLocalStorage();
          
        // buh like uud ehlehdee hoosnos ehleh uchir hoosn massive aar uusgy
        // hervee localstorage ees unshsanii dra hooson bval null utga unshigdana.
        // null blgaj bolku uchraas hooson massvie bolgoj uurchilnu.
        if(!this.likes) this.likes = [];
        
    }

    addLike(id, title, publisher, img){
        // doorh bichglel ni id:id, title:title, author:author gsntei adil
        const like = {id, title, publisher, img};

        this.likes.push(like);

        // storage ruu hadgalna.
        this.saveDataToLocalStorage();

        return like;
    }

    deleteLike(id){
        // id gdg id tai like iin indexiig massive aas haij olno
        // findIndex() ni massive aar davtalt hiin tuhain element bolgonii huvid damjulj ugsun nuhtsuliig shalgaad tiim nuhtsultei ymnii hamgiin ehnii taarldsn indexig butsadag
        const index = this.likes.findIndex(el => el.id === id);

        // storage ruu hadgalna.
        this.saveDataToLocalStorage();

        // Ug index deerh elementiig massive aas ustgana
        this.likes.splice(index, 1);
    }

    isLiked(id){
        // -1 bvl likelagdsan bish -1 bish bvl likelagdsn
        // if (this.likes.findIndex(el => el.id === id)=== -1) return false;
        // else return true;

        // deerhig ingj tovchloy
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    // niit heden likelagdsn jor bgagin too
    getNumberOfLikes(){
        return this.likes.length;
    }

    // localStorage ruu hadgalah funkts
    saveDataToLocalStorage(){
        // massive iig localStorage ruu hj boldgui uchir temdegt mur luu horvuleh hrgtei.
        // JSON.stringify() ni massive iig bugdng ni davtalt hj bgad dotorh buh utgudig 1 string bolgoj zalgad JSON bolgodog.
        // JSON baidlaar hadgalj bn.
        localStorage.setItem("likes",JSON.stringify(this.likes));
    }

    // Program ehlhed localstorage dotor ym bval teriig unshad butsgad like model ru massive ru hiine.
    readDataFromLocalStorage(){
        // likes ni deerh code ajillasni dra JSON bolj bga uchir butsgd js object bolgoj huvirgana
        // enehu uildlig ni JSON.parse() guitsetgene
        this.likes = JSON.parse( localStorage.getItem("likes") );
    }
}
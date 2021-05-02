// Minii sags hesegiin model narilaganii jagsaalt
import uniqid from "uniqid";

export default class List {
    constructor() {
        this.items = [];
    }

    deleteItem(id){
        // id gdg id tai ortsiin indexiig massive aas haij olno
        // findIndex() ni massive aar davtalt hiin tuhain element bolgonii huvid damjulj ugsun nuhtsuliig shalgaad tiim nuhtsultei ymnii hamgiin ehnii taarldsn indexig butsadag
        const index = this.items.findIndex(el => el.id === id);

        // Ug index deerh elementiig massive aas ustgana
        this.items.splice(index, 1);
    };

    addItem(item){
        let newItem = {
            id: uniqid(),
            item // doorh shg bichsn ch bolno herev 2 ner adilhan bol 1 uda bichihed l bolno
            // item: item 

        };

        this.items.push(newItem);

        return newItem;
    }
}
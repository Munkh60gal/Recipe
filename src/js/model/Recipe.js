// Ene model ni tuhain joriig id aar tataj avchraad dund talin tom delgetsnd uzuuleh uchraas axiosiig hereglene

import axios from 'axios';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    // joriin medeelluudiig tataj avj bna
    async getRecipe(){
        const result = await axios("https://forkify-api.herokuapp.com/api/get?rId=" + this.id);

        this.publisher = result.data.recipe.publisher;
        this.image_url = result.data.recipe.image_url;
        this.ingredients = result.data.recipe.ingredients;
        this.publisher_url = result.data.recipe.publisher_url;
        this.recipe_id = result.data.recipe.recipe_id;
        this.social_rank = result.data.recipe.social_rank;
        this.source_url = result.data.recipe.source_url;
        this.title = result.data.recipe.title;

    }
};
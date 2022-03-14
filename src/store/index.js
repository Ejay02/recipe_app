import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: [
      {
        slug: "stew",
        title: "Stew",
        description:
          "Nigerian stew made with toamtoes, pepper, onions and protein.",
        ingredients: [
          "Tomatoes",
          "Pepper",
          "Garlic (optional)",
          "Ginger(optional)",
          "Groundnut oil",
          "Onions",
          "Spices",
          "Salt to taste",
          "Boiled protein of choice.",
        ],
        method: [
          "Wash and blend tomato, pepper, onion, garlic, ginger and boil till dry",
          "Put a pot on fire with some oil",
          "Add chopped onion, ginger, garlic to hot oil, stir occasionally",
          "Add in boiled tomato and allow to fry.. keep an eye on it though.. you dont want it burnt.",
          "Add fried chicken ... assuming you havent eaten it all",
          "Throw in spices/seasoning and 🤏🏽salt to taste.",
          "Boil some hot fluffy white rice and fry some dodo and viola! youre good to go 👌🏽",
        ],
      },
      {
        slug: "egusi-soup",
        title: "Egusi soup",
        description: "Hot Egusi soup to go with pounded yam",
        ingredients: [
          "Egusi",
          "Ugu",
          "pepper",
          "garlic (optional",
          "ginger(optional)",
          "palm oil",
          "onions",
          "spices",
          "salt to taste",
          "Boiled and Fried goatmeat",
        ],
        method: [
          "Wash and blend pepper, onion, garlic, ginger and boil till dry",
          "Put a pot on fire with some oil",
          "Add chopped onion, ginger, garlic to hot oil, stir occasionally",
          "Add in blended pepper mix and allow to fry.. keep an eye on it though.. you dont want it burnt.",
          "Mix blended egusi with water if dry blend and add to the mixture on fire",
          "be sure to stir ocassionally to avoid burning",
          "Add fried goatmeat ... assuming you havent eaten it all",
          "Add your properly washed ugu vegetables",
          "Reduce the heat",
          "Throw in spices/seasoning and 🤏🏽salt to taste.",
        ],
      },
    ],
  },
  mutations: {
    ADD_RECIPE(state, recipe) {
      state.recipes.push(recipe);
    },
  },
  actions: {},
  modules: {},
});

<template>
  <div class="home">
    <h1>My Recipes</h1>
    <button class="glow-on-hover" @click="togglePopup">Add New Recipe</button>
    <div class="recipes">
      <div
        class="card"
        v-for="recipe in $store.state.recipes"
        :key="recipe.slug"
      >
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/${recipe.slug}`">
          <button>View Recipe</button>
          <!-- <button class="edit">Edit</button> -->
        </router-link>
      </div>
    </div>

    <div class="add-recipe-popup" v-if="popupOpen">
      <div class="popup-content">
        <h2>Add new recipe</h2>

        <form @submit.prevent="addNewRecipe">
          <div class="group">
            <label for="">Title</label>
            <input type="text" v-model="newRecipe.title" />
          </div>

          <div class="group">
            <label for="">Description</label>
            <textarea v-model="newRecipe.description"></textarea>
          </div>

          <div class="group">
            <label for="">Ingredients </label>
            <div
              class="ingredient"
              v-for="i in newRecipe.ingredientRows"
              :key="i"
            >
              <input type="text" v-model="newRecipe.ingredients[i - 1]" />
            </div>
            <button type="button" @click="addNewIngredient">
              Add Ingredients
            </button>
          </div>

          <div class="group">
            <label for="">Method </label>
            <div class="method" v-for="i in newRecipe.methodRows" :key="i">
              <textarea v-model="newRecipe.method[i - 1]"></textarea>
            </div>
            <button type="button" @click="addNewStep">Add a step</button>
          </div>

          <button type="submit">Add Recipe</button>
          <button class="edit" type="button" @click="togglePopup">Close</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {},

  setup() {
    const newRecipe = ref({
      title: "",
      description: "",
      ingredients: [],
      method: [],
      ingredientRows: 1,
      methodRows: 1,
    });

    const popupOpen = ref(false);
    const store = useStore();

    const togglePopup = () => {
      popupOpen.value = !popupOpen.value;
    };

    const addNewIngredient = () => {
      newRecipe.value.ingredientRows++;
    };

    const addNewStep = () => {
      newRecipe.value.methodRows++;
    };

    const addNewRecipe = () => {
      newRecipe.value.slug = newRecipe.value.title
        .toLowerCase()
        .replace(/\s/g, "-");

      if (newRecipe.value.slug == "") {
        alert("Please enter a title");
        return;
      }

      store.commit("ADD_RECIPE", { ...newRecipe.value });

      newRecipe.value = {
        title: "",
        description: "",
        ingredients: [],
        method: [],
        ingredientRows: 1,
        methodRows: 1,
      };

      togglePopup();
    };

    return {
      newRecipe,
      popupOpen,
      addNewStep,
      togglePopup,
      addNewRecipe,
      addNewIngredient,
    };
  },
};
</script>

<style>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 3rem;
  margin-bottom: 32px;
}
.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.recipes .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #081c33;
}
.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}
.add-recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}
.add-recipe-popup .popup-content {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
}
.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.popup-content .group {
  margin-bottom: 1rem;
}
.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}
.popup-content .group input,
.popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.popup-content .group textarea {
  height: 100px;
  resize: none;
}

.popup-content button[type="submit"] {
  margin-right: 1rem;
}
.edit {
  float: right;
}

.glow-on-hover {
  width: 220px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  color: #000;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>

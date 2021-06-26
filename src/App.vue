<template>
  <div class="container">
    <h1>ToDo List</h1>
     <div @click="toggleModal" class="new-todo">
      <i class="fas fa-plus"></i>
    </div>
    <Todos/>
    <div v-if="$store.state.showModal">
      <AddTodoModal />
    </div>
  </div>
</template>

<script>
import Todos from "./components/Todos.vue";
import AddTodoModal from "./components/addTodoModal.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Todos,
    AddTodoModal,
  },
  data() {
    return {
      name: "",

    };
  },

  methods: {

    ...mapMutations(["toggleModal"]),
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  background: #090920;
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid white;
  padding: 50px;
  border-radius: 20px;
}

.container h1 {
  font-size: 20px;
  color: grey;
  margin-bottom: 50px;
}

.new-todo {
  position: relative;
  float: right;
  background: #5f7099;
  border-radius: 50%;
  padding: 12px;
  margin: 5px;
  bottom: 70px;
font-size: 10px;
}

.new-todo .fas {
  font-size: 30px;
}
</style>

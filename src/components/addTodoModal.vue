<template>
  <div class="modalDialog" id="openLoginModal">
    <div class="login-container">
      <i @click="toggleModal" class="fas fa-times"></i>
      <form @submit="onSubmit">
        <div>Todo Name</div>
        <input type="text" v-model="name" />
        <div>Todo Description</div>
        <textarea v-model="desc" id="" cols="30" rows="10"></textarea>
        <div>
          <button class="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { mapMutations } from "vuex";
export default {
  name: "AddTodoModal",

  data() {
    return {
      name: "",
      desc: "",
    };
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.name) {
        alert("Please Add A  Todo");
      }

      const newTodo = {
        // id: Math.floor(Math.random() * 1000),
        event: this.name,
        description: this.desc,
        isCompleted: false,
      };

      this.$store.dispatch("addTodo", newTodo)

      this.$store.state.showModal = false
    },


    ...mapMutations(["toggleModal"])
  },
};
</script>

<style scoped>
.modalDialog {
  position: fixed;
  font-family: Arial, Helvetica, sans-serif;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  opacity: 1;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;
  pointer-events: auto;
}

.modalDialog > div {
  display: grid;
  justify-content: center;
  justify-items: center;
  width: 350px;
  position: relative;
  margin: 200px auto;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
  height: 400px;
}

/* #LOGIN FORM
================================================== */

.login-container {
  width: 25%;
  border: 1px solid#999;
  border-radius: 15%;
}

i {
  float: right;
  bottom: 27px;
  position: relative;
  left: 150px;
}

input {
  height: 30px;
  width: 250px;
  border-radius: 7px;
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid gray;
}

textarea {
  width: 250px;
  border-radius: 7px;
  border: 1px solid gray;
  height: 80px;
}

.btn-submit {
  width: 70px;
  height: 30px;
  padding: px;
  background: #6b6bdf;
  border: none;
  color: white;
  border-radius: 4px;
  left: 180px;
  position: relative;
  top: 20px;
}
</style>

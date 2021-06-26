<template>
  <div class="tasks" >
    <Todo v-for="todo in todos" :key="todo.id" :todo="todo"
    />
  </div>
</template>

<script>
import mapState from 'vuex'
import Todo from "./Todo.vue";
export default {
  name: "Todos",
  components: {
    Todo,
  },

  methods: {
     
  },
   mounted() {
    this.$store.dispatch("fetchTodos")
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
};
</script>

<style scoped></style>

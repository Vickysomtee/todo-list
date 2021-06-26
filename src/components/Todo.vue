<template>
  <div :class="[todo.isCompleted ? 'complete' : ' ', 'task']">
    <div class="top">
      <h3>
        {{ todo.event }}
      </h3>
      <div class="icon">
        <i
          @click.prevent="completeTodo(todo.id)"
          class="fas fa-check-circle"
        ></i>
        <i @click.prevent="deleteTodo" class="fas fa-trash"></i>
      </div>
    </div>
    <p>{{ todo.description }}</p>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: ["todo"],

  methods: {
    completeTodo(id) {
      return this.$store.getters.completeTodo(id);
    },

    deleteTodo() {
      if (confirm("Are you sure?")) {
        this.$store.dispatch("deleteTodo", this.todo);
      }
    },
  },
};
</script>

<style scoped>
.fa-trash {
  color: red;
}

.fa-check-circle {
  color: green;
  margin-right: 10px;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 20px 10px;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 2px 3px 5px 3px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 2px 3px 5px 3px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 2px 3px 5px 3px rgba(0, 0, 0, 0.55);
}
.task.complete {
  text-decoration: line-through;
}
.top {
  font-size: 15px;
  font-weight: normal;
}

.top h3 {
  text-decoration: underline;
}

.icon {
  display: flex;
  position: relative;
  bottom: 20px;
  margin-left: 280px;
}

.task p {
  top: 20px;
  position: relative;
  font-size: 12px;
}
</style>

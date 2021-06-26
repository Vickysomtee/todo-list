import { createStore } from "vuex";

export default createStore({
  state: {
    counter: 3,
    todos: [],
    showModal: false,
  },
  mutations: {
    toggleModal(state) {
      state.showModal = !state.showModal;
    },

    getTodos(state, payload) {
      state.todos = payload;
    },

    ADD_TODOS(state, payload) {
      state.todos.push(payload);
    },

    DELETE_TODO(state, payload) {
       state.todos = state.todos.filter((todo) => { return todo.id !== payload.id});
    },

  },
  actions: {
    async fetchTodos({ commit }) {
      const data = await fetch("http://localhost:3000/todos", {
        method: "GET",
      });
      const res = await data.json();
      commit("getTodos", res);
    },

    async addTodo({ commit }, payload) {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      commit("ADD_TODOS", data);
    },

    async deleteTodo({ commit }, payload) {
      commit("DELETE_TODO", payload)
      const res = await fetch(`http://localhost:3000/todos/${payload.id}`, {
        method: "DELETE",
      });
    },
  },
  getters: {
    completeTodo: (state)  => (id) => {
      state.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
    },
  },
  modules: {},
});

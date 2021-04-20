<template>
  <div>
    我是Vuex
    <div>{{ name }}</div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch('getNameFetch');
    const name = computed(() => store.state.name);
    return {
      name,
    };
  },
});
</script>

<style lang="" scoped></style>

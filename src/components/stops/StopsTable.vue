<template>
  <v-card flat>
    <v-text-field
      v-model="search"
      label="Buscar"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>

    <v-data-table :headers="headers" :items="filteredItems" :search="search" >
      
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="green" class="mr-4" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
       
      </template>
    </v-data-table>

  </v-card>
</template>

<script>

import { ref, computed } from "vue";

export default {
  name: "DataTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ["deleteItem"],
  setup(props, { emit }) {
    const search = ref("");

    const isEditFormVisible = ref(false);

    const headers = ref([
      { align: "start", key: "name", sortable: false, title: "Código de cisterna" },
      { key: "latitude", title: "Placa" },
      { key: "longitude", title: "Capacidad" },
      { key: "actions", title: "Acciones", sortable: false },
    ]);

    const filteredItems = computed(() => {
      if (!search.value) {
        return props.items;
      }
      const searchTerm = search.value.toLowerCase();
      return props.items.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm)
        )
      );
    });

    const deleteItem = (item) => {
      
      emit("deleteItem", item);
    };

    const editItem = (item) => {
      emit("editItem", item)
    }


    const closeEditForm = () => {
      isEditFormVisible.value = false;
    };

    return {
      search,
      headers,
      filteredItems,
      deleteItem,
      closeEditForm,
      editItem
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para el componente de la tabla */
</style>

<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="font-bold lg:text-2xl text-xl text-gray-500 mb-5"> PARADAS</h1>

            <button
                class="flex items-center justify-center bg-[#f13131] text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-500 shadow-md"
                @click="openCreateForm">
                Crear +
            </button>
        </div>
        <CreateStopsForm v-if="isCreateFormVisible" @close="closeCreateForm" @stopCreated="fetchRoutes" />
        <RoutesTable :routes="routes" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { listStopsApi } from '@/api/StopsService';
import RoutesTable from '@/components/stops/StopsTable.vue';
import CreateStopsForm from '@/components/stops/CreateStopsForm.vue';
import store from '@/store';

export default {
    components: { RoutesTable , CreateStopsForm},
    setup() {
        const routes = ref([]);

        const isCreateFormVisible = ref(false);
        const openCreateForm = () => {
            isCreateFormVisible.value = true;
        };

        const closeCreateForm = () => {
            isCreateFormVisible.value = false;
        };

        const fetchRoutes = async () => {
            try {
                const token = store.state.token;
                const response = await listStopsApi(token);
                routes.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener las rutas:', error);
            }
        };

        onMounted(fetchRoutes);

        return {
            routes,
            isCreateFormVisible,
            openCreateForm,
            closeCreateForm,
            fetchRoutes
        };
    },
};
</script>

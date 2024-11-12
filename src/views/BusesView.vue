<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="font-bold lg:text-2xl text-xl text-gray-500 mb-5"> BUSES</h1>

            <button
                class="flex items-center justify-center bg-[#f13131] text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-500 shadow-md"
                @click="openCreateForm">
                Crear +
            </button>
        </div>


        <RoutesTable :routes="routes" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { listBusesApi } from '@/api/BusService';
import RoutesTable from '@/components/buses/BusesTable.vue';
import store from '@/store';

export default {
    components: { RoutesTable },
    setup() {
        const routes = ref([]);

        const fetchRoutes = async () => {
            try {
                const token = store.state.token;
                const response = await listBusesApi(token);
                routes.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener las rutas:', error);
            }
        };

        onMounted(fetchRoutes);

        return { routes };
    },
};
</script>

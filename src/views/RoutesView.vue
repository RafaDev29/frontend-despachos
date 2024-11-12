<template>
    <div>
        <h1>Rutas</h1>
        <RoutesTable :routes="routes" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { listRoutesApi } from '@/api/RoutesService';
import RoutesTable from '@/components/routes/RoutesTable.vue';
import store from '@/store';

export default {
    components: { RoutesTable },
    setup() {
        const routes = ref([]);

        const fetchRoutes = async () => {
            try {
                const token = store.state.token;
                const response = await listRoutesApi(token);
                routes.value = response.data; // Suponiendo que los datos están en `data`
            } catch (error) {
                console.error('Error al obtener las rutas:', error);
            }
        };

        onMounted(fetchRoutes);

        return { routes };
    },
};
</script>

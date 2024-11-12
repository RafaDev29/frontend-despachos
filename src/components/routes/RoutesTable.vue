<template>
    <div class="overflow-x-auto p-6 bg-gray-50">
        <table class="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
            <thead>
                <tr class="bg-blue-600 text-white uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">Código</th>
                    <th class="py-3 px-6 text-left">Nombre</th>
                    <th class="py-3 px-6 text-center">Paradas</th>
                </tr>
            </thead>
            <tbody class="text-gray-700 text-sm font-light">
                <tr 
                    v-for="(route, index) in paginatedRoutes" 
                    :key="route.code" 
                    class="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                    <td class="py-3 px-6">{{ route.code }}</td>
                    <td class="py-3 px-6">{{ route.name }}</td>
                    <td class="py-3 px-6 text-center">
                        <button 
                            @click="toggleExpanded(index)" 
                            class="text-blue-500 font-semibold focus:outline-none"
                        >
                            {{ expandedIndex === index ? 'Ocultar' : 'Ver' }} paradas
                        </button>
                        <!-- Lista de paradas desplegable -->
                        <div v-if="expandedIndex === index" class="mt-2 bg-gray-50 rounded-lg p-4 shadow-inner transition-all duration-200">
                            <table class="min-w-full bg-white border rounded-lg">
                                <thead>
                                    <tr class="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                                        <th class="py-2 px-3 text-left">Parada</th>
                                        <th class="py-2 px-3 text-left">Tiempo (min)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="stop in route.step_time_ids" :key="stop.bus_stop" class="border-b border-gray-200">
                                        <td class="py-2 px-3 text-gray-700">{{ stop.bus_stop }}</td>
                                        <td class="py-2 px-3 text-gray-700">{{ stop.time }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Paginación -->
        <div class="flex justify-between items-center mt-4">
            <button 
                @click="prevPage" 
                :disabled="currentPage === 1" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Anterior
            </button>
            <span class="text-gray-600">Página {{ currentPage }} de {{ totalPages }}</span>
            <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Siguiente
            </button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    props: {
        routes: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const expandedIndex = ref(null);
        const currentPage = ref(1);
        const itemsPerPage = 5;

        const toggleExpanded = (index) => {
            expandedIndex.value = expandedIndex.value === index ? null : index;
        };

        const totalPages = computed(() => Math.ceil(props.routes.length / itemsPerPage));

        const paginatedRoutes = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return props.routes.slice(start, end);
        });

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
                expandedIndex.value = null; // Reset the expanded index on page change
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
                expandedIndex.value = null; // Reset the expanded index on page change
            }
        };

        return { expandedIndex, toggleExpanded, currentPage, totalPages, paginatedRoutes, nextPage, prevPage };
    },
};
</script>

<style scoped>
/* Estilos adicionales */
.bg-blue-600 {
    background-color: #2563eb;
}

.v-btn {
    color: #2563eb;
}
</style>

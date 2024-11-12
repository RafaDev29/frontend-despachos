<template>
    <div class="overflow-x-auto p-6 bg-gray-50">

        <div class="flex justify-between items-center mb-4">
            <label>
                Filas por página:
                <select v-model="rowsPerPage" class="border rounded px-2 py-1">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="routes.length">Todas</option>
                </select>
            </label>

        </div>

        <table class="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
            <thead>
                <tr class="bg-gray-600 text-white uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">Código</th>
                    <th class="py-3 px-6 text-left">Nombre</th>
                    <th class="py-3 px-6 text-center">Paradas</th>
                </tr>
            </thead>
            <tbody class="text-gray-700 text-sm font-light">
                <tr v-for="(route, index) in paginatedRoutes" :key="route.code"
                    class="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                    <td class="py-3 px-6">{{ route.code }}</td>
                    <td class="py-3 px-6">{{ route.name }}</td>
                    <td class="py-3 px-6 text-center">
                        <button @click="toggleExpanded(index)" class="text-yellow-400 font-semibold focus:outline-none">
                            {{ expandedIndex === index ? 'Ocultar' : 'Ver' }} paradas
                        </button>
                        <!-- Lista de paradas desplegable -->
                        <div v-if="expandedIndex === index"
                            class="mt-2 bg-gray-50 rounded-lg p-4 shadow-inner transition-all duration-200">
                            <table class="min-w-full bg-white border rounded-lg">
                                <thead>
                                    <tr class="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                                        <th class="py-2 px-3 text-left">Parada</th>
                                        <th class="py-2 px-3 text-left">Tiempo (min)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="stop in route.step_time_ids" :key="stop.bus_stop"
                                        class="border-b border-gray-200">
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

        <div class="flex justify-between items-center mt-4">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Anterior
            </button>
            <div>
                Página {{ currentPage }} de {{ totalPages }}
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
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
        const rowsPerPage = ref(5);


        const toggleExpanded = (index) => {
            expandedIndex.value = expandedIndex.value === index ? null : index;
        };

        const paginatedRoutes = computed(() => {
            const start = (currentPage.value - 1) * rowsPerPage.value;
            const end = start + rowsPerPage.value;
            return props.routes.slice(start, end);
        });

        const totalPages = computed(() => {
            return Math.ceil(props.routes.length / rowsPerPage.value);
        });

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        return { expandedIndex, toggleExpanded,  currentPage,
            rowsPerPage,
            paginatedRoutes,
            totalPages,
            prevPage,
            nextPage };
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

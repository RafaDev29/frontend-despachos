<template>
    <div class="overflow-x-auto">
        <div class="flex justify-between items-center mb-4">
            <label>
                Filas por página:
                <select v-model="rowsPerPage" class="border rounded px-2 py-1">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="(routes || []).length">Todas</option>
                </select>
            </label>
            <button
                @click="deleteSelectedRoutes"
                class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                :disabled="!selectedRoutes.length"
            >
                Eliminar Masivamente
            </button>
        </div>

        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-600 text-white uppercase text-sm leading-normal">
                    <th class="py-3 px-4 border-b text-center">
                        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                    </th>
                    <th class="py-3 px-4 border-b text-start">Código</th>
                    <th class="py-3 px-4 border-b text-start">Documento del conductor</th>
                    <th class="py-3 px-4 border-b text-center">Registro Municipal</th>
                    <th class="py-3 px-4 border-b text-center">Ruta</th>
                    <th class="py-3 px-4 border-b text-center">Tiempo</th>
                    <th class="py-3 px-4 border-b text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!routes || routes.length === 0">
                    <td colspan="7" class="py-8 px-4 text-center text-gray-500">
                        <div class="flex flex-col items-center">
                            <span class="mdi mdi-alert mdi-36px"></span>
                            <span class="text-lg font-semibold">No hay despachos para esta fecha</span>
                        </div>
                    </td>
                </tr>
                <tr v-else v-for="(route) in paginatedRoutes" :key="route.code" class="hover:bg-gray-50 cursor-pointer">
                    <td class="py-3 px-4 border-b text-center">
                        <input type="checkbox" :value="route.code" v-model="selectedRoutes" />
                    </td>
                    <td class="py-3 px-4 border-b text-start">{{ route.code || "-" }}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.driver_identification_document }}</td>
                    <td class="py-3 px-4 border-b text-center">{{ route.bus_municipal_registry }}</td>
                    <td class="py-3 px-4 border-b text-center">{{ route.route_code }}</td>
                    <td class="py-3 px-4 border-b text-center">{{ route.time }}</td>
                    <td class="py-3 px-4 border-b text-center">
                        <button @click="$emit('deleteRoute', route.code)"
                            class="text-red-500 hover:text-red-700 focus:outline-none" title="Eliminar">
                            <i class="mdi mdi-delete"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex justify-between items-center mt-4">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Anterior
            </button>
            <div>
                Página {{ currentPage }} de {{ totalPages }}
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Siguiente
            </button>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
    props: {
        routes: {
            type: Array,
            required: true,
        },
    },
    emits: ['deleteRoute', 'deleteSelectedRoutes'],
    setup(props, { emit }) {
        const currentPage = ref(1);
        const rowsPerPage = ref(5);
        const selectedRoutes = ref([]); // Lista de códigos seleccionados
        const selectAll = ref(false);

        const paginatedRoutes = computed(() => {
            const start = (currentPage.value - 1) * rowsPerPage.value;
            const end = start + rowsPerPage.value;
            return (props.routes || []).slice(start, end);
        });

        const totalPages = computed(() => {
            return Math.ceil((props.routes || []).length / rowsPerPage.value);
        });

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        // Seleccionar o deseleccionar todas las filas visibles
        const toggleSelectAll = () => {
            if (selectAll.value) {
                selectedRoutes.value = paginatedRoutes.value.map(route => route.code);
            } else {
                selectedRoutes.value = [];
            }
        };

        // Actualiza `selectAll` cuando cambia `selectedRoutes`
        watch(selectedRoutes, (newSelection) => {
            selectAll.value = newSelection.length === paginatedRoutes.value.length;
        });

        const deleteSelectedRoutes = () => {
            emit('deleteSelectedRoutes', selectedRoutes.value);
            selectedRoutes.value = [];
            selectAll.value = false;
        };

        return {
            currentPage,
            rowsPerPage,
            paginatedRoutes,
            totalPages,
            prevPage,
            nextPage,
            selectedRoutes,
            selectAll,
            toggleSelectAll,
            deleteSelectedRoutes,
        };
    },
};
</script>

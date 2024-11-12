<template>
    <div class="overflow-x-auto">
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


        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-600 text-white uppercase text-sm leading-normal">
                    <th class="py-3 px-4 border-b text-start">Imei</th>
                    <th class="py-3 px-4 border-b text-start">Matrícula</th>
                    <th class="py-3 px-4 border-b text-center">Registro Municipal</th>


                </tr>
            </thead>
            <tbody>
                <tr v-for="(route) in paginatedRoutes" :key="route.code" class="hover:bg-gray-50 cursor-pointer">
                    <td class="py-3 px-4 border-b text-start">{{ route.imei || "-" }}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.license_plate }}</td>
                    <td class="py-3 px-4 border-b text-center">{{ route.municipal_registry }}</td>



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
        const currentPage = ref(1);
        const rowsPerPage = ref(5);

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

        return {
            currentPage,
            rowsPerPage,
            paginatedRoutes,
            totalPages,
            prevPage,
            nextPage,
        };
    },
};
</script>

<style scoped>
/* Estilos adicionales */
</style>

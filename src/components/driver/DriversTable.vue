<template>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-100 text-gray-700">
                    <th class="py-3 px-4 border-b text-start">Código</th>
                    <th class="py-3 px-4 border-b text-start">Nombre</th>
                    <th class="py-3 px-4 border-b text-start">Documento</th>
                    <th class="py-3 px-4 border-b text-start">email</th>
                    <th class="py-3 px-4 border-b text-start">Tipo de licencia</th>
                    <th class="py-3 px-4 border-b text-start">Expiracion de lincenia</th>
                    <th class="py-3 px-4 border-b text-start">Puntos de licencia</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(route) in routes" :key="route.code" class="hover:bg-gray-50 cursor-pointer">
                    <td class="py-3 px-4 border-b text-start">{{ route.code || "-"}}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.name }}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.identification_document }}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.email || "-"}}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.license_type }}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.license_expiration_date }}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.license_points }}</td>
                  
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
//import { ref } from 'vue';

export default {
    props: {
        routes: {
            type: Array,
            required: true,
        },
    },
    setup() {
      
    },
};
</script>

<style scoped>
/* Estilos adicionales */
</style>

<template>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-100 text-gray-700">
                    <th class="py-3 px-4 border-b text-start">Código</th>
                    <th class="py-3 px-4 border-b text-start">Documento del conductor</th>
                    <th class="py-3 px-4 border-b text-center">Registro Municipal</th>
                    <th class="py-3 px-4 border-b text-center">Ruta</th>
                    <th class="py-3 px-4 border-b text-center">Tiempo</th>
                
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(route) in routes" :key="route.code" class="hover:bg-gray-50 cursor-pointer">
                    <td class="py-3 px-4 border-b text-start">{{ route.code || "-"}}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.driver_identification_document }}</td>
                    <td class="py-3 px-4 border-b text-center">{{ route.bus_municipal_registry }}</td>
                    <td class="py-3 px-4 border-b text-center">{{ route.route_code }}</td>
                    <td class="py-3 px-4 border-b text-center">{{ route.time }}</td>
                 
          
                  
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

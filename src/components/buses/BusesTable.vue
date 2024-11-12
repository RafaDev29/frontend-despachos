<template>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-100 text-gray-700">
                    <th class="py-3 px-4 border-b text-start">Imei</th>
                    <th class="py-3 px-4 border-b text-start">Matrícula</th>
                    <th class="py-3 px-4 border-b text-center">Registro Municipal</th>
                
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(route) in routes" :key="route.code" class="hover:bg-gray-50 cursor-pointer">
                    <td class="py-3 px-4 border-b text-start">{{ route.imei || "-"}}</td>
                    <td class="py-3 px-4 border-b text-start">{{ route.license_plate }}</td>
                    <td class="py-3 px-4 border-b text-center">{{ route.municipal_registry }}</td>
                 
          
                  
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

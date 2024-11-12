<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
        <v-card>
            <span class="text-h5 mp-2 mb-4 text-center">Crear Nueva Ruta</span>
            <v-card-text>
                <v-form @submit.prevent="submitForm">
                    <v-text-field v-model="form.code" label="Código" prepend-icon="mdi mdi-rename-box"
                        required></v-text-field>
                    <v-text-field v-model="form.name" label="Nombre" prepend-icon="mdi mdi-road-variant"
                        required></v-text-field>

                    <div v-for="(stop, index) in form.step_time_ids" :key="index" class="mb-4">
                        <v-text-field v-model="stop.bus_stop" label="Parada" prepend-icon="mdi mdi-map"
                            required></v-text-field>
                        <v-text-field v-model="stop.time" label="Tiempo" type="number" prepend-icon="mdi-clock"
                            required></v-text-field>
                    </div>
                    <v-btn text @click="addStop">Añadir Parada</v-btn>

                    <v-card-actions class="justify-end">
                        <v-btn text @click="closeDialog" color="#180c24">Cancelar</v-btn>
                        <v-btn type="submit" color="red">Guardar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { ref } from 'vue';
import { createRoutesApi } from '@/api/RoutesService';
import store from '@/store';

export default {
    emits: ['close', 'routeCreated'],
    setup(props, { emit }) {
        const dialog = ref(true);
        const form = ref({
            code: '',
            name: '',
            step_time_ids: [
                { bus_stop: '', time: 0 }
            ]
        });

        const closeDialog = () => {
            emit('close');
        };

        const addStop = () => {
            form.value.step_time_ids.push({ bus_stop: '', time: 0 });
        };

        const submitForm = async () => {
            try {
                const token = store.state.token;
                const payload = {
                    code: form.value.code,
                    name: form.value.name,
                    step_time_ids: form.value.step_time_ids.map(stop => ({
                        bus_stop: stop.bus_stop,
                        time: Number(stop.time) 
                    }))
                };
                await createRoutesApi(token, payload);
                emit('routeCreated');
                closeDialog();
            } catch (error) {
                console.error('Error al crear la ruta:', error);
            }
        };

        return {
            dialog,
            form,
            closeDialog,
            addStop,
            submitForm
        };
    }
};
</script>

<style scoped></style>
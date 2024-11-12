<template>
    <form id="login-form" class="lg:w-[80%] w-full flex flex-col justify-center text-center">
        <span class="text-gray-600 pb-1 label text-start">Usuario</span>
        <v-text-field color="red-darken-2" density="compact" placeholder="Ingrese su usuario"
            prepend-inner-icon="mdi mdi-account" variant="outlined" v-model="username"></v-text-field>
        <div class="flex justify-between">
            <span class="text-gray-600 pb-1 label">Contraseña</span>
        </div>
        <v-text-field color="red-darken-2" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingrese su contraseña"
            prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
            v-model="password"></v-text-field>
        <div>
            <v-col cols="auto">
                <v-btn size="large" color="red-darken-2" @click="validateCredential">Ingresar</v-btn>
            </v-col>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const visible = ref(false);
/* eslint-disable */
const emit = defineEmits(['validate-credentials']);

const validateCredential = () => {
    emit('validate-credentials', { username: username.value, password: password.value });
};
</script>
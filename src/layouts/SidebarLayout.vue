<template>
    <div class="sidebarComponent">
        <div id="side-bar" class="sidebar h-full flex flex-col text-sm pt-3"
            :class="dataOpenSideBar == true ? 'side-bar-visible' : 'side-bar-close'">
            <div class="w-full px-3 pt-5 pb-8 relative">
                <div class="w-full">
                    <div class="flex justify-center items-center">
                        <img src="../assets/login/logo_precisogps.png" alt="" class="w-[8rem] rounded-md">
                    </div>
                    <!-- <span class="md:hidden lg:block title_empresa text-center pt-3"> {{ empresa }} </span> -->
                </div>
                <div class="lg:flex lg:justify-end lg:items-center py-5 text-blue-600 open_close_sidebar md:hidden"
                    @click="clickHambuger">
                    <i class="fa-solid fa-circle-arrow-left fa-2xl cursor-pointer"></i>
                </div>
            </div>
            <nav class="nav overflow-y-auto h-full">
                <NavItem class="p-2 py-2" :item="item" v-for="item in navItems" :key="item.label"
                    :expandido="dataOpenSideBar" />
            </nav>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import NavItem from '@/components/generales/NavItem.vue';

export default {
    props: {
        dataOpenSideBar: Boolean,
        clickHambuger: Function,
    },
    components: { NavItem },
    setup() {
        const navItems = ref([]);
        navItems.value = [
            {
                to: "/home",
                label: "Inicio",
                children: [],
                icon: "mdi mdi-home"
            },
            {
                to: "/route",
                label: "Rutas",
                children: [],
                icon: "mdi mdi-road-variant"
            },
            {
                to: "/stop",
                label: "Paradas",
                children: [],
                icon: "mdi mdi-map-marker"
            },
            {
                to: "/driver",
                label: "Conductores",
                children: [],
                icon: "mdi mdi-card-account-details"
            },
            {
                to: "/dispatch",
                label: "Despachos",
                children: [],
                icon: "mdi mdi-office-building"
            },
            {
                to: "/bus",
                label: "Buses",
                children: [],
                icon: "mdi mdi-truck"
            }


        ]
        return { navItems };
    },
}
</script>
<style lang="scss">
.sidebarComponent {
    max-height: 100vh;
    box-shadow: 1px 0px 5px 1px rgba(117, 117, 117, 0.09);
    background-color: #ffffff; // Fondo blanco para un look limpio
}

.open_close_sidebar i {
    color: #ec2121; // Rojo para la flecha en su estado normal
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
        color: #ffcd00; // Cambia a amarillo en hover
    }
}

.sidebar {
    background-color: #ffffff; // Fondo blanco
    color: #333333; // Texto en gris oscuro
    overflow: hidden;
    transition: 300ms;

    .button-link span {
        transition: all 0.3s;
    }

    .btn-logout {
        background-color: #ec2121; // Rojo para el botón de logout
        color: #ffffff;
        transition: all 0.5s;

        &:hover {
            background-color: #ffcd00; // Cambia a amarillo en hover
            color: #333333;
        }
    }

    .button-link {
        color: #333333;
        font-weight: 500;

        &.router-link-exact-active {
            color: #ec2121 !important; // Rojo para enlaces activos

            i {
                color: #ec2121 !important;
            }
        }
    }
}

.side-bar-visible {
    width: 230px !important;
    min-width: 230px !important;

    .open_close_sidebar {
        position: fixed;
        top: 2.6rem;
        left: 215px;
        height: 25px;
        z-index: 9999;
        transition: 300ms;
    }

    .title_empresa {
        display: block;
        font-size: 17px;
        font-weight: 500;
        color: #ec2121; // Rojo para el título de la empresa
    }
}

.side-bar-close {
    width: 70px !important;
    min-width: 70px !important;

    .title_empresa {
        display: none;
    }

    .open_close_sidebar {
        position: fixed;
        top: 2.6rem;
        left: 55px;
        height: 25px;
        z-index: 9999;
        transform: rotate(180deg);
        color: #ec2121;
        transition: 300ms;

        &:hover {
            color: #ffcd00; // Amarillo en hover
        }
    }

    .button-link {
        justify-content: center;

        i {
            color: #ffcd00; // Íconos en amarillo para dar contraste
            font-size: 19px;
        }

        &.router-link-exact-active {
            color: #ec2121 !important;

            i {
                color: #ec2121 !important; // Ícono en rojo cuando está activo
            }
        }
    }

    .button-link span {
        display: none;
    }
}
</style>
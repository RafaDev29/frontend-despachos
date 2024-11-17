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
<style>
.sidebarComponent {
    max-height: 100vh;
    box-shadow: 1px 0px 5px 1px rgba(117, 117, 117, 0.09);
    background-color: #ffffff;
}

.open_close_sidebar i {
    color: #ec2121;
    transition: color 0.3s ease, transform 0.3s ease;
}

.open_close_sidebar i:hover {
    color: #ffcd00;
}

.sidebar {
    background-color: #ffffff;
    color: #333333;
    overflow: hidden;
    transition: 300ms;
}

.sidebar .button-link span {
    transition: all 0.3s;
}

.sidebar .btn-logout {
    background-color: #ec2121;
    color: #ffffff;
    transition: all 0.5s;
}

.sidebar .btn-logout:hover {
    background-color: #ffcd00;
    color: #333333;
}

.sidebar .button-link {
    color: #333333;
    font-weight: 500;
}

.sidebar .button-link.router-link-exact-active {
    color: #ec2121 !important;
}

.sidebar .button-link.router-link-exact-active i {
    color: #ec2121 !important;
}

.side-bar-visible {
    width: 230px !important;
    min-width: 230px !important;
}

.side-bar-visible .open_close_sidebar {
    position: fixed;
    top: 2.6rem;
    left: 215px;
    height: 25px;
    z-index: 9999;
    transition: 300ms;
}

.side-bar-visible .title_empresa {
    display: block;
    font-size: 17px;
    font-weight: 500;
    color: #ec2121;
}

.side-bar-close {
    width: 70px !important;
    min-width: 70px !important;
}

.side-bar-close .title_empresa {
    display: none;
}

.side-bar-close .open_close_sidebar {
    position: fixed;
    top: 2.6rem;
    left: 55px;
    height: 25px;
    z-index: 9999;
    transform: rotate(180deg);
    color: #ec2121;
    transition: 300ms;
}

.side-bar-close .open_close_sidebar:hover {
    color: #ffcd00;
}

.side-bar-close .button-link {
    justify-content: center;
}

.side-bar-close .button-link i {
    color: #ffcd00;
    font-size: 19px;
}

.side-bar-close .button-link.router-link-exact-active {
    color: #ec2121 !important;
}

.side-bar-close .button-link.router-link-exact-active i {
    color: #ec2121 !important;
}

.side-bar-close .button-link span {
    display: none;
}
</style>

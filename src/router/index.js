import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            meta: {
                title: "Home",
                requiresAuth: true
            },
            path: "/",
            component: () => import("@/layouts/MasterLayout.vue"),
            children: [
                {
                    name: "home",
                    path: "home",
                    component: () => import("@/views/HomeView.vue"),
                },

                {
                    name: "route",
                    path: "route",
                    component: () => import("@/views/RoutesView.vue"),
                },

                {
                    name: "stop",
                    path: "stop",
                    component: () => import("@/views/StopsView.vue"),
                },
                {
                    name: "driver",
                    path: "driver",
                    component: () => import("@/views/DriversView.vue"),
                },
                {
                    name:"bus",
                    path:"bus",
                    component:()=> import("@/views/BusesView.vue")
                },
                {
                    name:"dispatch",
                    path:"dispatch",
                    component:()=> import("@/views/DispatchView.vue")
                }


                



            ]
        },
        {
            meta: {
                title: "Login"
            },
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue")
        },
    ]
})
// Navigation Guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.state.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a la página de inicio de sesión
        next({ name: 'login' });
    } else if (to.name === 'login' && store.state.isAuthenticated) {
        next({ name: 'home' });
    } else if (to.path === '/' && store.state.isAuthenticated) {
        next({ name: 'home' });
    } else {
        next();
    }

});
export default router;



import appsusApp from "./pages/appsus-app.cmp.js";
import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import mailApp from './apps/mail/pages/mail-app.cmp.js';
import bookApp from './apps/book/pages/book-app.cmp.js';
import keepApp from './apps/keep/pages/keep-app.cmp.js';



const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/book',
        component: bookApp
    },

];
export const router = new VueRouter({ routes });
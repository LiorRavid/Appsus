import appsusApp from "./pages/appsus-app.cmp.js";
import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import mailApp from './apps/mail/pages/mail-app.cmp.js';
import bookApp from './apps/book/pages/book-app.cmp.js';
import keepApp from './apps/keep/pages/keep-app.cmp.js';
import mailDetails from '../js/apps/mail/pages/mail-details.cmp.js';
import mailCompose from '../js/apps/mail/pages/mail-compose.cmp.js';



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
        component: mailApp,
        
    },
    {
        path: '/mail/new',
        component: mailCompose,
    },
    {
        path: '/mail/:mailId',
        component: mailDetails,
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
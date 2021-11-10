import { router } from './routes.js';
import userMsg from './cmps/user-msg.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
import appHeader from './cmps/app-header.cmp.js';

const options = {
    el: '#app',
    router,
    template: `
        <section class="main-app-container">
            <user-msg />
            <app-header />
             <router-view  class="app-main-layout"/>
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        appFooter,
        userMsg
    }
};

new Vue(options);
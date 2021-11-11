export default {
    template: `
        <header class="app-header">
            <section class="app-header-section flex justify-between align-center">
                <div class="logo"><router-link to="/">APPSUS</router-link></div>
                <div @click="onMainMenu" class="btn-main-menu"></div>
            </section>
            <nav v-if="showMenu">
                    
                    <ul class="appsus-menu-list clean-list">
                        <li class="menu-link-book" @click="showMenu=false">
                        <router-link  to="/book">book</router-link>
                        </li>
                        <li class="menu-link-keep" @click="showMenu=false">
                        <router-link to="/keep">keep</router-link>
                        </li>
                        <li class="menu-link-mail" @click="showMenu=false">
                        <router-link to="/mail">mail</router-link>
                        </li>
                        <li class="menu-link-about" @click="showMenu=false">
                        <router-link to="/about">about</router-link>
                        </li>
                    </ul>
            </nav>
           
        </header>
    `,
    data() {
        return {
            showMenu: false
        }

    },
    methods: {
        onMainMenu() {
            this.showMenu = !this.showMenu;
        },

    }
}
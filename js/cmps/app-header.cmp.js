export default {
    template: `
        <header class="app-header">
            <section class="app-header-section flex justify-between align-center">
                <div class="logo"><router-link to="/">APPSUS</router-link></div>
                <div @click="onMainMenu" class="btn-main-menu"></div>
            </section>
            <nav v-if="showMenu">
                    
                    <ul class="appsus-menu-list clean-list">
                        <li  @click="showMenu=false">
                        <router-link  to="/book"><span class="menu-link-book"></span><div>Book</div></router-link>
                        
                        </li>
                        <li  @click="showMenu=false">
                        <router-link  to="/keep"><span class="menu-link-keep"></span><div>Keep</div></router-link>
                        
                        </li>
                        <li  @click="showMenu=false">
                        <router-link  to="/mail"><span class="menu-link-mail"></span><div>Mail</div></router-link>
                        
                        </li>
                        <li @click="showMenu=false">
                        <router-link   to="/about"><span class="menu-link-about"></span><div>About</div></router-link>
                        
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
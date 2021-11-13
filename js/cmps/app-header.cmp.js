export default {
    template: `
        <header class="app-header">
            <section class="app-header-section flex justify-between align-center">
                <div class="logo" >
                    <span @click="moveLogo(' ')">
                    <router-link to="/">APPSUS></router-link></span>
                    <div >{{header}}</div>
                </div>
                <div @click="onMainMenu" class="btn-main-menu"></div>
            </section>
            <transition name="fade">
            <nav v-if="showMenu">
                    
                    <ul class="appsus-menu-list clean-list">
                        <li  @click="moveLogo('book')">
                        <router-link  to="/book"><span  class="menu-link-book"></span><div>Book</div></router-link>
                        
                        </li>
                        <li  @click="moveLogo('keep')">
                        <router-link  to="/keep"><span class="menu-link-keep"></span><div>Keep</div></router-link>
                        
                        </li>
                        <li  @click="moveLogo('mail')">
                        <router-link  to="/mail"><span class="menu-link-mail"></span><div>Mail</div></router-link>
                        
                        </li>
                        <li @click="moveLogo('about')">
                        <router-link   to="/about"><span class="menu-link-about"></span><div>About</div></router-link>
                        
                        </li>
                    </ul>
            </nav>
            </transition>
        </header>
    `,
    data() {
        return {
            showMenu: false,
            header: ''
        }

    },
    methods: {
        onMainMenu() {
            this.showMenu = !this.showMenu;
        },
        moveLogo(page) {
            this.showMenu = false;
            this.header = page;
        }
    },
    // watch: {
    //     '$route.params.path': {
    //         immediate: true,
    //         handler(old, newer) {
    //             console.log('', newer);
    //             this.header = newer;
    //         }
    // }
    //     }

}
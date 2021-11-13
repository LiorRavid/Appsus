import { mailService } from '../services/mail.service.js';

export default {
    template: `
        <section v-if="mail" class="mail-details mail-layout mail-app">
            <div class="mail-layout">
                    <div class="side-bar">
                        <router-link class="compose" to="/mail/new">
                            <div class="btn-compose"></div>
                            &nbsp;Compose
                        </router-link>
                        <div class="folders">
                            <ul class="folder-list">
                                <li class="li" >
                                    <router-link class="btn-inbox" to="/mail">Inbox</router-link>
                                </li>
                                <li class="li-sent">
                                    <router-link class="btn-sent" to="/mail">Sent Mails</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                <div class="details">
                    <header class = "mail-header">
                        <div class = "h3">
                            <h3>{{mail.subject}}</h3>
                        </div>
                        <div class = 'btns-details'>
                            <div class="btn-back" @click.stop="backToMails"></div>
                            <div class="btn-Keep"></div>
                            <div class="btn-trash" @click.stop="removeMail(mail.id)"></div>
                        </div>
                    </header>
                    <div class="sub-header-details">
                        <h4>{{nameOfMailSend}}</h4>
                        <p><{{mail.from}}></p>
                    </div>
                    <p class="mail-body">{{mail.body}}</p>
                    <!-- <button @click="sayAndClose" >X</button> -->
                    <!-- <router-link :to="'/car/'+nextCarId">Next car ></router-link> -->
                </div>
            </div>
        </section>
        <!-- <section v-else class="loader app-main">
            <h2>Loading...</h2>
        </section> -->
    `,
    data() {
        return {
            mail: null,
            // nextMailId: null
        };
    },
    created() {
        const mailId = this.$route.params.mailId
        mailService.getById(mailId)
                    .then(mail => this.mail = mail); 
    },
    methods: {
        // sayAndClose() {
        //     console.log('Just saying');
        //     this.$router.push('/male');
        // }
        removeMail(id) {
            mailService.remove(id)
                .then(this.loadMails);
            this.$router.push('/mail')
        },
        backToMails(){
            this.$router.push('/mail')
        }
    },
    computed: {
        nameOfMailSend(){
            console.log('this.mail',this.mail.from);
            const name = this.mail.from.split('@')
            return name[0]
        },
    },
    // watch: {
    //     '$route.params.carId': {
    //         handler() {
    //             const { carId } = this.$route.params;
    //             carService.getById(carId)
    //                 .then(car => this.car = car);
    //             carService.getNextCarId(carId)
    //                 .then(carId => this.nextCarId = carId);
    //         },
    //         immediate: true
    //     }
    // }
};
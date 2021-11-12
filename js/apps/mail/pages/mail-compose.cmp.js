import { mailService } from '../services/mail.service.js';

export default {
    template: `
       <section class=" mail-app mail-details mail-layout mail-app">
            <div class="mail-layout">
                    <div class="side-bar">
                        <div class="compose">
                            <div class="btn-compose"></div>
                            &nbsp;Compose
                        </div>
                        <div class="folders">
                            <ul class="folder-list">
                                <li>Inbox</li>
                                <li>Starred</li>
                                <li>Sent Mails</li>
                                <li>Drafts</li>
                            </ul>
                        </div>
                    </div>
                    <form  class='new-mail' action="" @submit="sendMail">
                        <div class="new-header">
                            <h3>New Message</h3>
                        </div>
                        <div class="new-mail-box">
                            <p>To:</p>
                            <input v-model.lazy="mailTo" type="email" requierd>
                        </div>
                        <div class="new-mail-box">
                            <p>Subject:</p>
                            <input v-model.lazy="subject" type="text" requierd>
                        </div>
                        <div class="mail-text">
                        <textarea  v-model.lazy="text" class="text-area" rows="infinity" style="width: 100%;height: 100%;" requierd></textarea>
                        </div>
                        <div class="btn-send flex">
                            <input class="submit" type="submit" value="Send">
                            <router-link class="btn-trash" to="/mail"></router-link>
                        </div>
                    </form>
            </div>
        </section>`,

        data(){
            return {
                mailTo:'',
                subject:'',
                text:'',
            }
        },

        methods:{
            sendMail(){
                const newMail = {
                    id:null,
                    subject: this.subject,
                    body: this.text,
                    isRead: false,
                    sentAt : Date.now(),
                    to: 'user@appsus.com',
                    from: this.mailTo,
                    isSent:true
                }
                mailService.save(newMail)
                .then(()=>this.$router.push('/mail'))
            },
        }
};
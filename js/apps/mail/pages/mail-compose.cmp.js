import { mailService } from '../services/mail.service.js';

export default {
    template: `
       <section class=" mail-app mail-details mail-layout mail-app">
            <div class="mail-layout">
                <div class="side-bar">
                        <router-link class="compose" to="/mail/new">
                            <div class="btn-compose"></div>
                            &nbsp;Compose
                        </router-link>
                        <div class="folders">
                            <ul class="folder-list">
                                <li class="li">
                                    <router-link class="btn-inbox" to="/mail">Inbox</router-link>
                                </li>
                                <li class="li-sent">
                                    <router-link class="btn-sent" to="/mail">Sent Mails</router-link>
                                </li>
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

    data() {
        return {
            mailTo: '',
            subject: '',
            text: '',
        }
    },
    created() {
        if (this.$route.query) {
            this.subject = this.$route.query.subject;
            this.text = this.$route.query.body;
            this.mailTo = this.$route.query.from;
        }
    },
    methods: {
        sendMail() {
            const newMail = {
                id: null,
                subject: this.subject,
                body: this.text,
                isRead: false,
                sentAt: Date.now(),
                to: 'user@appsus.com',
                from: this.mailTo,
                isSent: true
            }
            mailService.save(newMail)
                .then(() => this.$router.push('/mail'))
        },
    },
};
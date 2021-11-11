import { mailService } from '../services/mail.service.js';
// import { eventBus } from '../services/event-bus-service.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailFilter from './../cmps/mail-filter.cmp.js';
// import mailDetails from './mail-details.js';


export default {
    template: `  
        <section class="flex-grow flex-grow">
            <mail-filter @filtered="setFilter"/>  
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
                <mail-list :mails="mailsToShow" @remove = "removeMail" @selected = "selectMail" @unread = "isReaddMail"></mail-list> 
         <!-- :mails="mailsToShow" -->
            </div>
        </section>`,
    data() {
        return {
            mails: null,
            filterBy: null,
            selectedMail: null,
        }
    },
    created() {
        this.loadMails();
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => this.mails = mails);
        },
        selectMail(mail) {
            this.selectedMail = mail
        },
        // closeDetails() {
        //     this.selectedMail = null;
        // },
        removeMail(id) {
            mailService.remove(id)
                .then(this.loadMails);
        },
        isReaddMail(mail){
            mail.isRead = !mail.isRead
            mailService.save(mail)
                .then(this.loadMails)

        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        mailsToShow() {
            if (!this.filterBy) return this.mails;
            console.log('this.filterBy.isRead',this.filterBy.isRead);
            const searchStr = this.filterBy.search.toLowerCase()
            var isRead = (this.filterBy.isRead==='Read')?true : false
            const filterMail = this.mails.filter(mail => {
                if(this.filterBy.isRead==='All'){
                    return ((mail.subject.toLowerCase().includes(searchStr) || mail.body.toLowerCase().includes(searchStr) || mail.from.toLowerCase().includes(searchStr)))
                }else return ((mail.subject.toLowerCase().includes(searchStr) || mail.body.toLowerCase().includes(searchStr) || mail.from.toLowerCase().includes(searchStr)) && mail.isRead === isRead)
            })
            return filterMail;
        }
    },
    components: {
        mailList,
        mailFilter,
        // mailDetails,
    }
}
import { mailService } from '../services/mail.service.js';
import { eventBus } from './../../../services/event-bus-service.js'
import mailList from '../cmps/mail-list.cmp.js';
import mailFilter from './../cmps/mail-filter.cmp.js';
// import mailSort from './../cmps/mail-sort.cmp.js';
import percentageBar from './../cmps/percentage-bar.cmp.js'
// import mailDetails from './mail-details.js';


export default {
    template: `  
        <section class=" mail-app flex-grow flex-grow">
            <mail-filter @filtered="setFilter"/>
            <!-- <mail-sort @sorted="setSort"/>     -->
            <div class="mail-layout">
                <div class="side-bar">
                    <router-link class="compose" to="/mail/new">
                        <div class="btn-compose"></div>
                        &nbsp;Compose
                    </router-link>
                    <div class="folders">
                        <ul class="folder-list">
                            <div class="divside">
                                <li class="li" @click="setFilter('inbox')">
                                    <div class="btn-inbox">Inbox</div>
                                </li>
                                <!-- <li class="li">Starred</li> -->
                                <li class="li-sent" @click="setFilter('sent')">
                                    <div class="btn-sent">Sent Mails</div>
                                </li>
                            </div>
                            <!-- <li class="li">Drafts</li> -->
                            <li>
                                <percentage-bar :percBar="showPercentage" v-model="percentage"></percentage-bar>
                            </li>
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
            sortBy:null,
            selectedMail: null,
            percentage:null
        }
    },
    created() {
        this.loadMails();
    },

    methods: {
        loadMails() {
            mailService.query()
                .then(mails => {
                    this.mails = mails
                });
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
                .then(()=>{
                    this.loadMails()
                    eventBus.$emit('showPerc')
                })
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        // setSort(sortBy){
        //     this.sortBy = sortBy
        // }
    },
    computed: {
        mailsToShow() {
            if (!this.filterBy || this.filterBy==='inbox') return this.mails;
            if(this.filterBy==='sent'){
                const sentMails = this.mails.filter(mail => {
                    return mail.isSent===true
                })
                return sentMails
            }
            const searchStr = this.filterBy.search.toLowerCase()
            var isRead = (this.filterBy.isRead==='Read')?true : false
            const filterMail = this.mails.filter(mail => {
                if(this.filterBy.isRead==='All'){
                    return ((mail.subject.toLowerCase().includes(searchStr) || mail.body.toLowerCase().includes(searchStr) || mail.from.toLowerCase().includes(searchStr)))
                }else return ((mail.subject.toLowerCase().includes(searchStr) || mail.body.toLowerCase().includes(searchStr) || mail.from.toLowerCase().includes(searchStr)) && mail.isRead === isRead)
            })
            return filterMail;
        },
        showPercentage(){
            mailService.readPercentage()
                .then(result =>{
                    this.percentage = Math.floor(result)
                })
                
            return this.percentage
        },
    },
    components: {
        mailList,
        mailFilter,
        // mailSort,
        percentageBar
        // mailDetails,
    }
}
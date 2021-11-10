import { mailService } from '../services/mail.service.js';
// import { eventBus } from '../services/event-bus-service.js';
import mailList from '../cmps/mail-list.cmp.js';
// import mailFilter from '../cmps/mail-filter.js';
// import mailDetails from './mail-details.js';


export default {
    template: `
        <!-- <mail-filter @filtered="setFilter"/>     -->
        <section class="flex-grow flex-grow">
        <mail-list :mails="mails" @remove = "removeMail"></mail-list> 
        <!-- :mails="mailsToShow" -->
        <!-- <mail-details v-if="selectedMail" :book="selectedMail" @close="closeMail"/> -->
        </section>`,
    data() {
        return {
            mails: null,
            filterBy: null,
            // selectedMail: null,
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
        // selectMails(mail) {
        //     this.selectedMail = mail
        // },
        // closeDetails() {
        //     this.selectedMail = null;
        // },
        removeMail(id) {
            mailService.remove(id)
                .then(this.loadMails);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        // booksToShow() {
        //     if (!this.filterBy) return this.books;

        //     const searchStr = this.filterBy.title.toLowerCase();
        //     const minPrice = (this.filterBy.minPrice) ? this.filterBy.minPrice : 0
        //     const maxPrice = (this.filterBy.maxPrice) ? this.filterBy.maxPrice : Infinity

        //     const filterBook = this.books.filter(book => {
        //         return book.title.toLowerCase().includes(searchStr) && book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice
        //     })
        //     return filterBook;
        // }
    },
    components: {
        mailList,
        // mailFilter,
        // mailDetails,
    }
}
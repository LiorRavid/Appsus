
export default {
    props: ['mail'],
    template: `
    <div class="mail-preview" :class="shadow" @mouseover="mouseover" @mouseleave="mouseleave">
        <p :class="bold"> {{nameOfMailSend}} </p>
        <p :class="bold"> {{mail.subject}}</p> 
        <p v-show="!isHover" :class="bold"> {{mailDate}}</p>
        <div class = "btns-mail-preview" v-show="isHover">
            <div :class="readUnread" @click.stop = "unread(mail)"></div>
            <div class="btn-trash" @click.stop="removePreview(mail.id)"></div>
        </div> 
    </div>`,

    data() {
        return {
            isHover:false,
            isRead: this.mail.isRead,
        }
    },
    methods: {
        mouseover(){
            return this.isHover = true
        },
        mouseleave(){
            return this.isHover = false 
        },
        removePreview(mailId) {
            this.$emit('removePreview', mailId);
        },
        unread(mail){
            this.$emit('readUnread', mail)
            // if(mail.isRead)return this.isRead=mail.isRead
            return this.isRead = !this.isRead
        },

    },
    computed: {
        nameOfMailSend(){
            const name = this.mail.from.split('@')
            return name[0]
        },
        shadow(){
            return {hover: this.isHover} 
        },
        bold(){
            return {bold: this.isRead === false}
        },
        readUnread(){
            return {read: this.isRead === true, unread: this.isRead === false }
        },
        mailDate(){
            const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            const date = new Date(this.mail.sentAt)
            console.log('date',date);
            return monthNames[date.getMonth()] + ' ' + date.getDate() 
        }
    },
}
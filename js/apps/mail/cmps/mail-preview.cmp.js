
export default {
    props: ['mail'],
    template: `
    <div class="mail-preview" :class="shadow"  @click="clicked" @mouseover="mouseover" @mouseleave="mouseleave">
        <p :class="bold"> {{nameOfMailSend}} </p>
        <p :class="bold"> {{mail.subject}}</p> 
        <p v-show="!isHover" :class="bold"> {{mailDate}}</p>
        <div class = "btns-mail-preview" v-show="isHover">
            <div :class="readUnread" @click = "unread"></div>
            <div class="btn-trash" @click="removePreview(mail.id)"></div>
        </div> 
    </div>`,

    data() {
        return {
            isHover:false,
            isRead:false,
            isClicked: false
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
        unread(){
        return this.isRead = !this.isRead
        },
        clicked(){
            return this.isClicked = !this.isClicked 
        }
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
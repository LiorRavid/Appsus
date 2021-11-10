    
export default {
    props: ['mail'],
    template: `
        <section v-show = "isClicked">
            <header class = "mail-header">
                <div class = "h3">
                    <h3></h3>
                </div>
                <div class = 'btns-long-preview'>
                    <div class="btn-full-mail" @click="fullMail(mail.id)"></div>
                    <div class="btn-trash" @click="removePreview(mail.id)"></div>
                </div>
            </header>
            <div class="sub-header">
                <h4>{{nameOfMailSend}}</h4>
                <p><{{mail.from}}></p>
            </div>
            <p>{{descriptionText}}</p>
            <p>Description: {{descriptionText}}</p>
            <button v-if="!isFullLength" @click="isReadMore = true">Read More</button>
        </section>`,

    data() {
        return {
            isReadMore: false
        }
    },
    methods:{
        removePreview(mailId) {
            this.$emit('removePreview', mailId);
        },
    },
    computed: {
        descriptionText() {
            var text = this.mail.body
            if (text.length > 100 && !this.isReadMore) return text.slice(0,100) + "..." 
            else return text
        },
        isFullLength() {
            return this.description.length < 100
        },
        nameOfMailSend(){
            const name = this.mail.from.split('@')
            return name[0]
        },

    },
}
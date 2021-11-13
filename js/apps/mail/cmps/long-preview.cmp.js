    
export default {
    props: ['mail'],
    template: `
        <section class = "long-preview">
            <header class = "mail-header">
                <div class = "h3">
                    <h3>{{mail.subject}}</h3>
                </div>
                <div class = 'btns-long-preview'>
                    <router-link  :to = "'/mail/' + mail.id" class="btn-full-mail" ></router-link>
                    <div class="btn-trash" @click.stop="removeLongPreview(mail.id)"></div>
                </div>
            </header>
            <div class="sub-header-preview">
                <h4>{{nameOfMailSend}}</h4>
                <p><{{mail.from}}></p>
            </div>
            <p class = "preview-txt">{{descriptionText}}</p>
        </section>`,

    data() {
        return {
            isReadMore: false
        }
    },
    methods:{
        removeLongPreview(mailId) {
            this.$emit('removeLongPreview', mailId);
        },
        // fullMail(mailId){
        //     this.$emit('fullMail', mailId);
        // },
    },
    computed: {
        descriptionText() {
            var text = this.mail.body
            return text.slice(0,100) + "..." 
        },
        nameOfMailSend(){
            const name = this.mail.from.split('@')
            return name[0]
        },

    },
}
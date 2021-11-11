import mailPreview from "./mail-preview.cmp.js"
import longPreview from "./long-preview.cmp.js"

export default {
    props: ['mails'],
    template: `
       <ul class="mail-list">
            <li v-for="mail in mails" :key="mail.id" class="mail-preview-container" >
                <div @click="selected(mail)">
                    <mail-preview :class="{grey: mail.id===selectedId}" :mail="mail"  @removePreview = "remove" />
                    <long-preview v-show = "mail.id===selectedId" :mail = "mail" @removeLongPreview = "remove"/> 
                </div>
            </li>
        </ul>
    `,
    data(){
        return {
            selectedId: null
        }
    },
    methods: {
        selected(mail) {
            if(mail.id === this.selectedId){
                this.selectedId=null
            }else {
                this.selectedId = mail.id
            }
            this.$emit('selected', mail);
        },
        remove(mailId) {
            this.$emit('remove', mailId);
        },
    },
    computed: {
        changeColor(){
            return {grey: this.selectedId}
        }
    },
    components:{
        mailPreview,
        longPreview
    }
}
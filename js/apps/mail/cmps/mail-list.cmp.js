import mailPreview from "./mail-preview.cmp.js"
import longPreview from "./long-preview.cmp.js"

export default {
    props: ['mails'],
    template: `
       <ul class="mail-list">
            <li v-for="mail in mails" :key="mail.id" class="mail-preview-container" >
                <mail-preview :mail="mail" @click="selected(mail)" @removePreview = "remove"/>
                <long-preview v-show = "isClicked" :mail = "mail"/> 
            </li>
        </ul>
    `,
    methods: {
        selected(mail) {
            this.$emit('selected', mail);
        },
        remove(mailId) {
            this.$emit('remove', mailId);
        },
    },
    components:{
        mailPreview,
        longPreview
    }
}
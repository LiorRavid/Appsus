export default {
    props: ['note'],
    template: `
        <div class="note-preview">
            <p>{{note.info.title}}</p>
            <img :src="note.info.url" alt="">
        </div>
    `,
    data() {

    },


};
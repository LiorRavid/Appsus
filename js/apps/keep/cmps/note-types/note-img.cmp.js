export default {
    props: ['note'],
    template: `
        <div>
            <h3>{{note.info.title}}</h3>
            <img :src="note.info.url" alt="">
        </div>
    `,
    data() {

    },


};
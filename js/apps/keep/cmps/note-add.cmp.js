import { noteService } from '../services/note-service.js';
export default {
    template: `
        <section class="note-add flex justify-center">
            <div>
                <form @submit.prevent="onAddNote(chosenNoteType)">
                    <input type="text" v-model="value" :placeHolder="placeHolder">
                </form>
                    <button class="btn-note-txt btn-note" @click="onChooseNoteType($event,'Whats on your mind?','note-txt') "></button>
                    <button class="btn-note-video btn-note" @click="onChooseNoteType($event,'Enter video URL...','note-video')"></button>
                    <button class="btn-note-img btn-note" @click="onChooseNoteType($event,'Enter image URL...','note-img')"></button>
                    <button class="btn-note-todos btn-note" @click="onChooseNoteType($event,'Enter comma separeted list','note-todos')"></button>
             </div>   
        </section>
    `,
    data() {
        return {
            placeHolder: 'Whats on your mind?',
            chosenNoteType: 'note-txt',
            value: null,
            x: null,
        }
    },
    computed: {
        makeTodo() {
            let list = this.value.split(',');
            return list.map(item => {
                return { txt: item, isChecked: false };
            });

        }

    },
    created() {


        if (this.$route.query.from) {
            this.value = `${this.$route.query.from}|
              ${this.$route.query.subject}|
            ${this.$route.query.body}
            `;
            this.onAddNote('note-txt');
        }
        this.$router.push('/keep');

    },
    methods: {
        onChooseNoteType(ev, placeHolder, type) {
            ev.stopPropogations;
            console.log('now,', type);
            this.placeHolder = placeHolder;
            this.chosenNoteType = type;
        },
        onAddNote(type) {
            console.log(type);
            if (type === 'note-todos') {
                this.value = this.makeTodo;
                console.log('', this.value);
            }
            noteService.addNote(type, this.value).then(note => {

                console.log(this.$route)
                this.$emit('addedNote');
                this.value = '';
            });
        },
    }
}
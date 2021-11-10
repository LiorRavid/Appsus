import { noteService } from '../services/note-service.js';
export default {
    template: `
        <section class="note-add">
            <div>
                <form @submit.prevent="onAddNote($event,chosenNoteType)">
                    <input type="text" v-model="value" :placeHolder="placeHolder">
                </form>
                    <button @click="onChooseNoteType($event,'Whats on your mind?','note-txt') ">text</button>
                    <button @click="onChooseNoteType($event,'Enter video URL...','note-video')">video</button>
                    <button @click="onChooseNoteType($event,'Enter image URL...','note-img')">image</button>
                    <button @click="onChooseNoteType($event,'Enter comma separeted list','note-todos')">todo</button>
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

    methods: {
        onChooseNoteType(ev, placeHolder, type) {
            ev.stopPropogations;
            console.log('now,', type);
            this.placeHolder = placeHolder;
            this.chosenNoteType = type;
        },
        onAddNote(ev, type) {
            console.log(type);
            if (type === 'note-todos') {
                this.value = this.makeTodo;
                console.log('', this.value);
            }
            noteService.addNote(type, this.value).then(note => this.$emit('addedNote'));
        },
    }
}
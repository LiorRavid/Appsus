import { noteService } from './../services/note-service.js';
import noteEditTools from './../cmps/note-edit-tools.cmp.js'
export default {
    template: `
        <section class="note-details">
           <router-link to="/keep"> <div class="modal-background"></div></router-link>
            <div :style="note.style"  class="note-details-modal">
                <button class="btn-note-detail-close btn-note " @click="closeDetails" ></button>
                <input type="text" placeholder="Title" v-model="inputs.title">
                <textarea v-model="inputs['note-txt']" v-show="findType==='note-txt'"  name="" id="" cols="30" rows="10"></textarea>
                <div v-show="findType==='note-img'">
                <img class="edit-note-img" :src="note.info.url" alt="">
                <input v-model="inputs['note-img']" type="text">
                </div>
                <div v-if="findType==='note-todos'" class="edit-todos">
                    <button class="btn-edit-add-todo btn-note" @click="addTodoInput"></button>
                <ul class="clean-list" >
                    <li v-for="(todo,index) in this.note.info.todos">
                        <input type="checkbox"  v-model="inputs['note-todos'][index].isChecked">
                        <input type="text" v-model="inputs['note-todos'][index].txt" >
                    </li>
                </ul></div>
                <div v-if="findType==='note-video'">
                    <iframe  :src="embedded" alt=""></iframe>
                    <input   v-model="inputs['note-video']" type="text">
                </div>
                <div class="edit-bar flex justify-between">
                <note-edit-tools @noteEdited="updatedMainApp" :note="note"></note-edit-tools>
                <button class="btn-note-detail-save btn-note " @click="save"></button>
            </div>
       
    </div>
   </section>
    `,
    data() {
        return {
            note: null,
            inputs: {
                title: '',
                'note-txt': '',
                'note-video': '',
                'note-img': '',
                'note-todos': [],
            },
        }
    },
    created() {
        const { noteId } = this.$route.params;
        noteService.getById(noteId)
            .then(note => {
                this.note = note;
                console.log('', this.$route.params);
            });
    },
    computed: {
        findType() {
            return this.note.type;
        },
        embedded() {
            if (((this.note.info.url).toLowerCase()).includes('watch')) {
                let idx = this.note.info.url.indexOf('v=');
                let str = this.note.info.url.substring(idx + 2);
                return 'https://www.youtube.com/embed/' + str;
            }
        }
    },


    methods: {

        addTodoInput() {
            this.inputs['note-todos'].push({ txt: '', isChecked: false });

        },
        save() {
            const currNote = this.note;
            this.note.info.title = this.inputs.title;
            console.log('', this.type);
            if (this.note.type === 'note-txt') this.note.info.txt = this.inputs['note-txt'];
            else if (this.note.type === 'note-img') this.note.info.url = this.inputs['note-img'];
            else if (this.note.type === 'note-video') this.note.info.url = this.inputs['note-video'];
            else if (this.note.type === 'note-todos') {
                this.inputs['note-todos'] = this.inputs['note-todos'].filter(todo => todo.txt !== '');
                this.note.info.todos = this.inputs['note-todos'];
            }


            noteService.edit(this.note)
                .then(() => {
                    this.updatedMainApp();
                    this.$router.push('/keep');
                });

        },
        closeDetails() {
            this.$router.push('/keep');
        },
        updatedMainApp() {
            this.$emit('noteEdited');
        }
    },
    watch: {
        '$route.params.noteId': {
            immediate: true,
            handler() {
                const { noteId } = this.$route.params;
                noteService.getById(noteId)
                    .then(note => this.note = note);
            }
        }
    },
    mounted() {
        console.log('', this.note);
        setTimeout(() => {
            this.inputs.title = this.note.info.title;
            if (this.note.type === 'note-txt') this.inputs[this.note.type] = this.note.info.txt;
            if (this.note.type === 'note-video') this.inputs[this.note.type] = this.note.info.url;
            if (this.note.type === 'note-img') this.inputs[this.note.type] = this.note.info.url;
            if (this.note.type === 'note-todos') {
                this.inputs[this.note.type] = this.note.info.todos;
                console.log(this.inputs['note-todos'][0]);
            }
        }, 150);
    },
    components: {
        noteEditTools,
    }
}
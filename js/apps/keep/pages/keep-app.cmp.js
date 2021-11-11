import noteAdd from '../cmps/note-add.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import { noteService } from '../services/note-service.js'

export default {
    template: `
        <section class="keep-app flex-grow">
            <h2>keep</h2>
            <div>
               <note-add @addedNote="loadNotes"></note-add>
               <note-list @updatePinnedStatus="updatePinned" @remove="removeNote" @changeColor="updateColor" :notes="notesToShow" @copy="copyNote"></note-list>
             </div>   
            
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        this.loadNotes();
    },
    computed: {
        notesToShow() {
            // console.log('hi')
            return this.notes;
        }
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes);
        },
        updateColor(id, color) {
            noteService.updateNoteStyle(id, 'background-color', color)
                .then(() => {
                    console.log('colorChanged');
                    this.loadNotes();
                });
        },
        removeNote(id) {
            noteService.remove(id)
                .then(() => {
                    console.log(id)
                        // const msg = {
                        //     txt: 'Deleted succesfully',
                        //     type: 'success'
                        // };
                        // eventBus.$emit('showMsg', msg);
                    this.notes = this.notes.filter(note => note.id !== id)
                })
                .catch(err => {
                    // console.log('err', err);
                    // const msg = {
                    //     txt: 'Error. Please try later',
                    //     type: 'error'
                    // };
                    // eventBus.$emit('showMsg', msg);
                });
        },
        updatePinned(isPinned, id) {
            noteService.updateNote(id, 'isPinned', isPinned)
                .then(() => {
                    console.log('yay', isPinned);
                    this.loadNotes();
                })
        },
        copyNote(note) {
            noteService.duplicateNote(note)
                .then(note => {
                    console.log('new', note)
                    this.loadNotes();
                });
        },
    },

    components: {
        noteAdd,
        noteList,
    }
}
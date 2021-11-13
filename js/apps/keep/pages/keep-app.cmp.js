import noteAdd from '../cmps/note-add.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteDetails from './note-details.cmp.js';
import { noteService } from '../services/note-service.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <section class="keep-app flex-grow">
            <div>
            
                <note-filter @filtered="setFilter"></note-filter>
               <note-add @addedNote="loadNotes"></note-add>
               <h3  v-if="pinnedNotes.length&&!filterBy||filterBy.type===''">Pinned</h3>
               <note-list class="min-height-ul-pinned" v-if="pinnedNotes.length||!filterBy||filterBy.type===''" @updatePinnedStatus="updatePinned" @remove="removeNote" @changeColor="updateColor" :notes="pinnedNotesToShow" :notePinnedSuccess="notePinnedSuccess" @copy="copyNote" @selected="selectNote"></note-list>
               <h3  v-if="pinnedNotes.length&&!filterBy||filterBy.type===''">Others</h3>
               <note-list class="min-height-ul" @updatePinnedStatus="updatePinned" @remove="removeNote" @changeColor="updateColor" :notes="notesToShow"  @copy="copyNote"></note-list>
               
               <!-- <note-details v-if="selectedNote" :note="selectedNote" @close="closeDetails" /> -->
             </div>  
             <transition name="fade"> 
            <router-view  @noteEdited="updatedMainApp"></router-view></transition> 
        </section>
    `,
    data() {
        return {
            notes: null,
            pinnedNotes: [],
            notePinnedSuccess: null,
            unPinnedNotes: [],
            filterBy: null,
            selectedNote: null,
            allNotesToDisplay: null,
        }
    },
    created() {
        this.loadNotes();
    },
    computed: {
        notesToShow() {
            // console.log('', this.filterBy);
            if (!this.filterBy || this.filterBy.type === '') return this.unPinnedNotes;
            const searchStr = this.filterBy.str.toLowerCase();
            // const searchTxt = this.filterBy.txt.toLowerCase();
            let searchScope = this.notes;
            if (this.filterBy.type === 'note-txt' || this.filterBy.type === 'note-img' || this.filterBy.type === 'note-video' || this.filterBy.type === 'note-todos') searchScope = this.findScope(this.filterBy.type);
            const notesToDisplay = searchScope.filter(note => {

                if (!note.info.txt && !note.info.url && !note.info.todos) return (note.info.title.toLowerCase().includes(searchStr));
                else if (note.info.url && !note.info.txt && !note.info.todos) {
                    return (note.info.title.toLowerCase().includes(searchStr) || note.info.url.toLowerCase().includes(searchStr))
                } else if (note.info.txt && !note.info.url && !note.info.todos) return (note.info.title.toLowerCase().includes(searchStr) || note.info.txt.toLowerCase().includes(searchStr))
                else if (!note.info.txt && !note.info.url && note.info.todos) {
                    const todoSearch = note.info.todos.some(todo => {
                        return (todo.txt.toLowerCase().includes(searchStr))
                    });
                    return todoSearch || note.info.title.toLowerCase().includes(searchStr);
                }

            });
            this.allNotesToDisplay = notesToDisplay;
            if (notesToDisplay || notesToDisplay === '') return notesToDisplay;
            else return this.unPinnedNotes;


        },
        pinnedNotesToShow() {
            return this.pinnedNotes;
        }

    },
    methods: {
        updatedMainApp() {
            this.loadNotes();
        },
        closeDetails() {
            this.selectedNote = null;
        },
        selectNote(note) {
            this.selectedNote = note;
        },
        findScope(type) {
            return this.notes.filter(note => {
                return (note.type === type)
            });
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes;
                    this.gatherPinnedNotes();
                    this.gatherUnPinnedNotes();
                });
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
                    const msg = {
                        txt: 'Deleted succesfully',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                    this.loadNotes();
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },
        updatePinned(isPinned, id) {
            noteService.updateNote(id, 'isPinned', isPinned)
                .then(() => {
                    console.log('yay', isPinned);
                    if (isPinned) this.notePinnedSuccess = id;
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
        gatherPinnedNotes() {
            const pinnedArr = this.notes.filter(note => {
                return (note.isPinned)
            });
            this.pinnedNotes = pinnedArr;
            console.log('', this.pinnedNotes);
        },
        gatherUnPinnedNotes() {
            const unPinnedArr = this.notes.filter(note => {
                return (!note.isPinned)
            });
            this.unPinnedNotes = unPinnedArr;
            console.log('', this.unPinnedNotes);
        },
    },

    components: {
        noteFilter,
        noteAdd,
        noteList,
        noteDetails,
        eventBus,
    }
}
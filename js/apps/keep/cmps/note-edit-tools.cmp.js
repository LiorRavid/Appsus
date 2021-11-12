import { noteService } from './../services/note-service.js'

export default {
    props: ['note'],
    template: `
    <section class="note-edit-tools flex">
                <button class="btn-note-delete btn-note" @click="remove(note.id)"></button>
                    <div class="btn-note-color btn-note"><span></span>
                        <div class="color-dropdown flex" >
                            <div v-for="n in 12" @click="updateColor(note.id,colors[n-1])" :style="{'background-color':colors[n-1]}" :value="colors[n-1]"></div>
                        </div>
                    </div>
                    
                    <button class="btn-note-copy btn-note" @click="copyNote(note)"></button>
                    
                    <!-- <router-link :to="'/keep/'+note.id"><button class="btn-note-edit btn-note"></button></router-link> -->
                    <button  class="btn-note-mail btn-note"></button>
                </section>
    `,
    data() {
        return {
            notes: null,
            colors: [
                '#ffffff', '#fff475', '#fbbc04', '#f28b82', '#aecbfa',
                '#cbf0f8', '#a7ffeb', '#ccff90', '#e8eaed', '#e6c9a8', '#fdcfe8', '#d7aefb'
            ],
        }
    },
    created() {
        this.loadNotes();
    },
    methods: {
        updateMainApp() {
            this.$emit('noteEdited');
        },
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes;
                });
        },
        changeColor(x) {
            this.$emit()
            console.log(x);
        },
        updateColor(id, color) {
            this.note.style['background-color'] = color;
            noteService.updateNoteStyle(id, 'background-color', color)
                .then(() => {
                    this.loadNotes();
                    this.updateMainApp();
                });
        },
        remove(id) {
            noteService.remove(id)
                .then(() => {
                    console.log(id)
                        // const msg = {
                        //     txt: 'Deleted succesfully',
                        //     type: 'success'
                        // };
                        // eventBus.$emit('showMsg', msg);

                    this.updateMainApp();
                    this.$router.push('/keep');


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
        copyNote(note) {
            noteService.duplicateNote(note)
                .then(note => {
                    console.log('new', note)
                    this.updateMainApp();
                });
        },
    }

}
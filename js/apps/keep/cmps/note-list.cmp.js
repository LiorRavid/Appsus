import notePreview from './note-preview.cmp.js'
export default {
    props: ['notes', 'notePinnedSuccess'],
    template: `
        <section class="note-list">
        <ul class="note-list-ul clean-list ">
            <li  v-for="note in notes" :class="{'pinned-notes':note.isPinned}" :key="note.id" class="note-preview-container" :style="{'background-color':note.style['background-color']}" >
                <button :class="{'show-btn':note.isPinned}" class="btn-note-pin btn-note" @click="checkPinnedNote(note.isPinned,note.id)"></button>
                <note-preview :note="note" ></note-preview>
                <section class="flex">
                    <button class="btn-note-delete btn-note"@click="remove(note.id) " ></button>
                    <div class="btn-note-color btn-note"><span></span>
                        <div class="color-dropdown flex" >
                            <div v-for="n in 12" @click="$emit('changeColor',note.id,colors[n-1])" :style="{'background-color':colors[n-1]}" :value="colors[n-1]"></div>
                        </div>
                    </div>
                    <button class="btn-note-copy btn-note" @click="$emit('copy',note)"></button>
                    <button class="btn-note-edit btn-note"></button>
                    <button  class="btn-note-mail btn-note"></button>
                </section>
            <!-- </div> -->
            </li>
        </ul>
       </section>
    `,
    data() {
        return {
            checkPinned: null,
            colors: [
                '#ffffff', '#fff475', '#fbbc04', '#f28b82', '#aecbfa',
                '#cbf0f8', '#a7ffeb', '#ccff90', '#e8eaed', '#e6c9a8', '#fdcfe8', '#d7aefb'
            ],

        }
    },
    created() {

    },
    methods: {
        changeColor(x) {
            this.$emit()
            console.log(x);
        },
        checkPinnedNote(isPinned, noteId) {
            this.checkPinned = isPinned;
            this.checkPinned = !this.checkPinned;
            this.$emit('updatePinnedStatus', this.checkPinned, noteId);
        },
        remove(noteId) {
            this.$emit('remove', noteId);
        },

    },
    components: {
        notePreview,
    },

}
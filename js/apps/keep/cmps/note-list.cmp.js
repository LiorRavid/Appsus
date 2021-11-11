import notePreview from './note-preview.cmp.js'
export default {
    props: ['notes'],
    template: `
        
        <ul class="note-list clean-list flex">
            <li v-for="note in notes" :key="note.id" class="note-preview-container" >
                <div>
                <note-preview :note="note"></note-preview>
                <button @click="remove(note.id)" >X</button></div>
            </li>
        </ul>
       
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId);
        },
    },
    components: {
        notePreview,
    },

}
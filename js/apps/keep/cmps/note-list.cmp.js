import notePreview from './note-preview.cmp.js'
export default {
    props: ['notes'],
    template: `
        <section class="note-list">
        <ul>
            <li v-for="note in notes" :key="note.id" class="note-preview-container" >
                <note-preview :note="note"></note-preview>
                <button @click="remove(note.id)" >X</button>
            </li>
        </ul>
        </section>
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
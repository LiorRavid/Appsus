import noteTodos from './note-types/note-todos.cmp.js';
import noteImg from './note-types/note-img.cmp.js';
import noteTxt from './note-types/note-txt.cmp.js';
import noteVideo from './note-types/note-video.cmp.js';

export default {
    props: ['note'],
    template: `
        <div class="note-preview">
            <component :note="note" :is="noteType">
            </component>
        </div>
    `,
    data() {
        return {
            noteType: this.note.type,
        }
    },
    components: {
        noteTodos,
        noteImg,
        noteTxt,
        noteVideo
    }

}
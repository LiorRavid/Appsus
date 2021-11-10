export default {
    props: ['note'],
    template: `
    <div class="note-preview">
        <p>{{note.info.title}}</p>
        <p>{{note.info.txt}}</p>
    </div>`
};
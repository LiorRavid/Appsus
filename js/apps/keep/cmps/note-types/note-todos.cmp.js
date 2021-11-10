export default {
    props: ['note'],
    template: `
<div class="note-preview">
    <p>{{note.info.title}}</p>
    <ul>
        <li v-for="todo in note.info.todos">
            <p>{{todo.txt}}</p>
        </li>
    </ul>
</div>`
};
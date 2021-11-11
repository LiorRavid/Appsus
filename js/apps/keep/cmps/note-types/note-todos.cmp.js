import { noteService } from './../../services/note-service.js'

export default {
    props: ['note'],
    template: `
<div >
    <h3>{{note.info.title}}</h3>
    <ul class="todos-container clean-list">
        <li v-for="(todo,i) in note.info.todos">
        <input  type="checkbox" v-model="todo.isChecked" :id="'todo'+note.id+i" :name="'todo'+note.id+i" 
        @change="updateCheck(i,todo)" >
         <label  :for="'todo'+note.id+i" :class="{checked:todo.isChecked}">{{todo.txt}}</label>
            
        </li>
    </ul>
</div>
`,
    date() {
        return {}
    },
    methods: {
        updateCheck(todoidx, todo) {
            noteService.updateNoteTodo(this.note, todoidx, todo.isChecked);
        }

    }
};
import { utilService } from './../../../services/util-service.js';
import { storageService } from './../../../services/async-storage-service.js';
const KEY = 'Notes'
const gNotes = _createNotes();
export const noteService = {
    query,
    remove,
    addNote,
    save,
    getById,
    updateNoteTodo,
    updateNote,
    updateNoteStyle,
    duplicateNote,
};

function duplicateNote(note) {
    let newNote = note;
    newNote.id = utilService.makeId();
    newNote.isPinned = false;
    return save(newNote);
}

function updateNoteTodo(note, todoIdx, value) {
    note.info.todos[todoIdx].isChecked = value;
    storageService.put(KEY, note);
}

function updateNote(noteId, property, value) {
    return getById(noteId).then(note => {
        note[property] = value;
        return storageService.put(KEY, note);
    });
}

function updateNoteStyle(noteId, property, value) {
    return getById(noteId).then(note => {
        note.style[property] = value;
        return storageService.put(KEY, note);
    });
}

function addNote(type, value) {
    let note = _createBasicNote(type);
    if (type === 'note-txt') note.info['txt'] = value;
    else if (type === 'note-video' || type === 'note-img') note.info['url'] = value;
    else if (type === 'note-todos') note.info['todos'] = value;
    return save(note);
}


function _createBasicNote(type) {
    return {
        id: utilService.makeId(),
        type: type,
        isPinned: false,
        info: {
            title: '',
        },
        style: {
            'background-color': 'white'
        },
        label: [],
    }
}

function query() {
    return storageService.query(KEY);
}

function remove(noteId) {
    return storageService.remove(KEY, noteId);
}



function save(note) {
    // if (note.id) return storageService.put(KEY, note);
    // else 
    return storageService.post(KEY, note);

}

function getById(noteId) {
    return storageService.get(KEY, noteId);
}

function _starterNotes() {
    return [{
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: true,
            info: {
                title: '',
                url: 'https://i.pinimg.com/originals/4f/b5/88/4fb5886838c0492fc4b0cee3de87b648.jpg'
            },
            style: { 'background-color': '#fff475' },
            label: [],
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: {
                title: '',
                txt: `
    if (brain! = empty) {
        keepCoding();
    } else {
        drinkCoffee();
    }
                `
            },
            style: { 'background-color': '#cbf0f8' },
            label: [],
        },
        {
            id: utilService.makeId(),
            type: 'note-video',
            isPinned: false,
            info: {
                title: 'Vue explained',
                url: 'https://www.youtube.com/watch?v=nhBVL41-_Cw'
            },
            style: { 'background-color': '#e6c9a8' },
            label: [],
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: {
                title: 'Sprint 3',
                txt: 'omg'
            },
            style: { 'background-color': '#e8eaed' },
            label: [],
        },
        {
            id: utilService.makeId(),
            type: 'note-todos',
            isPinned: false,
            info: {
                title: 'Sprint list so far',
                todos: [{ txt: 'minesweeper', isChecked: true }, { txt: 'memegen', isChecked: true }, { txt: 'appsus', isChecked: false }],
            },
            style: { 'background-color': '#ccff90' },
            label: [],
        },
        {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: false,
            info: {
                title: 'Me while sprint 3',
                url: 'https://media2.giphy.com/media/unQ3IJU2RG7DO/giphy.gif'
            },
            style: { 'background-color': '#aecbfa' },
            label: [],
        }
    ];
}

function _createNotes() {
    let notes = utilService.loadFromStorage(KEY);
    if (!notes || !notes.length) {
        notes = _starterNotes();

        utilService.saveToStorage(KEY, notes);
    }
    return notes;
}
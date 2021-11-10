import { utilService } from './../../../services/util-service.js';
import { storageService } from './../../../services/async-storage-service.js';
const KEY = 'Notes'
const gNotes = _createNotes();
export const noteService = {
    query,
    remove,
    addNote,
    save,
    getById
};


function addNote(type, value) {
    let note = _createBasicNote(type);
    if (type === 'note-txt') note.info['txt'] = value;
    if (type === 'note-video' || type === 'note-image') note.info['url'] = value;
    if (type === 'note-todos') note.info['todos'] = value;
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
            type: 'note-video',
            isPinned: false,
            info: {
                title: 'Vue explained',
                url: 'https://www.youtube.com/watch?v=nhBVL41-_Cw'
            },
            style: { 'background-color': 'yellow' },
            label: [],
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: {
                title: 'sprint3',
                txt: 'omg'
            },
            style: { 'background-color': 'blue' },
            label: [],
        },
        {
            id: utilService.makeId(),
            type: 'note-todos',
            isPinned: false,
            info: {
                title: 'sprint list so far',
                todos: [{ txt: 'minesweeper', isChecked: false }, { txt: 'memegen', isChecked: false }, { txt: 'appsus', isChecked: false }],
            },
            style: { 'background-color': 'pink' },
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
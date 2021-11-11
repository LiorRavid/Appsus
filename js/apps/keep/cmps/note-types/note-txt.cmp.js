export default {
    props: ['note'],
    template: `
    <div >
        <h3>{{note.info.title}}</h3>
        <pre>{{note.info.txt}}</pre>
    </div>`
};
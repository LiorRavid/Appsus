export default {
    props: ['note'],
    template: `
    <div >
        <h3>{{note.info.title}}</h3>
        <p>{{note.info.txt}}</p>
    </div>`
};
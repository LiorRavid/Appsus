export default {
    props: ['note'],
    template: `
<div class="note-preview">
    <p>{{note.info.title}}</p>
    <iframe width="200" height="150"
:src="embedded">
</iframe>
</div>`,
    computed: {
        embedded() {
            if (((this.note.info.url).toLowerCase()).includes('watch')) {
                let idx = this.note.info.url.indexOf('v=');
                let str = this.note.info.url.substring(idx + 2);
                console.log('https://www.youtube.com/embed/' + str);
                return 'https://www.youtube.com/embed/' + str;
            }
        }

    },
};
import { eventBus } from '../services/event-bus-service.js';

export default {

    template: `
     <div v-if="msg"  class="user-msg" :class="msg.type">
         <h4>{{msg.type}}</h4>
         <p>{{msg.txt}}</p>
    </div>
    `,
    data() {
        return {
            msg: null,
            timeoutId: ''
        }
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);

    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            this.timeoutId = setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
        cancelMsg() {
            console.log('', timeoutId);
            clearTimeout(this.timeoutId);
            // eventBus.$off('showMsg', this.showMsg);
        }
    },
};
import { mailService } from '../services/mail.service.js';
import { eventBus } from './../../../services/event-bus-service.js'


export default {
    props: ['percBar'],
    template: `
        <div class="percentage-bar">
            <div class="read-percentage">
                {{percentage}}
            </div>
        </div>`,
    data() {
        return {
            percentage:null
        }
    },
    created(){
        eventBus.$on('showPerc',()=>{
                mailService.readPercentage()
                    .then(result =>{
                        this.percentage = Math.floor(result)
                    })
        })
    }
}



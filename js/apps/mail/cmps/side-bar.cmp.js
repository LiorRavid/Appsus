

export default {
    props: ['percBar'],
    template: `
     <div class="side-bar">
                    <router-link class="compose" to="/mail/new">
                        <div class="btn-compose"></div>
                        &nbsp;Compose
                    </router-link>
                    <div class="folders">
                        <ul class="folder-list">
                            <li class="li" @click="setFilter('inbox')">
                                <div class="btn-inbox">Inbox</div>
                            </li>
                            <!-- <li class="li">Starred</li> -->
                            <li class="li-sent" @click="setFilter('sent')">
                                <div class="btn-sent">Sent Mails</div>
                            </li>
                            <!-- <li class="li">Drafts</li> -->
                            <li>
                                <percentage-bar :percBar="showPercentage" v-model="percentage"></percentage-bar>
                                <!-- <div class="percentage-bar">
                                    <div v-model="percentage" class="read-percentage">
                                        {{percentage}}
                                    </div>
                                </div> -->
                            </li>
                        </ul>
                    </div>
                </div>
        </div>`,
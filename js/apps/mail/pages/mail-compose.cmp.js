import { mailService } from '../services/mail.service.js';

export default {
    template: `
       <section class="mail-details mail-layout">
            <div class="mail-layout">
                    <div class="side-bar">
                        <div class="compose">
                            <div class="btn-compose"></div>
                            &nbsp;Compose
                        </div>
                        <div class="folders">
                            <ul class="folder-list">
                                <li>Inbox</li>
                                <li>Starred</li>
                                <li>Sent Mails</li>
                                <li>Drafts</li>
                            </ul>
                        </div>
                    </div>
                    <form  class='new-mail'action="">
                        <div class="new-header">
                            <h3>New Message</h3>
                        </div>
                        <div class="new-mail-box">
                            <p>To:</p>
                            <input type="text">
                        </div>
                        <div class="new-mail-box">
                            <p>Subject:</p>
                            <input type="text">
                        </div>
                        <div class="mail-text">
                        <textarea  class="text-area" rows="infinity" ></textarea>
                        </div>
                    </form>
            </div>
        </section>`,
};
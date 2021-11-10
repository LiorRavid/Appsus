import { utilService } from './../../../services/util-service.js';
import { storageService } from './../../../services/async-storage-service.js';

const MAIL_KEY = 'mail'
_createMails()

export const mailService = {
  query,
  remove,
  // getEmptyMail,
  save,
  getById
}

function query() {
  return storageService.query(MAIL_KEY)
}
function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId);
}

function save(mail) {
  if (mail.id) return storageService.put(MAIL_KEY, mail);
  else return storageService.post(MAIL_KEY, mail);
}

function getById(mailId) {
  return storageService.get(MAIL_KEY, mailId);
}

// function getEmptyMail() {
//   return {
//   };
// }

function _createMails(){
  const mails = [
    {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    to: 'momo@momo.com',
    from: 'user@appsus.com'
    },
    {
    id: 'e102',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    to: 'momo@momo.com',
    from: 'Alon@appsus.com'
    },
    {
    id: 'e103',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    to: 'momo@momo.com',
    from: 'Beni@appsus.com'
    },
  ]
  utilService.saveToStorage(MAIL_KEY, mails);
  return mails
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
  }

  // const criteria = {
  //   status: 'inbox/sent/trash/draft',
  //   txt: 'puki', // no need to support complex text search
  //   isRead: true, // (optional property, if missing: show all)
  //   isStared: true, // (optional property, if missing: show all)
  //   lables: ['important', 'romantic'] // has any of the labels
  //   }
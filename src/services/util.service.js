export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getDate,
  daysAgo,
}

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function getDate(timestamp) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date = new Date(timestamp)
  const month = months[date.getMonth()]
  let day = date.getDate()
  return `${month} ${day}`
}



function daysAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  // less than 10 seconds
  if (diff < 10000) {
    return 'just now';
  }
  if (diff < 60000) {
    return 'a few seconds ago';
  }

  // more than 1 minute and less than 60 minutes
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  // more than 60 minutes and less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    const date = new Date(timestamp);
    const yesterday = new Date(now - 86400000).getDate();
    if (date.getDate() === yesterday) {
      return `yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  // more than yesterday at 00:01 am
  const date = new Date(timestamp);
  return `on ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}


//   const seconds = Math.floor((new Date() - date) / 1000);

//   let interval = Math.floor(seconds / 31536000);
//   if (interval > 1) {
//     return interval + ' years ago';
//   }

//   interval = Math.floor(seconds / 2592000);
//   if (interval > 1) {
//     return interval + ' months ago';
//   }

//   interval = Math.floor(seconds / 86400);
//   if (interval > 1) {
//     return interval + ' days ago';
//   }

//   interval = Math.floor(seconds / 3600);
//   if (interval > 1) {
//     return interval + ' hours ago';
//   }

//   interval = Math.floor(seconds / 60);
//   if (interval > 1) {
//     return interval + ' minutes ago';
//   }

//   if(seconds < 10) return 'just now';

//   return Math.floor(seconds) + ' seconds ago';
// };

  // const diffTime = today.getTime() - date.getTime()
  // const diffDays = Math.floor(diffTime / (1000 * 3600 * 24))
  // if (diffDays === 0) return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
  // if (diffDays === 1) return 'yesterday'
  // if (diffDays > 5) return date.toLocaleDateString()
  // return `${diffDays} days ago`

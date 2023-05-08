import { storageService } from "./async-storage.service";
// import { httpService } from './http.service'

// import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
// import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  getEmptyLoginCred,
  getEmptySignupCred,
  // changeScore,
};

window.userService = userService;
// window.loadUsers = loadUsers

async function getUsers(filterBy = { txt: "" }) {
  let users = await storageService.query("user");
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, "i");
    users = users.filter((user) => regex.test(user.fullname));
  }
  return users;

  // return await httpService.get(`user`, filterBy)
}

// function onUserUpdate(user) {
//   showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
//   // store.dispatch({ type: 'setWatchedUser', user })
// }

async function getById(userId) {
  const user = await storageService.get("user", userId);
  // const user = await httpService.get(`user/${userId}`)

  // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
  // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user;
}

function remove(userId) {
  return storageService.remove("user", userId);
  // return httpService.delete(`user/${userId}`)
}

async function update(userCred) {
  const user = await storageService.get("user", user._id);
  // let user = getById(_id)
  user = { ...user, userCred };
  await storageService.put("user", user);

  // user = await httpService.put(`user/${user._id}`, user)

  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user);

  return user;
}

async function login(userCred) {
  // console.log("userCred: ", userCred);

  const users = await storageService.query("user");
  const user = users.find((user) => user.username === userCred.username);

  // const user = await httpService.post('auth/login', userCred)

  console.log("user: ", user);

  if (user) {
    // socketService.login(user._id)
    return saveLocalUser(user);
  }
}

async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";

  const user = await storageService.post("user", userCred);

  // const user = await httpService.post('auth/signup', userCred)

  // socketService.login(user._id)

  return saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  // socketService.logout()
  // return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    imgUrl: user.imgUrl,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

function getEmptyLoginCred() {
  return {
    username: "",
    password: "",
  };
}

function getEmptySignupCred() {
  return {
    fullname: "",
    username: "",
    password: "",
    imgUrl: "",
  };
}

window.loadUsers = loadUsers;
async function loadUsers() {
  const users = [
    {
      _id: "u100",
      fullname: "Shahar Saadon",
      username: "shahar",
      password: "shahar",
      imgUrl:
        "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png",
    },
    {
      _id: "u101",
      fullname: "Ido Peri",
      username: "ido",
      password: "ido",
      imgUrl:
        "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
    },
    {
      _id: "u102",
      fullname: "Tomer Huberman",
      username: "tomer",
      password: "tomer",
      imgUrl:
        "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png",
    },
    {
      _id: "u103",
      fullname: "Puki Ka",
      username: "puki",
      password: "puki",
      imgUrl:
        "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png",
    },
    {
      _id: "u104",
      fullname: "Muki Ka",
      username: "muki",
      password: "muki",
      imgUrl:
        "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png",
    },
    {
      _id: "u105",
      fullname: "Ido Da",
      username: "da",
      password: "da",
      imgUrl:
        "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
    },
  ];

  await userService.signup(users[0]);
  await userService.signup(users[2]);
  await userService.signup(users[3]);
  await userService.signup(users[4]);
  await userService.signup(users[5]);
  await userService.signup(users[1]);
}

// ;(async () => {
//   const user = await storageService.query('user')
//   // console.log("users: ", users);
//   if (user.length) return
//   const users = [
//     {
//       _id: 'u100',
//       fullname: 'Shahar Saadon',
//       username: 'shahar',
//       password: 'shahar',
//       imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png',
//     },
//     {
//       _id: 'u101',
//       fullname: 'Ido Peri',
//       username: 'ido',
//       password: 'ido',
//       imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png',
//     },
//     {
//       _id: 'u102',
//       fullname: 'Tomer Huberman',
//       username: 'tomer',
//       password: 'tomer',
//       imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png',
//     },
//     {
//       _id: 'u103',
//       fullname: 'Puki Ka',
//       username: 'puki',
//       password: 'puki',
//       imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png',
//     },
//     {
//       _id: 'u104',
//       fullname: 'Muki Ka',
//       username: 'muki',
//       password: 'muki',
//       imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png',
//     },
//     {
//       _id: 'u105',
//       fullname: 'Ido Da',
//       username: 'da',
//       password: 'da',
//       imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png',
//     },
//   ]
//   await signup(users[0])
//   await signup(users[2])
//   await signup(users[3])
//   await signup(users[4])
//   await signup(users[5])
//   await signup(users[1])
// })()

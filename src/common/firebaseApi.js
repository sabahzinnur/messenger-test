import firebase from 'firebase';
import store from '@/store';

export async function getUserConversations(userUid) {
  await firebase.database()
    .ref('users/' + userUid)
    .child('conversations')
    .on('value', (snapshot) => {
      const userConversations = [];
      Object.keys(snapshot.val()).forEach(conversation => {
        firebase.database()
          .ref(`conversations/${snapshot.val()[conversation]}`)
          .once('value', async rsp => {
            userConversations.push({uid: snapshot.val()[conversation], ...rsp.val()});
          });
      });
      store.commit('setConversations', userConversations);
    });
}

export async function getUserInfo(userUid) {
  const response = await firebase.database()
    .ref(`/users/${userUid}/info`)
    .once('value');
  return response.val();
}

export async function createNewConversation(userUid, contactUid) {
  // Add conversation
  const userInfo = await getUserInfo(userUid);
  const contactInfo = await getUserInfo(contactUid);
  const response = await firebase.database().ref('conversations').push({
    members: [
      {uid: userUid, name: userInfo.name},
      {uid: contactUid, name: contactInfo.name}
    ],
    lastMessage: '',
    timestamp: Date.now(),
  });
  // Add conversation record to user
  await firebase.database()
    .ref(`users/${userUid}/conversations/`)
    .push(response.key);
  // Add conversation record to conversationalist
  await firebase.database()
    .ref(`users/${contactUid}/conversations/`)
    .push(response.key);
}

export async function updateConversation(conversation) {
  await firebase.database()
    .ref()
    .update({['/conversations/' + conversation.uid]: conversation});
}

export async function addMessageToConversation(conversation, message, author) {
  await updateConversation(Object.assign(conversation, {lastMessage: message}));
  await firebase.database()
    .ref(`/messages/${conversation.uid}`)
    .push({
      text: message,
      timestamp: Date.now(),
      author: author
    });
}

export async function loadConversationMessages(conversation) {
  await firebase.database()
    .ref(`/messages/${conversation.uid}`)
    .on('value', (snapshot) => {
      if (snapshot.val()) {
        const messages = Object.keys(snapshot.val()).map(message => {
          return {...snapshot.val()[message], uid: message};
        });
        store.commit('setMessages', messages);
      } else {
        store.commit('setMessages', []);
      }
    });
}

export async function loadUsersList() {
  const response = await firebase.database()
    .ref('/users').once('value');
  return response.val();
}

export async function loadUserInfo(userUid) {
  const info = await getUserInfo(userUid);
  info.email = firebase.auth().currentUser.email;
  store.commit('setInfo', {...info, uid: userUid});
}

export async function updateUserInfo(userUid, toUpdate) {
  await firebase.database()
    .ref(`/users/${userUid}/info`).update(toUpdate);
  store.commit('setInfo', toUpdate);
}

export default {
  getUserConversations,
  getUserInfo,
  createNewConversation,
  addMessageToConversation,
  loadConversationMessages,
  loadUsersList,
  loadUserInfo,
  updateUserInfo
};

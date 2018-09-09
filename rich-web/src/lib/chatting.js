import DATA from '../data/chatData.js';

const getChatListData = () => {
  return new Promise((resolve, reject) => {
    const list = DATA.map((data, index) => ({
      "host": data.host,
      "last_msg": data.messages[data.messages.length - 1]
    }));

    setTimeout(() => {
      resolve(list);
    }, 1000);
  });
}

const getHostChatData = (hostId) => {
  return new Promise((resolve, reject) => {
    const host = DATA.find((obj) => {
      return obj.host.id.toString() === hostId;
    });

    setTimeout(() => {
      resolve(host);
    }, 1000);
  });
};

export { getChatListData, getHostChatData };

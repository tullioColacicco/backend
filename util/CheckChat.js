module.exports = function checkChat(userChatIds, friendChatIds) {
  let found = false;
  for (chatid of userChatIds) {
    if (friendChatIds.includes(chatid)) {
      found = true;
    }
  }
  return found;
};

//  why doesnt this work???????

// function checkChat(gaara, itachi) {
//     let found = false;
//     for (chatid of gaara.chats) {
//       if (
//         itachi.chats.filter(friendChatId => friendChatId === chatid).length > 0
//       ) {
//         found = true;
//       }
//     }
//     return found;
//   }

//   const checked = checkChat(gaara, itachi);
//   console.log(checked);

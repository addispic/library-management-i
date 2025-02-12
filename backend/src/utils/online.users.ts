// types
export type IOnlineUser = {
  _id: string;
  id: string;
};

// online users
let onlineUsers: IOnlineUser[] = [];

// get online users
export const getOnlineUsers = () => {
  return onlineUsers;
};

// add new online user
export const addNewOnlineUser = (data: IOnlineUser) => {
    const isUserOnline = onlineUsers.findIndex(user => user._id === data._id) 
    if(isUserOnline === -1){
        onlineUsers.push(data)
    }else{
        onlineUsers[isUserOnline].id = data.id
    }
};

// remove online user
export const removeOnlineUser = (id: string) => {
    onlineUsers = onlineUsers.filter(user => user.id !== id)
}
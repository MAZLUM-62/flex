export class userModel {
    constructor(username, userstatus, level, socketId, authenticated, lastLogin, registrated) {
      this.username = username;
      this.userstatus = userstatus;
      this.level = level;
      this.socketId = socketId;
      this.authenticated = authenticated;
      this.lastLogin = lastLogin;
      this.registrated = registrated;
    }   
}

export default userModel;

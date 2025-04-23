let token = null;
let refresh_token = null;
let user_id = null;

export function setToken(res) {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem("loggedUser")) || {};
      token = `Bearer ${res.token}`;
      refresh_token = res.refreshToken;
      if(res.id) {
        user_id = res.id;
      }
      loggedUserJSON.token = res.token
      loggedUserJSON.refreshToken = res.refreshToken;

      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUserJSON));
  };

export {
    token,
    refresh_token,
    user_id
};


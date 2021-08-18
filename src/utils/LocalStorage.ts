// To act as a valid UserStore constructor for react-oidc-context.AuthenticationProvider
// https://github.com/AxaGuilDEv/react-oidc/issues/551#issuecomment-757354836
export default class LocalStorage {
  constructor() {
    return window.localStorage;
  }
}

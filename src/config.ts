import { UserManagerSettings, WebStorageStateStore } from "oidc-client";

const API_ROOT = "https://api.cc98.org";

const OPENID_ROOT = "https://openid.cc98.org";

const OFFICIAL_FORUM_ROOT = "https://www.cc98.org";

const OIDC_CONFIG: UserManagerSettings = {
  client_id: "4058b08c-291c-445e-feab-08d7b15cc548",
  response_type: "code",
  scope: "openid cc98-api offline_access",
  authority: OPENID_ROOT,
  redirect_uri: "http://test.zju.today/",
  silent_redirect_uri: "http://test.zju.today/",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  monitorSession: false,
  automaticSilentRenew: true,
  validateSubOnSilentRenew: true,
  includeIdTokenInSilentRenew: false,
  loadUserInfo: false,
};

// 主题帖的一页包含的回复数
const POSTS_PER_TOPIC_PAGE = 10;

const TOPICS_PER_BOARD_PAGE = 20;

const TOPICS_PER_SEARCH_PAGE = 20;

const TOPICS_PER_NEW_TOPICS_PAGE = 10;

const NEW_TOPICS_PAGINATION_MAX_SIZE = 20;

const DEFAULT_TITLE = "Griseous - an unofficial web UI for CC98";

export {
  API_ROOT,
  DEFAULT_TITLE,
  NEW_TOPICS_PAGINATION_MAX_SIZE,
  OFFICIAL_FORUM_ROOT,
  OIDC_CONFIG,
  OPENID_ROOT,
  POSTS_PER_TOPIC_PAGE,
  TOPICS_PER_BOARD_PAGE,
  TOPICS_PER_NEW_TOPICS_PAGE,
  TOPICS_PER_SEARCH_PAGE,
};

import { UserManagerSettings } from "oidc-client";

const API_ROOT = "https://api.cc98.org";

const OPENID_ROOT = "https://openid.cc98.org";

const OFFICIAL_FORUM_ROOT = "https://www.cc98.org";

const OIDC_CONFIG: UserManagerSettings = {
  client_id: "4058b08c-291c-445e-feab-08d7b15cc548",
  redirect_uri: "http://test.zju.today/",
  // Code Flow with PKCE
  response_type: "code",
  scope: "openid cc98-api profile",
  authority: OPENID_ROOT,
  silent_redirect_uri: "http://test.zju.today/",
  automaticSilentRenew: false,
  monitorSession: false,
  loadUserInfo: true,
};

// 主题帖的一页包含的回复数
const POSTS_PER_TOPIC_PAGE = 10;

const TOPICS_PER_BOARD_PAGE = 20;

const DEFAULT_TITLE = "Griseous - an unofficial web UI for CC98";

export {
  API_ROOT,
  DEFAULT_TITLE,
  OFFICIAL_FORUM_ROOT,
  OIDC_CONFIG,
  OPENID_ROOT,
  POSTS_PER_TOPIC_PAGE,
  TOPICS_PER_BOARD_PAGE,
};

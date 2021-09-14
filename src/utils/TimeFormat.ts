const dtf = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});

// TODO: 分钟前/小时前

// eslint-disable-next-line import/prefer-default-export
export { dtf };

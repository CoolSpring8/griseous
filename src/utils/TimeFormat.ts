const dtf = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});

const dtfFormat = (time: string): string => dtf.format(new Date(time));

const rtf = new Intl.RelativeTimeFormat("zh-CN", { style: "narrow" });

const rtfFormat = (time: string): string => {
  const date = new Date(time);
  const delta = (date.getTime() - Date.now()) / 1000;
  const deltaAbs = Math.abs(delta);

  if (deltaAbs < 60) {
    return rtf.format(Math.trunc(delta), "second");
  }

  if (deltaAbs < 60 * 60) {
    return rtf.format(Math.trunc(delta / 60), "minute");
  }

  if (deltaAbs < 24 * 60 * 60) {
    return (
      rtf.format(Math.trunc(delta / 60 / 60), "hour").slice(0, -1) +
      rtf.format(Math.trunc((delta % (60 * 60)) / 60), "minute")
    );
  }

  return dtf.format(date);
};

export { dtf, dtfFormat, rtf, rtfFormat };

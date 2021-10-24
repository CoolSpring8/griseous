// https://github.com/ZJU-CC98/Forum/blob/dev/CC98.Forum/CC98.Forum/Ubb/UbbCodeExtension.tsx

import { createPreset } from "@bbob/preset";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Image from "../components/Ubb/Image";
import { OFFICIAL_FORUM_ROOT } from "../config";
import stickers from "./Stickers";

const ubbTagsRegular = {
  noubb: (node) => ({ tag: "code", content: `${node.content}` }),
  b: (node) => ({ tag: "b", content: node.content }),
  img: (node) => ({
    tag: Image,
    attrs: { src: node.content[0], isHiding: !!Object.keys(node.attrs)[0] }, // [img=1]则隐藏
  }),
  i: (node) => ({ tag: "i", content: node.content }),
  size: (node) => {
    const n = Object.keys(node.attrs)[0];
    let size;
    if (Number.isNaN(n)) {
      size = null;
    } else {
      size = Number(n);
      if (size > 7) {
        size = 7;
      }
    }
    return {
      tag: "span",
      attrs: {
        style: { fontSize: size === null ? null : `${size / 3 + 0.5}rem` },
      },
      content: node.content,
    };
  },
  quote: (node) => ({
    tag: "blockquote",
    attrs: {
      className:
        "rounded-lg p-4 bg-gray-100 text-sm text-gray-500 border-l-4 border-gray-200 rounded-l-none",
    },
    content: node.content,
  }),
  color: (node) => ({
    tag: "span",
    attrs: { style: { color: Object.keys(node.attrs)[0] } },
    content: node.content,
  }),
  // TODO: XSS?
  url: (node) => {
    const url = Object.keys(node.attrs)[0] || node.content;
    return {
      tag: "a",
      attrs: { href: url, target: "_blank", rel: "noopener" },
      content: node.content,
    };
  },
  u: (node) => ({ tag: "u", content: node.content }),
  del: (node) => ({ tag: "del", content: node.content }),
  audio: (node) => ({
    tag: "audio",
    attrs: { controls: true, src: node.content },
  }),
  mp3: (node) => ({
    tag: "audio",
    attrs: { controls: true, src: node.content },
  }),
  video: (node) => ({
    tag: "video",
    attrs: { controls: true, src: node.content },
  }),
  cursor: (node) => ({
    tag: "span",
    attrs: { style: { cursor: Object.keys(node.attrs)[0] } },
    content: node.content,
  }),
  english: (node) => ({
    tag: "span",
    attrs: { style: { fontFamily: "Arial" } },
    content: node.content,
  }),
  user: (node) => ({
    tag: "a",
    attrs: { href: `/user/name/${encodeURIComponent(node.content)}` },
    content: node.content,
  }),
  code: (node) => ({
    tag: "code",
    content: `${node.content}`,
  }),
  font: (node) => ({
    tag: "span",
    attrs: { style: { fontFamily: Object.keys(node.attrs)[0] } },
    content: node.content,
  }),
  align: (node) => ({
    tag: "p",
    attrs: { style: { textAlign: Object.keys(node.attrs)[0] } },
    content: node.content,
  }),
  upload: (node) => ({
    tag: "a",
    attrs: { href: node.content, rel: "noopener" },
    content: "点击下载文件",
  }),
  left: (node) => ({
    tag: "span",
    attrs: { className: "text-left" },
    content: node.content,
  }),
  center: (node) => ({
    tag: "span",
    attrs: { className: "text-center" },
    content: node.content,
  }),
  right: (node) => ({
    tag: "span",
    attrs: { className: "text-right" },
    content: node.content,
  }),
  table: (node) => ({
    tag: "table",
    content: node.content,
  }),
  td: (node) => ({
    tag: "td",
    attrs: {
      rowspan: Object.keys(node.attrs)[0] ?? 1,
      colspan: Object.keys(node.attrs)[1] ?? 1,
    },
    content: node.content,
  }),
  th: (node) => ({
    tag: "th",
    attrs: {
      rowspan: Object.keys(node.attrs)[0] ?? 1,
      colspan: Object.keys(node.attrs)[1] ?? 1,
    },
    content: node.content,
  }),
  tr: (node) => ({
    tag: "tr",
    content: node.content,
  }),
  topic: (node) => ({
    tag: "a",
    attrs: { href: `/topic/${Object.keys(node.attrs)[0]}` },
    content: node.content,
  }),
  md: (node) => ({
    tag: ReactMarkdown,
    attrs: { remarkPlugins: [remarkGfm] },
    content: node.content,
  }),
  pm: (node) => ({
    tag: "a",
    attrs: { href: `/message/message?name=${Object.keys(node.attrs)[0]}` },
    content: node.content,
  }),
  // TODO：处理参数为av号或整个网址的情况
  // TODO：responsive iframe？
  bili: (node) => ({
    tag: "iframe",
    attrs: {
      src: `//player.bilibili.com/player.html?bvid=${node.content}&page=${
        Object.keys(node.attrs)[0] ?? 1
      }`,
      width: "640",
      height: "480",
      allow: "fullscreen",
    },
  }),
  line: () => ({
    tag: "hr",
  }),
  needreply: () => ({
    tag: "div",
    content: "回复可见",
  }),
};

const ubbTagsStickers = [];

for (const {
  name,
  has_prefix: hasPrefix,
  file_ext: fileExtension,
  list,
} of stickers) {
  const ubbTagsTmp: Record<string, unknown> = {};
  for (const id of list) {
    ubbTagsTmp[`${name.toLowerCase()}${id}`] = () => ({
      tag: "img",
      attrs: {
        src: `${OFFICIAL_FORUM_ROOT}/static/images/${name}/${
          hasPrefix ? name : ""
        }${id}${fileExtension}`,
        className: "inline w-14",
      },
    });
  }
  ubbTagsStickers.push(ubbTagsTmp);
}

const ubbTags = Object.assign(ubbTagsRegular, ...ubbTagsStickers);

const ubbPreset = createPreset(ubbTags);

const ubbOptions = { onlyAllowTags: Object.keys(ubbTags) };

export { ubbOptions, ubbPreset };

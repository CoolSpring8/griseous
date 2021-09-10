// https://github.com/ZJU-CC98/Forum/blob/dev/CC98.Forum/CC98.Forum/Ubb/UbbCodeExtension.tsx

import { createPreset } from "@bbob/preset";

import Image from "../components/Ubb/Image";

function escapeHTML(html) {
  return document.createTextNode(html).textContent;
}

const ubbTags = {
  noubb: (node) => ({ tag: "code", content: escapeHTML(node.content) }),
  b: (node) => ({ tag: "b", content: node.content }),
  img: (node) => ({
    tag: Image,
    attrs: { src: node.content[0], isHiding: !!Object.keys(node.attrs)[0] }, // [img=1]则隐藏
  }),
  i: (node) => ({ tag: "i", content: node.content }),
  size: (node) => {
    const fontSizeToClassName = (size: string) => {
      switch (size) {
        case "0":
          return "text-xs";
        case "1":
          return "text-sm";
        case "2":
          return "text-base";
        case "3":
          return "text-lg";
        case "4":
          return "text-xl";
        case "5":
          return "text-2xl";
        case "6":
          return "text-3xl";
        case "7":
          return "text-4xl";
        default:
          return null;
      }
    };
    return {
      tag: "span",
      attrs: { className: fontSizeToClassName(Object.keys(node.attrs)[0]) },
      content: node.content,
    };
  },
  quote: (node) => ({ tag: "blockquote", content: node.content }),
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
    content: escapeHTML(node.content),
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
    tag: "p",
    attrs: { className: "text-left" },
    content: node.content,
  }),
  center: (node) => ({
    tag: "p",
    attrs: { className: "text-center" },
    content: node.content,
  }),
  right: (node) => ({
    tag: "p",
    attrs: { className: "text-right" },
    content: node.content,
  }),
  table: (node) => ({
    tag: "table",
    content: node.content,
  }),
};

const ubbPreset = createPreset(ubbTags);

const ubbOptions = { onlyAllowTags: Object.keys(ubbTags) };

export { ubbOptions, ubbPreset };

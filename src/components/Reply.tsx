import BBCode from "@bbob/react/es/Component";
import { IPost, IUser } from "@cc98/api";
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import {
  ThumbDownIcon as ThumbDownIconSolid,
  ThumbUpIcon as ThumbUpIconSolid,
} from "@heroicons/react/solid";
import classNames from "classnames";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { OFFICIAL_FORUM_ROOT } from "../config";
import { useStore } from "../store";
import { dtfFormat, rtfFormat } from "../utils/TimeFormat";
import { ubbOptions, ubbPreset } from "../utils/Ubb";

function Reply({
  post,
  user,
  pages,
}: {
  post: IPost;
  user: IUser | undefined;
  pages: IPost[][] | undefined;
}): JSX.Element {
  const blockedUsers = useStore((state) => state.blockedUsers);
  const [timeFormat, setTimeFormat] = React.useState("relative");
  const toggleTimeFormat = () =>
    setTimeFormat((f) => (f === "relative" ? "absolute" : "relative"));

  return (
    <>
      {blockedUsers.includes(post.userName) ? (
        <div data-blocked-user />
      ) : (
        <div className="whitespace-pre-wrap bg-white rounded-md shadow">
          {post.parentId !== 0 && (
            <div className="bg-yellow-50 text-gray-400 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis px-4 py-2">
              <span>
                {pages?.flat().find((p) => p.id === post.parentId)?.userName}：
              </span>
              <span>
                {pages
                  ?.flat()
                  .find((p) => p.id === post.parentId)
                  ?.content.replace(/\[quote\](.+)\[\/quote\]/s, "")
                  .replaceAll(/\[\/?.+\]/g, "")
                  .replaceAll(/\n/g, "")}
              </span>
            </div>
          )}
          <div
            className={classNames("p-4 flex flex-col space-y-2", {
              "before:bg-blue-500 before:absolute before:left-4 before:w-2 before:h-16 before:rounded-l":
                post.isLZ,
            })}
          >
            <div className="flex items-center">
              <div>
                <img
                  src={
                    post.isAnonymous
                      ? `${OFFICIAL_FORUM_ROOT}/static/images/心灵头像.gif`
                      : user?.portraitUrl
                  }
                  alt=""
                  className="w-6 h-6 rounded-md bg-purple-300"
                />
              </div>
              <span className="ml-1.5 text-sm">{post.userName}</span>
              <span
                className="ml-2 text-xs text-gray-500 flex-1 cursor-pointer"
                onClick={toggleTimeFormat}
                onKeyUp={(e) => {
                  if (e.key === "Enter") toggleTimeFormat();
                }}
                role="button"
                tabIndex={0}
              >
                {timeFormat === "relative"
                  ? rtfFormat(post.time)
                  : dtfFormat(post.time)}
              </span>
              <span className="text-gray-500">#{post.floor}</span>
            </div>
            <article>
              {post.contentType === 1 ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              ) : (
                <BBCode plugins={[ubbPreset()]} options={ubbOptions}>
                  {post.content
                    ?.replace(/\[quote\](.+)\[\/quote\]/s, "")
                    .trim()}
                </BBCode>
              )}
            </article>
            <div className="flex items-center space-x-3 text-purple-300 !mt-5">
              <div className="flex space-x-1">
                <div className="w-4 h-4">
                  {post.likeState === 1 ? (
                    <ThumbUpIconSolid />
                  ) : (
                    <ThumbUpIcon />
                  )}
                </div>
                <span className="text-sm">{post.likeCount}</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-4 h-4">
                  {post.likeState === 2 ? (
                    <ThumbDownIconSolid />
                  ) : (
                    <ThumbDownIcon />
                  )}
                </div>
                <span className="text-sm">{post.dislikeCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reply;

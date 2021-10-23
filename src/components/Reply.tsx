import BBCode from "@bbob/react/es/Component";
import { IPost, IUser } from "@cc98/api";
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import {
  PencilIcon,
  ReplyIcon,
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
  const hasParent = post.parentId !== 0;
  const parentPost = hasParent
    ? pages?.flat().find((p) => p.id === post.parentId)
    : null;
  const hasAwards = !!post.awards?.length;
  const awardsAcc: Record<string, number> = {};
  const awardsStats = hasAwards
    ? post.awards.reduce((acc, cur) => {
        if (acc[cur.content]) {
          acc[cur.content] += 1;
        } else {
          acc[cur.content] = 1;
        }
        return acc;
      }, awardsAcc)
    : null;

  return (
    <>
      {blockedUsers.includes(post.userName) ? (
        <div data-blocked-user />
      ) : (
        <div className="whitespace-pre-wrap bg-white rounded-2xl shadow overflow-hidden">
          {hasParent && (
            <div className="bg-yellow-50 text-gray-500 text-sm px-4 py-2 flex items-center">
              <ReplyIcon className="w-4 h-4 mr-2" />
              <span>{parentPost?.userName}：</span>
              <span className="flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {parentPost?.content
                  .replace(/\[quote\](.+)\[\/quote\]/s, "")
                  .replaceAll(/\[\/?.+?\]/g, "")
                  .replaceAll("\n", " ")}
              </span>
              <span>#{parentPost?.floor}</span>
            </div>
          )}
          <div
            className={classNames("p-4 flex flex-col space-y-2", {
              "before:bg-blue-500 before:absolute before:left-4 before:w-2 before:h-12 before:rounded-l":
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
              <div className="ml-2 flex items-center text-xs text-gray-500">
                <span
                  className="cursor-pointer"
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
                {post.lastUpdateTime && (
                  <div className="flex">
                    <PencilIcon className="ml-2 w-4 h-4" />
                    <span>
                      {timeFormat === "relative"
                        ? rtfFormat(post.lastUpdateTime)
                        : dtfFormat(post.lastUpdateTime)}
                    </span>
                    {post.lastUpdateAuthor !== post.userName &&
                      post.lastUpdateAuthor !== "匿名" && (
                        <>
                          <span> by </span>
                          <span>{post.lastUpdateAuthor}</span>
                        </>
                      )}
                  </div>
                )}
              </div>
              <span className="ml-auto text-gray-500">#{post.floor}</span>
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
                    .trim() ?? ""}
                </BBCode>
              )}
            </article>
            <div className="flex items-center text-sm space-x-3 text-purple-300 !mt-5">
              <div className="flex space-x-1">
                <div className="w-4 h-4">
                  {post.likeState === 1 ? (
                    <ThumbUpIconSolid />
                  ) : (
                    <ThumbUpIcon />
                  )}
                </div>
                <span className="">{post.likeCount}</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-4 h-4">
                  {post.likeState === 2 ? (
                    <ThumbDownIconSolid />
                  ) : (
                    <ThumbDownIcon />
                  )}
                </div>
                <span className="">{post.dislikeCount}</span>
              </div>
              {awardsStats && (
                <div className="flex gap-2">
                  {Object.entries(awardsStats).map((a) => (
                    <div className="shadow rounded-xl bg-gray-100 px-2 py-1 flex gap-2">
                      <span className="text-gray-500">{a[0]}</span>
                      <span className="text-yellow-600">×{a[1]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reply;

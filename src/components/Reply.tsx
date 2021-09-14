import bbobReactRender from "@bbob/react/es/render";
import { IPost } from "@cc98/api";
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import {
  ThumbDownIcon as ThumbDownIconSolid,
  ThumbUpIcon as ThumbUpIconSolid,
} from "@heroicons/react/solid";
import * as React from "react";

import { dtf } from "../utils/TimeFormat";
import { ubbOptions, ubbPreset } from "../utils/Ubb";

function Reply({ post }: { post: IPost }): JSX.Element {
  return (
    <div className="whitespace-pre-wrap bg-white rounded-md shadow p-4 flex flex-col space-y-2">
      <p className="flex items-center space-x-2">
        <span>{post.userName}</span>
        <span className="text-xs text-gray-500 flex-1">
          {dtf.format(new Date(post.time))}
        </span>
        <span className="text-gray-500">#{post.floor}</span>
      </p>
      <div>
        {post.contentType === 1
          ? "[TODO: Markdown]"
          : bbobReactRender(post.content, ubbPreset(), ubbOptions)}
      </div>
      <div className="flex items-center space-x-3 text-purple-300 !mt-5">
        <div className="flex space-x-1">
          <div className="w-4 h-4">
            {post.likeState === 1 ? <ThumbUpIconSolid /> : <ThumbUpIcon />}
          </div>
          <span className="text-sm">{post.likeCount}</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-4 h-4">
            {post.likeState === 2 ? <ThumbDownIconSolid /> : <ThumbDownIcon />}
          </div>
          <span className="text-sm">{post.dislikeCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Reply;

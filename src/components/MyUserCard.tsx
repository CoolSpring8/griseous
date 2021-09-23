import { IUser } from "@cc98/api";
import { CheckCircleIcon, CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { Button } from "@mui/material";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, UseQueryResult } from "react-query";

import { API_ROOT } from "../config";
import usePathWithParams from "../hooks/usePathWithParams";

function MyUserCard(): JSX.Element {
  const auth = useAuth();
  const path = usePathWithParams();
  const { data }: UseQueryResult<IUser> = useQuery(
    "me",
    () =>
      ky
        .get(`${API_ROOT}/me`, {
          headers: { Authorization: `Bearer ${auth.user?.access_token}` },
        })
        .json(),
    { enabled: !auth.isLoading && auth.isAuthenticated }
  );

  if (!auth.isAuthenticated) {
    return (
      <div className="shadow-lg rounded-2xl p-8 bg-blue-500 text-white flex flex-col">
        <div className="flex items-center mb-4">
          <CheckCircleIcon className="h-8 w-8" />
          <span className="text-3xl ml-1">登录</span>
          <div className="flex items-center ml-auto">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            <span className="ml-1 text-sm">关于本站</span>
          </div>
        </div>
        <div>
          <Button
            className="bg-blue-400 hover:bg-blue-300 text-white font-medium w-full"
            onClick={() => {
              auth.signinRedirect({
                state: {
                  intended: path,
                },
              });
            }}
          >
            跳转到 CC98 登录中心授权
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-lg rounded-2xl p-4 xl:p-8 bg-white">
      <div className="flex items-center mb-4">
        <div className="flex items-start">
          <img
            className="rounded-lg w-14 h-14"
            src={data?.portraitUrl}
            alt=""
          />
          <div className="flex flex-col ml-3">
            <div className="font-medium text-black">{data?.name}</div>
            <p className="text-sm text-gray-500">{data?.privilege}</p>
          </div>
        </div>
        <div className="flex ml-auto whitespace-nowrap">
          <Button className="min-w-min">
            <CogIcon className="w-5 h-5" />
            <span className="hidden lg:block">设置</span>
          </Button>
          <Button className="min-w-min">
            <LogoutIcon
              className="w-5 h-5"
              onClick={() => {
                auth.signoutPopup();
              }}
            />
            <span className="hidden lg:block">退出</span>
          </Button>
        </div>
      </div>
      <div className="text-sm text-gray-500">{data?.introduction}</div>
      <div className="hidden md:flex justify-around mt-4 whitespace-nowrap">
        <div className="flex flex-col items-center">
          <p className="text-2xl text-blue-500">{data?.postCount}</p>
          <p className="text-gray-500">发帖</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl text-yellow-500">{data?.followCount}</p>
          <p className="text-gray-500">关注</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl text-green-500">{data?.fanCount}</p>
          <p className="text-gray-500">粉丝</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl text-purple-500">{data?.wealth}</p>
          <p className="text-gray-500">财富值</p>
        </div>
      </div>
    </div>
  );
}

export default MyUserCard;

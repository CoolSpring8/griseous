import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";

import { useStore } from "../store";

interface PreferenceFormData {
  blockedUsers: string;
}

function PreferenceDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): JSX.Element {
  const setBlockedUsers = useStore((state) => state.setBlockedUsers);
  const { register, handleSubmit } = useForm<PreferenceFormData>();

  const onSubmit = (data: PreferenceFormData) => {
    setBlockedUsers(data.blockedUsers.split("\n").filter(Boolean));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>设置</DialogTitle>
      <DialogContent>
        <form className="px-6 py-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="blocked-users">
              不看以下用户的发言（每行一个）
            </label>
            <textarea
              id="blocked-users"
              className="rounded shadow border-gray-300"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("blockedUsers")}
            />
          </div>
          <div className="flex justify-end mt-3">
            <input type="submit" value="保存" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PreferenceDialog;

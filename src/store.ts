/* eslint-disable no-param-reassign */
import produce, { Draft } from "immer";
import create, { State, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

// https://github.com/pmndrs/zustand#middleware
const immer =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState =
          typeof partial === "function"
            ? produce(partial as (state: Draft<T>) => T)
            : (partial as T);
        return set(nextState, replace);
      },
      get,
      api
    );

class BannedKeyword {
  raw: string;

  compiled: RegExp;

  strategy: BannedKeywordStrategy;

  constructor(raw: string, strategy: BannedKeywordStrategy) {
    this.raw = raw;
    this.strategy = strategy;

    this.compiled = new RegExp(raw);
  }
}

enum BannedKeywordStrategy {
  Hide,
  ReplaceWithAsterisk,
}

interface UserPreference {
  blockedUsers: string[];
  bannedKeywords: BannedKeyword[];
  postTimeFormat: number;

  setBlockedUsers: (users: string[]) => void;
  addBannedKeyword: (keywords: BannedKeyword[]) => void;
  setPostTimeFormat: (format: number) => void;
}

const useStore = create<UserPreference>(
  persist(
    immer((set) => ({
      blockedUsers: [],
      bannedKeywords: [],
      postTimeFormat: 0,

      setBlockedUsers: (users) =>
        set((state) => {
          state.blockedUsers = users;
        }),
      addBannedKeyword: (keywords) =>
        set((state) => {
          state.bannedKeywords = keywords;
        }),
      setPostTimeFormat: (format) =>
        set((state) => {
          state.postTimeFormat = format;
        }),
    })),
    { name: "user-preference" }
  )
);

// eslint-disable-next-line import/prefer-default-export
export { useStore };

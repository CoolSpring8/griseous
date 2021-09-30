import { useLocation } from "react-router-dom";

export default function useSearchParams(): Record<string, string> {
  const sp = new URLSearchParams(useLocation().search);
  const proxy = new Proxy(
    {},
    {
      get(obj: Record<string, never>, prop: string) {
        return sp.get(prop);
      },
    }
  );
  return proxy;
}

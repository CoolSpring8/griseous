import { useLocation } from "react-router-dom";

export default function useSearchParams(): Record<string, string> {
  const sp = new URLSearchParams(useLocation().search);
  const proxy = new Proxy(
    {},
    {
      get(obj, prop) {
        return sp.get(prop.toString());
      },
    }
  );
  return proxy;
}

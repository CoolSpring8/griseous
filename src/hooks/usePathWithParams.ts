import { useLocation } from "react-router-dom";

export default function usePathWithParams(): string {
  const location = useLocation();
  return `${location.pathname}${location.search}${location.hash}`;
}

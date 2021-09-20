import classNames from "classnames";
import * as React from "react";

function Loading(): JSX.Element {
  const [loading, setLoading] = React.useState(false);
  const [loadingSlow, setLoadingSlow] = React.useState(false);

  React.useEffect(() => {
    const id = setTimeout(() => {
      setLoading(true);
    }, 500);
    const idSlow = setTimeout(() => {
      setLoadingSlow(true);
    }, 3000);

    return () => {
      clearTimeout(id);
      clearTimeout(idSlow);
    };
  }, []);

  return (
    <div
      className={classNames(
        "bg-gray-50 fixed h-screen w-screen z-30 top-0 flex",
        { hidden: !loading && !loadingSlow }
      )}
    >
      <div className="self-center w-full justify-center items-center space-x-2 text-gray-500 mb-12 flex">
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-lg">{loadingSlow && "仍在"}加载中……</span>
      </div>
    </div>
  );
}

export default Loading;

import * as React from "react";

function Image({ src, isHiding }: ImageProps): JSX.Element {
  const [hiding, setHiding] = React.useState(isHiding);

  if (hiding) {
    return (
      <button type="button" onClick={() => setHiding(false)}>
        点击查看图片
      </button>
    );
  }

  return <img src={src} className="max-w-[70%]" alt="" />;
}

type ImageProps = {
  src: string;
  isHiding: boolean;
};

export default Image;

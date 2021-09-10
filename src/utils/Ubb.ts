// https://github.com/ZJU-CC98/Forum/blob/1ae75fc102f1645a272366ca5c2cdad7c0cd7c3a/CC98.Forum/CC98.Forum/Ubb/UbbCodeExtension.tsx

import reactPreset from "@bbob/preset-react";

const ubbPreset = reactPreset;

const ubbOptions = { onlyAllowTags: ["b"] };

export { ubbOptions, ubbPreset };

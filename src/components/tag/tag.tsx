import React from "react";
import { tagTypeMap } from "./utils";

interface TagProps {
  type: "open" | "done" | "overdue";
}

const Tag: React.FC<TagProps> = ({ type }) => {
  return (
    <div
      className={"py-1 px-2 rounded-xl text-[10px] font-semibold cursor-default"}
      style={{
        background: tagTypeMap[type]?.bg,
        color: tagTypeMap[type]?.txtClr,
      }}
    >
      {tagTypeMap[type]?.txt ? tagTypeMap[type].txt.toUpperCase() : ""}
    </div>
  );
};

export default Tag;

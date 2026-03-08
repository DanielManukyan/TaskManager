import React from "react";
import { useNavigate } from "react-router";

type Board = {
  BoardId: string;
  title: string;
  bgColor: string;
  visibility: "public" | "private" | "shared";
};

type Props = {
  board: Board;
};

const BoardCard: React.FC<Props> = ({ board }) => {
    const navigate = useNavigate()
    const openBoard = () => {
        navigate(`/board/${board.BoardId}`,  { state: { board } })
      };

  return (
    <div
      className="w-55 h-30 rounded-xl shadow-md cursor-pointer overflow-hidden"
      onClick={openBoard}
    >
      <div
        className="h-[60%]"
        style={{ backgroundColor: board.bgColor }}
      />

      <div className="p-2 bg-white h-[40%] flex flex-col justify-between">
        <p className="font-semibold text-sm">{board.title}</p>

        <span className="text-xs text-gray-500">
          {board.visibility}
        </span>
      </div>
    </div>
  );
};

export default BoardCard;
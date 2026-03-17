import React from "react";
import { useNavigate } from "react-router";
import { deleteBoard, type Board } from "../../features/board/boardSlice";
import { useAppDispatch } from "../../hooks/redux";

type Props = {
  board: Board;
};

const BoardCard: React.FC<Props> = ({ board }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const openBoard = () => {
        navigate(`/board/${board.id}`,  { state: { board } })
      };

    const onDelete = async (e: React.MouseEvent) => {
      e.stopPropagation()
      const ok = window.confirm(`Delete board "${board.title}"?`)
      if (!ok) return
      await dispatch(deleteBoard(board.id))
    }

  return (
    <div
      className="w-55 h-30 rounded-xl shadow-md cursor-pointer overflow-hidden relative"
      onClick={openBoard}
    >
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow"
        aria-label="Delete board"
        title="Delete"
      >
        ×
      </button>
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
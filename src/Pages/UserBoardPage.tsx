import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ColumnsList from "../Components/Columns/ColumnsList";
import { useAppSelector } from "../hooks/redux";
import Header from "../Components/Main/Header/Header";

export default function UserBoardPage() {
  const params = useParams();
  const boardId = params.id ?? "";

  const board = useAppSelector((s) => s.board.boards).find((b) => b.id === boardId);

  const title = useMemo(() => board?.title ?? "Board", [board?.title]);

  if (!boardId) {
    return <div className="p-6">Wrong board id</div>;
  }

  return (
    <div className="">
      <Header />
      <div className="p-6">
        <div className="flex items-center justify-between mt-6">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="text-sm text-gray-500">{board?.visibility ?? ""}</div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <ColumnsList boardId={boardId} />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

interface Card {
  id: string;
  title: string;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

interface ColumnProps {
  column: Column;
  addCard: (columnId: string, title: string) => void;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column, addCard }) => {
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleAddCard = () => {
    if (newCardTitle.trim() === "") return;
    addCard(column.id, newCardTitle);
    setNewCardTitle("");
  };

  return (
    <div className="bg-gray-100 rounded-md p-4 w-64 shrink-0">
      <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
      <div className="flex flex-col">
        {column.cards.map((card) => (
          <div>
            card{card.id}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="Добавить карточку..."
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddCard}
          className="mt-2 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

export default ColumnComponent;
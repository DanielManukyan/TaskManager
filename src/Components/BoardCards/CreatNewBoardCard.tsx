function CreateNewBoardCard({onClick}: {onClick: () => void}) {
    return ( 
        <div onClick={onClick} className="w-60 h-30 bg-gray-200 flex items-center justify-center rounded-lg shadow-md cursor-pointer">
            <h2 className="text-md text-gray-500 font-semibold mb-2 px-4 py-2">Create New Board</h2>
        </div>
     );
}

export default CreateNewBoardCard;
import { useState } from 'react'
import BoardCard from '../../BoardCards/BoardCard'
import CreateBoardModal from '../../BoardCards/CreateBoardModal'
import CreateNewBoardCard from '../../BoardCards/CreatNewBoardCard'
import { useAppSelector } from '../../../hooks/redux'
import "../../../index.css"

function UserWorkspaces() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const boards = useAppSelector(s => s.board.boards)

  const openModal = () => {
    setIsModalOpen(true)
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.classList.remove('modal-open')
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-2">
        <h1 className="text-md font-semibold">Your Workspaces</h1>
      </div>

      <div className="flex gap-6 mt-4 flex-wrap">
        {boards.map(board => (
          <div key={board.id} className="w-60 h-32 rounded-lg">
            <BoardCard board={board} />
          </div>
        ))}

        <div className="w-60 h-32 rounded-lg">
          <CreateNewBoardCard onClick={openModal} />
        </div>

        {isModalOpen && <CreateBoardModal onClose={closeModal} />}
      </div>
    </div>
  )
}

export default UserWorkspaces
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { createBoardWithColumns } from '../../features/board/boardSlice'

interface CreateBoardModalProps {
  onClose: () => void
}

function CreateBoardModal({ onClose }: CreateBoardModalProps) {
  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (!title.trim()) return

  dispatch(createBoardWithColumns({ title, bgColor: '#ccc', visibility: 'private' }))
  setTitle('')
  onClose()
}

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Create Board</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Board title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            autoFocus
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Board
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBoardModal
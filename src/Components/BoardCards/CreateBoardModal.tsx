import { useMemo, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { createBoardWithColumns } from '../../features/board/boardSlice'

interface CreateBoardModalProps {
  onClose: () => void
}

function CreateBoardModal({ onClose }: CreateBoardModalProps) {
  const [title, setTitle] = useState('')
  const [bgColor, setBgColor] = useState('#0ea5e9')
  const [visibility, setVisibility] = useState<'private' | 'workspace' | 'public'>('public')
  const [touched, setTouched] = useState(false)
  const dispatch = useAppDispatch()

  const isValid = useMemo(() => title.trim().length > 0, [title])

  const presetColors = useMemo(
    () => ['#10b981', '#6366f1', '#f59e0b', '#3b82f6', '#06b6d4'],
    []
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return

    dispatch(createBoardWithColumns({ title: title.trim(), bgColor, visibility }))
    setTitle('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-105 max-w-[92vw] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create New Board</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div
          className="w-full h-32 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <div className="w-[75%] h-[70%] rounded-lg bg-white/25 border border-white/30 relative">
            <div className="absolute left-3 top-3 w-10 h-14 rounded bg-white/35" />
            <div className="absolute left-1/2 -translate-x-1/2 top-5 w-10 h-16 rounded bg-white/35" />
            <div className="absolute right-3 top-4 w-10 h-12 rounded bg-white/35" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-semibold text-gray-800 mb-2">Background</div>
            <div className="flex items-center gap-3">
              {presetColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setBgColor(c)}
                  className={`h-10 w-10 rounded-lg border ${
                    bgColor === c ? 'border-gray-900 ring-2 ring-gray-900/10' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800">
              Board Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter board title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onBlur={() => setTouched(true)}
              className="mt-2 border rounded px-3 py-2 w-full"
              autoFocus
            />
            {!isValid && touched && (
              <div className="mt-2 text-sm text-gray-700">👋 Board title is required</div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800">Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as typeof visibility)}
              className="mt-2 border rounded px-3 py-2 w-full bg-white"
            >
              <option value="public">Public</option>
              <option value="workspace">Workspace</option>
              <option value="private">Private</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`px-4 py-2 rounded font-semibold ${
              isValid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Create Board
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBoardModal
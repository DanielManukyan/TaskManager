Как всё работает

1) Что вообще за проект

Это Trello‑подобное приложение:

Board (доска) — например “Work”.
Column (колонка) — “Todo / Doing / Done”.
Task (карточка/задача) — текст внутри колонки.
Все данные лежат в db.json и отдаются через json-server.

2) Сервер: json-server

Как запускать
npm run server → поднимает API на http://localhost:3001
Он читает и сам изменяет db.json.
Какие “таблицы”
Файл db.json примерно такой:

boards: []
columns: []
tasks: []
Какие запросы делает фронт
В src/features/db/dbTable.ts:

GET
/boards, /columns, /tasks — загрузка данных
POST
/boards, /columns, /tasks — создание
PATCH
/boards/:id, /columns/:id, /tasks/:id — изменение (частичное)
DELETE
/boards/:id, /columns/:id, /tasks/:id — удаление
Важно: json-server у тебя генерирует id как строку (типа "680d"), поэтому в коде id — string.

3) Фронт: React + Redux Toolkit
Store (общая память приложения)
В src/app/store.ts подключены 3 слайса:

board
column
task
Что такое slice
Slice — это:

state (данные в памяти)
actions/reducers (как менять данные)
thunks (асинхронные действия: запросы на сервер)
4) Загрузка данных при старте
В src/App.tsx при открытии приложения делается:

dispatch(fetchBoards())
dispatch(fetchColumns())
dispatch(fetchTasks())
Это тянет данные с json-server и кладёт в Redux.

5) Создание / изменение / удаление (и почему сохраняется)
Создание
Например задача:

UI вызывает dispatch(addTask({ title, columnId }))
thunk делает POST /tasks
сервер возвращает задачу с id
slice добавляет её в state.task.tasks
UI сразу показывает новую карточку
Изменение
Например переименовать карточку или поменять order/columnId:

dispatch(updateTask({ id, patch }))
thunk делает PATCH /tasks/:id
сервер возвращает обновлённый объект
slice заменяет задачу в state
Удаление
dispatch(deleteTask(id))
thunk делает DELETE /tasks/:id
slice удаляет задачу из state
Поэтому после обновления страницы данные не пропадают: они реально лежат в db.json.

6) Порядок (как Trello)
Чтобы знать порядок, мы храним число:

Column.order
Task.order
UI сортирует:

колонки: по order
задачи внутри колонки: по order
Когда ты перетаскиваешь, мы пересчитываем order и делаем PATCH, чтобы порядок сохранился.

7) DnD (перетаскивание) — как это работает
Главные части из @dnd-kit
DndContext (в ColumnsList)

слушает drag‑события
самое важное событие: onDragEnd
useSortable (в SortableColumn и SortableTask)

делает элемент перетаскиваемым
даёт setNodeRef (к чему “прицепить” drag)
даёт listeners/attributes (какие события слушать)
даёт transform/transition (как красиво двигать)
SortableContext

говорит: “вот список элементов, их порядок можно менять”
для задач — внутри каждой колонки свой список
для колонок — список колонок
Что происходит при отпускании мыши (onDragEnd)
Есть два случая:

Тащили колонку
мы меняем порядок массива колонок (на фронте)
пересчитываем order
делаем PATCH /columns/:id для каждой колонки, где order изменился
Тащили задачу
если перенесли в другую колонку:
меняем columnId у задачи
в любом случае:
пересчитываем order задач в колонках
делаем PATCH /tasks/:id (order/columnId)
8) Почему раньше страница “перезагружалась” от перетаскивания
json-server менял db.json, Vite в dev‑режиме видел изменения файла и делал reload.

Я добавил в vite.config.ts игнор db.json, поэтому теперь страница не перезагружается, но сохранение остаётся.

9) Как тебе это запускать “по шагам”
Терминал 1:
npm run server
Терминал 2:
npm run dev
Открой приложение, создай доску, добавь задачи, потаскай — и обнови страницу: всё должно остаться.
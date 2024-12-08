"use client";
import { useState } from 'react';
import { TaskAddOrEditModal } from '../components/TaskAddOrEditModal';
import { AddButton } from '../components/Buttons/AddButton';
import { TaskView } from '../components/TaskView';
import { SearchBox } from '../components/SearchBox';
import { Loading } from '../components/Loading';

import { useGetTasks } from '../hooks/tasks/useGetTasks';
import { useDeleteTask } from '../hooks/tasks/useDeleteTask';

import { useSearchTask } from '../hooks/search/useSearchTask';
import { useExpireTaskFilter } from '../hooks/filter/useExpiresAtTaskFilter';
import { useCreatedAtTaskFilter } from '../hooks/filter/useCreatedAtTaskFilter';

import { Task } from '../api/tasks';
import { AuthGuard } from '../components/guard/AuthGuard';

const TaskComponent = (): JSX.Element => {

  const [isOpen, setIsOpen] = useState(false);
  const [editTargetTask, setEditTargetTask] = useState<Task | null>(null);

  // タスク操作処理
  const { tasks, handleGetTasks, setTasks, isLoading } = useGetTasks();
  const { handleDeleteTask } = useDeleteTask({ renewTasks: handleGetTasks });

  // 検索処理
  const { searchResult, searchWord, handleSearch } = useSearchTask(tasks);

  // フィルタ処理
  const { handleExpireOrder } = useExpireTaskFilter(tasks, setTasks);
  const { handleCreateOrder } = useCreatedAtTaskFilter(tasks, setTasks);

  const handleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 text-gray-800 h-screen">
      <div className="w-1/2 text-center bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
          <AddButton title='タスクの追加' onClick={handleModal} />
        </div>
        <div className="flex justify-between items-center mb-4">
          <SearchBox searchWord={searchWord} handleSearch={handleSearch} />
        </div>

        {
          isLoading ? <Loading /> : (
            <TaskView
              tasks={tasks}
              searchResult={searchResult}
              setEditTargetTask={setEditTargetTask}
              handleDelete={handleDeleteTask}
              handleModal={handleModal}
              handleExpireOrder={handleExpireOrder}
              handleCreateOrder={handleCreateOrder}
            />
          )
        }
      </div>

      <div className="ml-6">
        {isOpen && (
          <TaskAddOrEditModal
            handleGetTasks={handleGetTasks}
            handleModal={handleModal}
            open={isOpen}
            editTargetTask={editTargetTask}
            setEditTargetTask={setEditTargetTask}
            modalTitle={editTargetTask ? 'タスクの編集' : 'タスクの追加'}
            submitBtnTitle={editTargetTask ? '保存' : '追加'}
          />
        )}
      </div>
    </div>
  );
}

export default function TaskLists() {
  return (
    <AuthGuard>
      <TaskComponent />
    </AuthGuard>
  )
}

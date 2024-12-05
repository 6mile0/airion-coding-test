"use client";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { MessageDialog } from '../components/AddTaskModal';
import { AddButton } from '../components/Buttons/Add';
import { TaskView } from '../components/TaskView';
import { TaskRequestBody } from '../schema/tasks/request';
import { SearchBox } from '../components/SearchBox';
import { Loading } from '../components/Loading';

import { useGetTasks } from '../hooks/useGetTasks';
import { useAddTask } from '../hooks/useAddTask';
import { useEditTask } from '../hooks/useEditTask';
import { useDeleteTask } from '../hooks/useDeleteTask';

import { useSearchTask } from '../hooks/search/useSearchTask';
import { useExpireTaskFilter } from '../hooks/filter/useExpiresAtTaskFilter';
import { useCreatedAtTaskFilter } from '../hooks/filter/useCreatedAtTaskFilter';

import 'react-toastify/dist/ReactToastify.css';

export default function TaskLists() {
  const [isOpen, setIsOpen] = useState(false);
  const [taskRequestBody, setTaskRequestBody] = useState<TaskRequestBody>({
    title: '',
    description: '',
    expires_at: ''
  });

  // タスク操作処理
  const { tasks, handleGetTasks, setTasks, isLoading } = useGetTasks();
  const { submitAddTask } = useAddTask({ taskRequestBody, setTaskRequestBody, renewTasks: handleGetTasks });
  const { handleOpenEditModal, submitEditTask, editTaskId, handleCancelEdit } = useEditTask({ taskRequestBody, setTaskRequestBody, renewTasks: handleGetTasks });
  const { handleDeleteTask } = useDeleteTask({ renewTasks: handleGetTasks });

  // 検索処理
  const { searchResult, searchWord, handleSearch } = useSearchTask(tasks);

  // フィルタ処理
  const { handleExpireOrder } = useExpireTaskFilter(tasks, setTasks);
  const { handleCreateOrder } = useCreatedAtTaskFilter(tasks, setTasks);

  // タスク追加・編集モーダルの表示
  const handleOpenModal = (task_id?: string) => {
    const targetTask = searchResult || tasks;
    handleOpenEditModal(targetTask, task_id);
    setIsOpen(true);
  };

  // タスク追加・編集送信処理、モーダルの非表示化
  const handleSubmit = () => {
    if (editTaskId) {
      submitEditTask();
    } else {
      submitAddTask();
    }
    setIsOpen(false);
  };

  const onCancel = () => {
    setIsOpen(false);
    handleCancelEdit();
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 text-gray-800 h-screen">
      <div className="w-1/2 text-center bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
          <AddButton title='タスクの追加' onClick={handleOpenModal} />
        </div>
        <div className="flex justify-between items-center mb-4">
          <SearchBox searchWord={searchWord} handleSearch={handleSearch} />
        </div>

        {
          isLoading ? <Loading /> : (
            <TaskView
              tasks={tasks}
              searchResult={searchResult}
              handleOpenModal={handleOpenModal}
              handleDelete={handleDeleteTask}
              handleExpireOrder={handleExpireOrder}
              handleCreateOrder={handleCreateOrder}
            />
          )
        }
      </div>

      <div className="ml-6">
        {isOpen && (
          <MessageDialog
            onSubmit={handleSubmit}
            onCancel={onCancel}
            open={isOpen}
            taskRequestBody={taskRequestBody}
            setTaskRequestBody={setTaskRequestBody}
            modalTitle={editTaskId ? 'タスクの編集' : 'タスクの追加'}
            submitBtnTitle={editTaskId ? '保存' : '追加'}
          />
        )}
      </div>

      <div className="fixed bottom-0 right-0 p-4">
        <ToastContainer />
      </div>
    </div>
  );
}

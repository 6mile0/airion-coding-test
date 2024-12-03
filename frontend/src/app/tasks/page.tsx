"use client";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { MessageDialog } from '../components/AddTaskModal';
import AddButton from '../components/Buttons/Add';
import { useAddTask } from '../hooks/useAddTask';
import useEditTask from '../hooks/useEditTask';
import { useGetTasks } from '../hooks/useGetTasks';
import { TaskTable } from '../components/TaskTable';

import 'react-toastify/dist/ReactToastify.css';
import { useDeleteTask } from '../hooks/useDeleteTask';

export default function TaskLists() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { tasks, handleGetTasks } = useGetTasks();
  const { handleAddTask } = useAddTask({ title, description, renewTasks: handleGetTasks });
  const { handleEditTask, editTaskId, setEditTaskId } = useEditTask({ title, description, renewTasks: handleGetTasks });
  const { handleDeleteTask } = useDeleteTask({ renewTasks: handleGetTasks });

  const handleOpenModal = (task_id?: string) => {
    if (task_id) {
      setEditTaskId(task_id);
      const task = tasks.find((task) => task.task_id === task_id);
      setTitle(task?.title || '');
      setDescription(task?.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (editTaskId) {
      handleEditTask();
    } else {
      handleAddTask();
    }
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 text-gray-800 h-screen">
      <div className="w-1/2 text-center bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
          <AddButton title='タスクの追加' onClick={handleOpenModal} />
        </div>
        <TaskTable
          tasks={tasks}
          handleOpenModal={handleOpenModal}
          handleDelete={handleDeleteTask}
        />
      </div>

      <div className="ml-6">
        {isOpen && (
          <MessageDialog
            onSubmit={handleSubmit}
            onCancel={() => setIsOpen(false)}
            open={isOpen}
            title={title}
            description={description}
            setTile={setTitle}
            setDescription={setDescription}
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

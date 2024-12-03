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

export default function TaskLists() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { tasks, handleGetTasks } = useGetTasks();
  const { handleAddTask } = useAddTask({ title, description, renewTasks: handleGetTasks });
  const { editTask } = useEditTask({ title, description });

  const handleOpenModal = (id?: string) => {
    if (id) {
      setIsEdit(true);
      const task = tasks.find((task) => task.task_id === id);
      setTitle(task?.title || '');
      setDescription(task?.description || '');
    } else {
      setIsEdit(false);
      setTitle('');
      setDescription('');
    }
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log('Delete task:', id);
  }

  const handleSubmit = () => {
    if (isEdit) {
      editTask();
    } else {
      handleAddTask();
    }
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-1/2 text-center bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
          <AddButton title='タスクの追加' onClick={() => handleOpenModal()} />
        </div>
        <TaskTable
          tasks={tasks}
          handleOpenModal={handleOpenModal}
          handleDelete={handleDelete}
          setIsEdit={setIsEdit} />
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
            modalTitle={isEdit ? 'タスクの編集' : 'タスクの追加'}
            submitBtnTitle={isEdit ? '保存' : '追加'}
          />
        )}
      </div>

      <div className="fixed bottom-0 right-0 p-4">
        <ToastContainer />
      </div>
    </div>
  );
}

"use client";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { MessageDialog } from '../components/AddTaskModal';
import AddButton from '../components/Buttons/Add';
import { useAddTask } from '../hooks/useAddTask';
import useEditTask from '../hooks/useEditTask';
import 'react-toastify/dist/ReactToastify.css';

export default function TaskLists() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { handleAddTask } = useAddTask({ title, description });
  const { editTask } = useEditTask({ title, description });

  const [tasks, setTasks] = useState(['task1', 'task2', 'task3']);

  const handleOpenModal = (id?: string) => {
    if(id) {
      setIsEdit(true);
      setTitle(tasks[parseInt(id)]);
      setDescription(tasks[parseInt(id)]);
    }else{
      setIsEdit(false);
      setTitle('');
      setDescription('');
    }
    setIsOpen(true);
  };

  const handleDelete = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if(isEdit){
      editTask();
    }else{
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
        <ul className="list-disc list-inside">
          {tasks.map((task, index) => (
            <li key={index} className="text-left flex justify-between items-center">
              {task}
              <div>
                <button onClick={() => {
                  setIsEdit(true);
                  handleOpenModal(index.toString());
                }} className="text-blue-500 mr-2">編集</button>
                <button onClick={() => handleDelete(index)} className="text-red-500">削除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="ml-6">
        {isOpen && (
          <MessageDialog
            onSubmit={handleSubmit}
            onCancel={() => setIsOpen(false)}
            open={isOpen}
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

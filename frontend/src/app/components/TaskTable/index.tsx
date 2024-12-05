import React from 'react';
import { Task } from '../../api/tasks';
import { convertDate } from '../../utils/convertDate';
import { FilterButton } from '../Buttons/FilterButton';

import { useExpireTaskFilter } from '../../hooks/filter/useExpiresAtTaskFilter';
import { useCreatedAtTaskFilter } from '../../hooks/filter/useCreatedAtTaskFilter';

type TaskTableProps = {
  tasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleOpenModal: (task_id: string) => void;
  handleDelete: (task_id: string) => void;
}

export const TaskTable = ({ tasks, setFilteredTasks, handleOpenModal, handleDelete }: TaskTableProps) => {

  const { handleExpireOrder } = useExpireTaskFilter(tasks, setFilteredTasks);
  const { handleCreateOrder } = useCreatedAtTaskFilter(tasks, setFilteredTasks);

  if(tasks.length === 0) {
    return <div>タスクがありません</div>
  }

  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">タイトル</th>
          <th className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">詳細</th>
          <th className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">
            <FilterButton itemName="期限日" onClick={() => handleExpireOrder()} />
          </th>
          <th className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">
            <FilterButton itemName="作成日" onClick={() => handleCreateOrder()} />
          </th>
          <th className="border-t border-b border-l border-r border-gray-200 px-4 py-2">操作</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{task.title}</td>
            <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{task.description}</td>
            <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{convertDate(task.expires_at, false)}</td>
            <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{convertDate(task.created_at)}</td>
            <td className="border-t border-b border-l border-r border-gray-200 px-4 py-2">
              <button onClick={() => {
                handleOpenModal(task.task_id);
              }} className="text-blue-500 mr-2">編集</button>
              <button onClick={() => handleDelete(task.task_id)} className="text-red-500">削除</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

import React from 'react';
import { Task } from '../../api/tasks';
import { FilterButton } from '../Buttons/FilterButton';
import { convertDate } from '@/app/utils/convertDate';

type TaskTableProps = {
  tasks: Task[];
  searchResult: Task[] | null;
  setEditTargetTask: (task: Task) => void;
  handleModal: () => void;
  handleDelete: (task_id: string) => void;
  handleExpireOrder: () => void;
  handleCreateOrder: () => void;
}

export const TaskView = ({ tasks, searchResult, setEditTargetTask, handleDelete, handleExpireOrder, handleCreateOrder, handleModal }: TaskTableProps) => {

  const targetTasks = searchResult || tasks;
  
  if (tasks && searchResult && searchResult.length == 0) {
    return <p>検索結果がありません</p>
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
        {
          targetTasks.map((task, index) => (
            <tr key={index}>
              <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{task.title}</td>
              <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{task.description}</td>
              <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{convertDate(task.expires_at, false)}</td>
              <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{convertDate(task.created_at)}</td>
              <td className="border-t border-b border-l border-r border-gray-200 px-4 py-2">
                <button onClick={() => {
                  setEditTargetTask(task);
                  handleModal();
                }} className="text-blue-500 mr-2">編集</button>
                <button onClick={() => handleDelete(task.task_id)} className="text-red-500">削除</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

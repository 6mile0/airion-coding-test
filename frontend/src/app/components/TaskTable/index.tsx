import React from 'react';
import { Task } from '../../api/tasks';
import { convertDate } from '../../utils/convertDate';

type TaskTableProps = {
    tasks: Task[];
    handleOpenModal: (task_id: string) => void;
    handleDelete: (task_id: string) => void;
}

export const TaskTable = ({ tasks, handleOpenModal, handleDelete}: TaskTableProps) => {
    return (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">タイトル</th>
              <th className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">詳細</th>
              <th className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">期日</th>
              <th className="border-t border-b border-l border-r border-gray-200 px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{task.title}</td>
                <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{task.description}</td>
                <td className="text-left border-t border-b border-l border-r border-gray-200 px-4 py-2">{convertDate(task.expires_at)}</td>
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

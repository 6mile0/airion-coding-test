import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { AddButton } from '../Buttons/Add';
import { TaskRequestBody } from '@/app/schema/tasks/request';

import "react-datepicker/dist/react-datepicker.css";

export type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  modalTitle: string;
  submitBtnTitle: string;
  taskRequestBody: TaskRequestBody;
  setTaskRequestBody: (taskRequestBody: TaskRequestBody) => void;
};

export const MessageDialog = ({ open, onCancel, onSubmit, modalTitle, submitBtnTitle, taskRequestBody, setTaskRequestBody }: ModalProps) => {
  const [startDate, setStartDate] = useState<Date | null>(taskRequestBody.expires_at ? new Date(Number(taskRequestBody.expires_at)) : null);

  const handleDateTimeChange = (date: Date | null) => {
    setStartDate(date);
    setTaskRequestBody({ ...taskRequestBody, expires_at: date?.getTime().toString() || '' });
  }

  return open && (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => onCancel()}></div>
      <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-[26rem] p-5 flex flex-col items-start fixed z-20 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-5">{modalTitle}</h1>

        <label className='text-md mb-1'>タイトル</label>
        <input
          className='w-full h-10 border border-gray-300 rounded-md mb-5 px-3'
          placeholder='買い物'
          value={taskRequestBody.title}
          onChange={(e) => setTaskRequestBody({ ...taskRequestBody, title: e.target.value })}
        />

        <label className='text-md mb-1'>詳細</label>
        <textarea
          className='w-full h-20 border border-gray-300 rounded-md mb-5 px-3'
          placeholder='牛乳を買う'
          value={taskRequestBody.description}
          onChange={(e) => setTaskRequestBody({ ...taskRequestBody, description: e.target.value })}
        />

        <label className='text-md mb-1'>期限日</label>
        <DatePicker
          className="w-full h-10 border border-gray-300 rounded-md mb-5 px-3"
          selected={startDate}
          onChange={(date) => handleDateTimeChange(date)}
          dateFormat={"yyyy/MM/dd"}
          placeholderText="クリックして選択"
        />

        <div className="flex justify-end w-full">
          <AddButton title={submitBtnTitle} onClick={onSubmit} />
        </div>
      </div>
    </>
  );
};

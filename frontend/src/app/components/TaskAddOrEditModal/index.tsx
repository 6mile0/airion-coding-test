import React from "react";
import DatePicker from "react-datepicker";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TaskRequestBody } from '../../schema/tasks/request';
import { Task } from "../../api/tasks";


import { useEditTask } from "../../hooks/tasks/useEditTask";
import { useAddTask } from "../../hooks/tasks/useAddTask";

import "react-datepicker/dist/react-datepicker.css";

export type ModalProps = {
  open: boolean;
  editTargetTask: Task | null;
  setEditTargetTask: (task: Task | null) => void;
  handleModal: () => void;
  handleGetTasks: () => void;
  modalTitle: string;
  submitBtnTitle: string;
};

export const TaskAddOrEditModal = ({ open, modalTitle, submitBtnTitle, handleGetTasks, editTargetTask, handleModal, setEditTargetTask }: ModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskRequestBody>();

  const { submitAddTask } = useAddTask({ renewTasks: handleGetTasks });
  const { submitEditTask } = useEditTask({ renewTasks: handleGetTasks});

  const onSubmit: SubmitHandler<TaskRequestBody> = (data) => {

    console.log('data:', data);
    if (editTargetTask) {
      submitEditTask(data, editTargetTask.task_id);
    }else {
      submitAddTask(data);
    }
    handleModal();
  }

  const onCancel = () => {
    handleModal();
    setEditTargetTask(null);
  }

  return open && (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => onCancel()}></div>
      <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-20 p-8 rounded-lg shadow-lg w-1/3">
        <h1 className="text-xl font-bold mb-5">{modalTitle}</h1>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex flex-col w-full mb-5">
            <label className='text-md mb-1'>タイトル</label>
            <input
              className='w-full h-10 border border-gray-300 rounded-md px-3'
              placeholder='買い物'
              {...register("title", { required: true })}
              defaultValue={editTargetTask ? editTargetTask.title : ""}
            />
            <p className='text-red-500 text-sm mt-1'>{errors.title && "タイトルは必須です"}</p>
          </div>

          <div className="flex flex-col w-full mb-5">
            <label className='text-md mb-1'>詳細</label>
            <textarea
              className='w-full h-20 border border-gray-300 rounded-md px-3'
              placeholder='牛乳を買う'
              {...register("description")}
              defaultValue={editTargetTask ? editTargetTask.description : ""}
            />
          </div>

          <div className="flex flex-col w-full mb-5">
            <label className='text-md mb-1'>期限日</label>
            <Controller
              control={control}
              name="expires_at"
              rules={{ required: true }}
              defaultValue={editTargetTask ? editTargetTask.expires_at : ""}
              render={({ field }) => {
                const date = field.value ? new Date(Number(editTargetTask ? editTargetTask.expires_at : field.value)) : null;
                return (
                  <DatePicker
                    selected={date}
                    onChange={(date) => field.onChange(date?.getTime().toString())}
                    dateFormat="yyyy/MM/dd"
                    className='w-full h-10 border border-gray-300 rounded-md px-3'
                    placeholderText='期日を選択してください'
                  />
                )
              }}
            />
            <p className='text-red-500 text-sm mt-1'>{errors.expires_at && "期限日は必須です"}</p>
          </div>

          <div className="flex justify-end w-full">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {submitBtnTitle}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

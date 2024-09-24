"use client";

import { Button, CardTodo, ModalConfirm, ModalForm } from "@/components";
import { completeTodo, deleteTodo, RootState } from "@/store";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Todos = () => {
  const { user, todos } = useSelector((state: RootState) => state.todos);
  const [modalShow, setModalShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState<{ type: string; id: string }>({
    type: "",
    id: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const handleShowModal = () => {
    setModalShow((prevState) => !prevState);
  };

  const handleConfirm = (type: string, id: string) => {
    setConfirmShow({ type, id });
  };

  const hitConfirm = () => {
    if (confirmShow?.type === "complete") {
      dispatch(completeTodo(confirmShow.id));
    } else {
      dispatch(deleteTodo(confirmShow.id));
    }

    handleConfirm("", "");
  };

  return (
    <>
      <div className="min-h-screen p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Hi, {user}</h1>
          <div className="flex flex-col gap-4 my-8">
            {todos.map((todo, idx) => (
              <CardTodo key={idx} data={todo} onAction={handleConfirm} />
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 right-0 z-20 mr-4 mb-4">
          <Button
            variant="success"
            shape="circle"
            size="large"
            onClick={handleShowModal}
            icon={<PlusIcon className="size-8" />}
          />
        </div>
      </div>

      <ModalForm isOpen={modalShow} onClose={handleShowModal} />
      <ModalConfirm
        isOpen={Boolean(confirmShow?.id)}
        onCancel={() => handleConfirm("", "")}
        type={confirmShow?.type}
        onConfirm={hitConfirm}
      />
    </>
  );
};

export default Todos;

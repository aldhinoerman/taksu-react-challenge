"use client";

import { Button, ModalForm } from "@/components";
import { completeTodo, deleteTodo, RootState } from "@/store";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Todos = () => {
  const { user, todos } = useSelector((state: RootState) => state.todos);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const handleShowModal = () => {
    setModalShow((prevState) => !prevState);
  };

  return (
    <>
      <div className="min-h-screen px-8 py-10 flex flex-col justify-between gap-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Hi, {user}</h1>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="text-white">
                <span>{todo.title}</span>
                <button onClick={() => dispatch(completeTodo(todo.id))}>
                  {todo.completed ? "Undo" : "Done"}
                </button>
                <button onClick={() => dispatch(deleteTodo(todo.id))}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
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
    </>
  );
};

export default Todos;

import { ITodo } from "@/utils";
import React from "react";
import { Tag } from "../tag";
import moment from "moment";
import { Button } from "../button";
import { TrashIcon } from "@heroicons/react/24/solid";

interface CardTodoProps {
  data: ITodo;
  onAction: (type: string, id: string) => void;
}

const CardTodo: React.FC<CardTodoProps> = ({ data, onAction }) => {
  return (
    <>
      <div className="rounded-lg bg-neutral p-4">
        <div className="flex align-middle justify-between">
          <Tag
            type={
              data && data?.completed
                ? "done"
                : !data?.completed &&
                  moment(data?.dueDate).unix() < moment().unix()
                ? "overdue"
                : "open"
            }
          />
          <Button
            size="small"
            variant="primary"
            icon={<TrashIcon className="size-4 my-auto" />}
            onClick={() => onAction("delete", data?.id)}
          />
        </div>
        <div className="flex gap-4 justify-between my-2">
          <div>
            <h4 className="text-xl font-semibold my-2">{data?.title ?? "-"}</h4>
            <p className="font-light">Due Date:</p>
            <p className="font-light">
              {data && data?.dueDate
                ? moment(data.dueDate).format("DD MMMM YYYY HH:mm:ss")
                : "-"}
            </p>
          </div>

          <div className="flex align-bottom">
            <Button
              variant="info"
              size="large"
              className="mt-auto"
              onClick={() => onAction("complete", data?.id)}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTodo;

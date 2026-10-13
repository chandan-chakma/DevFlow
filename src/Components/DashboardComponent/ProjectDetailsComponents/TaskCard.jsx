import React from "react";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
    } = useDraggable({
        id: task._id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative"
        >
            {children}

            <button
                type="button"
                {...listeners}
                {...attributes}
                className="absolute right-3 top-3 cursor-grab text-slate-400"
            >
                ⠿
            </button>
        </div>
    );
};

export default TaskCard;
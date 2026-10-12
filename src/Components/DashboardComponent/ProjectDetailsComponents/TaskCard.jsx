import React from 'react';
import {
    useDraggable,
} from '@dnd-kit/core';
import { LuCalendarDays } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
const TaskCard = ({
    task,
    onSelect,
    onDelete,
    selectedTask,
    priorityStyle
}) => {
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
                    {...listeners}
                    {...attributes}
                    onClick={() => onSelect(task)}
                    className={`cursor-grab rounded-xl border bg-base-100 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing ${selectedTask?._id === task._id
                            ? "border-primary"
                            : "border-base-300"
                        }`}
                >
        
                    {/* Title */}
        
                    <h4 className="mb-1 text-sm font-bold text-slate-700">
                        {task.title}
                    </h4>
        
        
                    {/* Description */}
        
                    <p className="mb-3 line-clamp-2 text-xs leading-5 text-muted">
                        {task.description}
                    </p>
        
        
                    {/* Date */}
        
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted">
        
                        <LuCalendarDays size={14} />
        
                        <span>
                            {task.dueDate}
                        </span>
        
                    </div>
        
        
                    {/* Priority */}
        
                    <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityStyle(
                            task.priority
                        )}`}
                    >
                        {task.priority}
                    </span>
        
        
                    {/* Bottom */}
        
                    <div className="mt-3 flex items-center justify-between">
        
                        <div className="flex -space-x-2">
                            {/* Members will come later */}
                        </div>
        
        
                        {/* Delete */}
        
                        <MdDelete
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(task._id);
                            }}
                            size={18}
                            className="cursor-pointer text-error"
                        />
        
                    </div>
        
                </div>
    );
};

export default TaskCard;
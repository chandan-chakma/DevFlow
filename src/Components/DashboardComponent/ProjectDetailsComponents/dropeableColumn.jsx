import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, children }) => {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`min-h-32 rounded-xl transition-colors ${isOver ? "bg-primary/10" : ""
                }`}
        >
            {children}
        </div>
    );
};

export default DroppableColumn;
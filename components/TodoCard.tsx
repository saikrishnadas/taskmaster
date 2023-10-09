"use client"

import {DraggableProvidedDragHandleProps,DraggableProvidedDraggableProps} from "react-beautiful-dnd";

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({todo,index,id,innerRef, dragHandleProps,draggableProps}: Props) => {
    return <div
    className="bg-white rounded-md space-y-2 drop-shadow-md"
    {...dragHandleProps}
    {...draggableProps}
    >
        <div className="flex justify-between items-center p-5">
            <p>
                {todo.title}
            </p>
            <button className="text-red-500 hover:text-red-600">
                <XCircleIcon className="ml-5 h-8 w-8" />
            </button>
        </div>
        {/* Add Image */}
    </div>
}

export default TodoCard;
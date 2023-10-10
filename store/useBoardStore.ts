import { databases, storage } from '@/appwrite';
import getTodosGroupedByColumn from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand';

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board:Board) => void;
    updateTodoInDB: (todo:Todo, columnId:TypedColumn) => void;
    deleteTask:(taskIndex:number, todoId:Todo, id:TypedColumn) => void;
    
    searchString:string;
    setSearchString: (searchString: string) => void;

    newTaskInput: string;
    setNewTaskInput:(input:string) => void;

    newTaskType: TypedColumn;
    setNewTaskType: (columnId: TypedColumn) => void;

}

export const useBoardStore = create<BoardState>((set,get) => ({
    board:{
        columns: new Map<TypedColumn, Column>()
    },

    searchString: "",
    newTaskInput:"",
    setSearchString: (searchString) => set({searchString}),
    newTaskType:"todo",

    getBoard: async () => {
        const board = await getTodosGroupedByColumn();
        set({board})
    },

    setBoardState: (board) => set({board}),

    updateTodoInDB: async (todo,columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, 
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId
            }
        )
    },

    deleteTask: async (taskIndex:number,todoId:Todo,id:TypedColumn) => {
        const newColumns = new Map(get().board.columns);

        //delete todoId from newColumns
        newColumns.get(id)?.todo.splice(taskIndex,1);
        set({board:{columns:newColumns}})

        if(todo.image){
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, 
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
            todo.$id
        )
    },
    
    setNewTaskInput: (input:string) => set({newTaskInput:input}),

    setNewTaskType: (columnId:TypedColumn) => set({newTaskType:columnId})

  }))


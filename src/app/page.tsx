"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);

  const addNewTask = async () => {
    const input = document.querySelector(
      "input[type='text']"
    ) as HTMLInputElement;
    if (input && input.value) {
      await createTask({ text: input.value });
      input.value = "";
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewTask();
        }}
        className="flex"
      >
        <input
          type="text"
          placeholder="Task"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 ml-2"
        >
          Add Task
        </button>
      </form>
    </main>
  );
}

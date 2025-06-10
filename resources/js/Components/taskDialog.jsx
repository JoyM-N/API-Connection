import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react'; // Lucide close icon

export default function TaskDialog({ onCreate, onClose }) {
  const [task, setTask] = useState({ 
    task: '', 
    description: '', 
    startTime: '', 
    endTime: '', 
    date: '' 
  });
   const [taskToEdit, setTaskToEdit] = useState(null);// State to hold the task being edited also since it was used in dashboard and it calls the button it should also be used here

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      // If editing, call the onUpdate handler
      onUpdate({ ...task, id: taskToEdit.id });
    } else {
      // If creating, call the onCreate handler, enables actual task creation
      onCreate(task);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
        {/* X icon for closing */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold mb-4">{taskToEdit ? 'Edit Task' : 'Create Task'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task"
            value={task.task}
            onChange={(e) => setTask({ ...task, task: e.target.value })}
            required
            className="w-full border rounded p-2"
          />
          <textarea
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="date"
            value={task.date}
            onChange={(e) => setTask({ ...task, date: e.target.value })}
            className="border rounded p-2 w-full"
          />
          <div className="flex space-x-2">
            <input
              type="time"
              value={task.startTime}
              onChange={(e) => setTask({ ...task, startTime: e.target.value })}
              className="border rounded p-2 w-1/2"
            />
            <input
              type="time"
              value={task.endTime}
              onChange={(e) => setTask({ ...task, endTime: e.target.value })}
              className="border rounded p-2 w-1/2"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {taskToEdit ? 'Update' : 'Create'}
              
            </button>
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

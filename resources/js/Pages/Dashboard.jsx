import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useState, useEffect } from 'react';
import TaskDialog from '../components/TaskDialog';
import TaskTable from '../components/TaskTable';
import { Check, PenLine, Trash } from "lucide-react";
import ConfirmDialog from '../components/ConfirmDialog';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {Toaster, toast} from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



export default function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = Object.values(task).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesStatus = statusFilter === '' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
// Export to Excel handler
const handleExport = async () => {
  if (!filteredTasks.length) {
    toast.error("No tasks to export!");
    return;
  }
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Tasks");

  // Add headers
  // worksheet.addRow(Object.keys(filteredTasks[0]));
  //  Only include needed headers
  worksheet.addRow(["Task", "Description", "Date", "Start Time", "End Time"]);


  // Add data rows
  filteredTasks.forEach((item) => {
    worksheet.addRow([
       item.task,
      item.description,
      item.date,
      item.startTime,
      item.endTime,
      // item.status
    ]);
  });

  // Write to buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Save file
  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "tasks.xlsx");
  toast.success("Tasks exported to Excel!");
};
const handleExportPDF = () => {
  if (!filteredTasks.length) {
    toast.error("No tasks to export!");
    return;
  }
  const doc = new jsPDF();

  // Table columns
  const columns = [
    "Task",
    "Description",
    "Date",
    "Start Time",
    "End Time",
    "Status"
  ];

  // Table rows
  const rows = filteredTasks.map(task => [
    task.task,
    task.description,
    task.date,
    task.startTime,
    task.endTime,
    task.status
  ]);

  doc.text("Tasks", 14, 15);
  // doc.autoTable({
  //   head: [columns],
  //   body: rows,
  //   startY: 20,
  //   styles: { fontSize: 10 }
  // });
  autoTable(doc, {
  head: [columns],
  body: rows,
  startY: 20,
  styles: { fontSize: 10 }
});

  doc.save("tasks.pdf");
  toast.success("Tasks exported to PDF!");
};



  const handleDelete = (taskId) => {
    try {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task.');
    } finally {
      setConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  const markTaskAsDone = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "Done" } : task
    );
    setTasks(updatedTasks);
  };



  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // FIXED: Properly handle task creation
  const handleCreateTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      status: 'pending',
      action: '',
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success('Task created successfully!');
  };

  // FIXED: Properly handle task update
  const handleUpdateTask = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    toast.success('Task updated successfully!');
  };

  const handleMarkDone = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: 'done' } : task));
    toast.success('Task marked as done!');
  };
  const handleEdit = (task) => {
  setTaskToEdit(task);
  setEditDialogOpen(true);
};

  const columns = [
    { header: 'Task', accessorKey: 'task' },
    { header: 'Description', accessorKey: 'description' },
    {
      header: 'Time',
      cell: ({ row }) => {
        const { startTime, endTime } = row.original;
        return `${startTime || '-'} - ${endTime || '-'}`;
      }
    },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Status', accessorKey: 'status' },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }) => {
        const task = row.original;
          return (
      <div className="flex items-center gap-2">
        {/* Edit icon always */}
        <button
          onClick={() => handleEdit(task)}
          className="text-blue-500"
          title="Edit"
        >
          <PenLine className="w-5 h-5" />
        </button>

        {/* Show Check icon only if pending */}
        {task.status === 'pending' && (
          <button
            onClick={() => handleMarkDone(task.id)}
            className="text-green-600"
            title="Mark as Done"
            >
            <Check className="w-5 h-5" />
          </button>
        )}

       <button
  onClick={() => {
    setTaskToDelete(task.id);
    setConfirmOpen(true);
  }}
  className="text-red-500"
  title="Delete"
>
  <Trash className="w-5 h-5" />
</button>
  </div>
    );
  },
},

  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" richColors/>
      <header className="text-2xl font-bold text-center mb-6">Task Manager</header>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setIsDialogOpen(true)}
            >
              Create Task
            </button>
          </div>
          
          {/* Task Dialog for creating new tasks */}
          {isDialogOpen && (
            <TaskDialog
              onCreate={handleCreateTask} // FIXED: Pass the handler directly
              onClose={() => setIsDialogOpen(false)}
            />
          )}

          <div className="flex justify-between items-center mb-4 mt-16">
            <input
              type="text"
              placeholder="Search tasks..."
              className="border p-2 rounded w-1/2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
           {/* <div className="flex gap-2"> */}

            {/* <div className="flex gap-2 items-center">
       <Accordion type="single" collapsible className="w-full max-w-md mb-4">
            <AccordionItem value="filter">
              <AccordionTrigger>🔍 Filter</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <label>Status:</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border rounded p-2 w-full"
                    >
                      <option value="">All</option>
                      <option value="done">Done</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <button className="bg-gray-600 text-white px-4 py-2 rounded">Export</button>
             </div> */}
             <div className="flex gap-2 items-center">
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border rounded h-10 pr-8 pl-2 align-middle"
  >
    <option value="">All Statuses</option>
    <option value="done">Done</option>
    <option value="pending">Pending</option>
  </select>
  <button className="bg-gray-600 text-white px-4 py-2 rounded"
     onClick={handleExport}
  >Export to Excel</button>
  <button
    className="bg-orange-400 text-white px-4 py-2 rounded"
    onClick={handleExportPDF}
  >
    Export to PDF
  </button>
</div>
                </div>

          <TaskTable data={filteredTasks} columns={columns} />
          {/* <TaskTable data={tasks} columns={columns} /> */}


          <ConfirmDialog
            open={confirmOpen}
            onCancel={() => {
              setConfirmOpen(false);
              setTaskToDelete(null);
            }}
            onConfirm={() => {
              handleDelete(taskToDelete);
            }}
          />
          
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>Update the task details below</DialogDescription>
              </DialogHeader>

              {taskToEdit && (
                <div className="space-y-4">
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Task Name"
                    value={taskToEdit.task}
                    onChange={(e) => setTaskToEdit({ ...taskToEdit, task: e.target.value })}
                  />
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Description"
                    value={taskToEdit.description}
                    onChange={(e) => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
                  />
                  <input
                    className="w-full p-2 border rounded"
                    type="date"
                    value={taskToEdit.date}
                    onChange={(e) => setTaskToEdit({ ...taskToEdit, date: e.target.value })}
                  />
                  <input
                    className="w-full p-2 border rounded"
                    type="time"
                    value={taskToEdit.startTime}
                    onChange={(e) => setTaskToEdit({ ...taskToEdit, startTime: e.target.value })}
                  />
                  <input
                    className="w-full p-2 border rounded"
                    type="time"
                    value={taskToEdit.endTime}
                    onChange={(e) => setTaskToEdit({ ...taskToEdit, endTime: e.target.value })}
                  />

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button
                      onClick={() => {
                        handleUpdateTask(taskToEdit); // FIXED: Use the update handler
                        setEditDialogOpen(false);
                        setTaskToEdit(null);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
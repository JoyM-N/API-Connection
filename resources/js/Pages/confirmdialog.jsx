import React from 'react';

function ConfirmDialog({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
        <p className="text-sm text-gray-600 mb-6">
          This action cannot be undone. Do you really want to delete this task?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          {/* <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button> */}
          <Button
  onClick={() => handleDelete(taskToDelete)}
  className="bg-red-500 text-white"
>
  Yes, Delete
</Button>

        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
components/ConfirmDialog.jsx
// import React from 'react';

// export default function ConfirmDialog({ message, onConfirm, onCancel }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
//       <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center">
//         <p className="text-lg mb-4">{message}</p>
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={onConfirm}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Yes, Delete
//           </button>
//           <button
//             onClick={onCancel}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


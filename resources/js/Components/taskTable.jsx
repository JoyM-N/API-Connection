import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

// export default function TaskTable({ data, columns }) {
//   const [sorting, setSorting] = useState([]);

//   const table = useReactTable({
//     data,
//     columns,
//     state: { sorting },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//   });

//   return (
//     <table className="min-w-full border rounded-lg overflow-hidden">
//       <thead className="bg-gray-100">
//         {table.getHeaderGroups().map(headerGroup => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map(header => (
//               <th key={header.id} className="border p-2 text-left cursor-pointer select-none" onClick={header.column.getToggleSortingHandler()}>
//                 {flexRender(header.column.columnDef.header, header.getContext())}
//                 {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody>
//         {table.getRowModel().rows.map(row => (
//           <tr key={row.id} className="hover:bg-gray-50">
//             {row.getVisibleCells().map(cell => (
//               <td key={cell.id} className="border p-2">
//                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
export default function TaskTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const headerGroups = table.getHeaderGroups();
  const leafDepth = headerGroups.length - 1;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup, groupIndex) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isLeafHeader = header.depth === leafDepth;
                const isWeightHeader = ['female_weight', 'male_weight'].includes(header.id);
                
                return (
                  <th 
                    key={header.id} 
                    colSpan={header.colSpan}
                    className={`border p-2 text-center ${
                      isLeafHeader ? 'cursor-pointer select-none' : ''
                    } ${
                      groupIndex === 0 ? 'bg-gray-200 font-bold' : 'bg-gray-150'
                    }`}
                    onClick={isLeafHeader ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className="flex flex-col items-center">
                      {header.isPlaceholder ? null : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                      {isLeafHeader && !isWeightHeader && (
                        <span className="ml-1">
                          {header.column.getIsSorted() === 'asc' ? '🔼' : 
                           header.column.getIsSorted() === 'desc' ? '🔽' : ''}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => {
                const isWeightCell = ['female_weight', 'male_weight'].includes(cell.column.id);
                
                return (
                  <td 
                    key={cell.id} 
                    className={`border p-2 ${isWeightCell ? 'text-center' : ''}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
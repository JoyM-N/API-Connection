import React, { useState,useEffect } from 'react';
import TaskTable from '../components/TaskTable';

function FetchCard() {
  // const [breed, setBreed] = useState(null);
  const [breeds, setBreeds] = useState(() => {
   // Try to load from localStorage first
    const stored = localStorage.getItem('breeds');
    return stored ? JSON.parse(stored) : [];
  });

  const BASE_URL= import.meta.env.VITE_BASE_URL;

  const handleFetch = () => {
    fetch(`${BASE_URL}/breeds`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log("Breed sample:", json.data[0]);
         setBreeds(json.data); // Store all breeds
        // const breeds = json.data;
        // if (breeds.length > 0) {
        //   // Pick a random breed to display each time
        //   const randomIndex = Math.floor(Math.random() * breeds.length);
        //   setBreed(breeds[randomIndex]);
        // }
        localStorage.setItem('breeds', JSON.stringify(json.data)); 
        // Save to localStorage
      })
      .catch(err => console.error("Fetch error:", err));
  };
   // Place useEffect here, after handleFetch
  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line
  }, []);

//     const columns = [
//     { header: 'Name', accessorKey: 'name' },
//     { header: 'Description', accessorKey: 'description' },
   
//     // { header: 'Min Life', accessorKey: 'min_life' },
//     // {
//     //   header:'Female',
//     //   columns: [ // nested headers go here
//     //     { header: 'Max Weight', accessorKey: 'female_max_weight', className: 'subheader' },
//     //     { header: 'Min Weight', accessorKey: 'female_min_weight', className: 'subheader' },
//     //   ]
//     // },
  

//       {
//         id:'max_life',
//         // Header: 'Max Life',
//                 header: () => <span className="bg-gray-100 font-semibold px-2 py-1 rounded">Max Life</span>,

//          accessorKey: 'max_life'
//       },
//       { 
//         id:'min_life',
//         header: () => <span className="bg-gray-100 font-semibold px-2 py-1 rounded">Min Life</span>,
//         accessorKey: 'min_life'
//       },
// //     {
// //        id: 'female',
// //   header: 'Female',

// // },
// {
//   header: 'Female',
//     columns: [
//       { accessorKey: 'female_max_weight', header: 'Max Weight' },
//       { accessorKey: 'female_min_weight', header: 'Min Weight' },
//     ],
//   // id: 'female_max_weight',
//   // header: () => <span className="bg-gray-100 font-semibold px-2 py-1 rounded">Female Max Weight</span>,
//   // accessorKey: 'female_max_weight'
// },
// {
//   id: 'female_min_weight',
//   header: () => <span className="bg-gray-100 font-semibold px-2 py-1 rounded">Female Min Weight</span>,
//   accessorKey: 'female_min_weight'
// },
//        {
//   id: 'male_max_weight',
//   header: () => <span className="bg-gray-100 font-semibold px-2 py-1 rounded">Male Max Weight</span>,
//   accessorKey: 'male_max_weight'
// },
// {
//   id: 'male_min_weight',
//   header: () => <span className="bg-gray-100 font-semibold px-2 py-1 rounded">Male Min W</span>,
//   accessorKey: 'male_min_weight'
// },
//     // {
//     //    id: 'male',
//     //   header: 'Male',
// //       columns: [ // nested headers go here
// //        {
// //   id: 'male_max_weight',
// //   header: () => <span className="bg-gray-100 font-semibold px-2 py-1 rounded">Max Weight</span>,
// //   accessorKey: 'male_max_weight'
// // },
// // {
// //   id: 'male_min_weight',
// //   header: () => <span className="bg-gray-100 font-semibold px-2 py-1 rounded">Min Weight</span>,
// //   accessorKey: 'male_min_weight'
// // },
// //       ]
//     // },

//     {
//   header: 'Hypoallergenic',
//   accessorKey: 'hypoallergenic',
//   cell: ({ row }) => (row.original.hypoallergenic ? 'true' : 'false')
// },

// //     { 
// //       header: 'Actions',
// //       accessorKey: 'actions',
// //       cell: ({ row }) => {
// //         const task = row.original;
// //           return (
// //       <div className="flex items-center gap-2">
// //         {/* Edit icon always */}
// //         <button
// //           onClick={() => handleEdit(task)}
// //           className="text-blue-500"
// //           title="Edit"
// //         >
// //           <PenLine className="w-5 h-5" />
// //         </button>

// //         {/* Show Check icon only if pending
// //         {task.status === 'pending' && (
// //           <button
// //             onClick={() => handleMarkDone(task.id)}
// //             className="text-green-600"
// //             title="Mark as Done"
// //             >
// //             <Check className="w-5 h-5" />
// //           </button>
// //         )} */}

// //        <button
// //   onClick={() => {
// //     setTaskToDelete(task.id);
// //     setConfirmOpen(true);
// //   }}
// //   className="text-red-500"
// //   title="Delete"
// // >
// //   <Trash className="w-5 h-5" />
// // </button>
// //   </div>
// //     );
// //   },
// // },

//   ];
// Update your columns definition to use nested headers
const columns = [
  // Name and Description remain top-level columns
  { 
    header: 'Name', 
    accessorKey: 'name',
    size: 150  // Optional: set column size
  },
  { 
    header: 'Description', 
    accessorKey: 'description',
    size: 250  // Optional: set column size
  },
  
  // Life Span group with 2 sub-headers
  // {
  //   header: 'Life Span',
  //   columns: [
  //     { 
  //       accessorKey: 'max_life', 
  //       header: 'Max Life',
  //       size: 100
  //     },
  //     { 
  //       accessorKey: 'min_life', 
  //       header: 'Min Life',
  //       size: 100
  //     },
  //   ],
  // },
   {
    header: 'Life Span',
    accessorFn: row => `${row.min_life} - ${row.max_life}`,
    id: 'life_span', // Unique ID required for accessorFn columns
    cell: ({ getValue }) => {
      const value = getValue();
      const [min, max] = value.split(' - ');
      
      // Custom styling for the life span display
      return (

          <div className="flex items-center justify-center space-x-1">
            <span className="font-medium">{min} years</span>
            <span className="text-gray-500">-</span>
            <span className="font-medium">{max} years</span>
          </div>
      );
    },
    // Optional: Add sorting based on min weight
    sortingFn: (rowA, rowB) => {
      const aMin = parseFloat(rowA.original.life_min) || 0;
      const bMin = parseFloat(rowB.original.life_min) || 0;
      return aMin - bMin;
    }
  },

  // Female Weight group with 2 sub-headers
  // {
  //   header: 'Female Weight',
  //   columns: [
  //     { 
  //       accessorKey: 'female_max_weight', 
  //       header: 'Max Weight',
  //       size: 120
  //     },
  //     { 
  //       accessorKey: 'female_min_weight', 
  //       header: 'Min Weight',
  //       size: 120
  //     },
  //   ],
  // },
  
  // Male Weight group with 2 sub-headers
  // {
  //   header: 'Male Weight',
  //   columns: [
  //     { 
  //       accessorKey: 'male_max_weight', 
  //       header: 'Max Weight',
  //       size: 120
  //     },
  //     { 
  //       accessorKey: 'male_min_weight', 
  //       header: 'Min Weight',
  //       size: 120
  //     },
  //   ],
  // },
  {
    header: 'Female Weight',
    accessorFn: row => `${row.female_min_weight} - ${row.female_max_weight}`,
    id: 'female_weight', // Unique ID required for accessorFn columns
    cell: ({ getValue }) => {
      const value = getValue();
      const [min, max] = value.split(' - ');
      
      // Custom styling for the weight display
      return (

          <div className="flex items-center justify-center space-x-1">
            <span className="font-medium">{min}kg</span>
            <span className="text-gray-500">-</span>
            <span className="font-medium">{max}kg</span>
          </div>
      );
    },
    // Optional: Add sorting based on min weight
    sortingFn: (rowA, rowB) => {
      const aMin = parseFloat(rowA.original.female_min_weight) || 0;
      const bMin = parseFloat(rowB.original.female_min_weight) || 0;
      return aMin - bMin;
    }
  },
  {
    header: 'Male Weight',
    accessorFn: row => `${row.male_min_weight} - ${row.male_max_weight}`,
    id: 'male_weight',
    cell: ({ getValue }) => {
      const value = getValue();
      const [min, max] = value.split(' - ');
      return (
        // <div className="flex flex-col items-center">vertical
        // horizontally places the min and max values
         <div className="flex items-center justify-center space-x-1">
          <span className="font-medium">{min}kg</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="font-medium">{max}kg</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const aMin = parseFloat(rowA.original.male_min_weight) || 0;
      const bMin = parseFloat(rowB.original.male_min_weight) || 0;
      return aMin - bMin;
    }
  },
  // Hypoallergenic remains top-level
  {
    header: 'Hypoallergenic',
    accessorKey: 'hypoallergenic',
    cell: ({ row }) => (row.original.hypoallergenic ? 'true' : 'false'),
    size: 120
  },
];

  return (
    <div className="p-4">
      {/* <button onClick={handleFetch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Fetch Breed
      </button> */}

      {/* {breed && (
        <div className="mt-4 p-4 border rounded shadow bg-white max-w-md">
          <h2 className="text-lg font-bold">{breed.attributes.name}</h2>
          <p className="mt-2 text-gray-700">{breed.attributes.description || "No description available."}</p>
        </div>
      )} */}
      <TaskTable data={breeds.map(b => ({
  name: b.attributes.name,
  description: b.attributes.description,
  max_life: b.attributes.life?.max ?? 'N/A',
  min_life: b.attributes.life?.min ?? 'N/A',
  female_max_weight: b.attributes.female_weight?.max ?? 'N/A',
  female_min_weight: b.attributes.female_weight?.min ?? 'N/A',
  male_max_weight: b.attributes.male_weight?.max ?? 'N/A',
  male_min_weight: b.attributes.male_weight?.min ?? 'N/A',

  // max_life: b.attributes.max_life,
  // min_life: b.attributes.min_life,
  hypoallergenic: b.attributes.hypoallergenic,

  // ...add other fields as needed
}))} columns={columns} />
    </div>
  );
}

export default FetchCard;

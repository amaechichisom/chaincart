// import FormField from "./FormFIeld";
// import FormModule from "./FormModule";

// const PropertyDetailsModule = ({ data, onChange }:any) => {
//   return (
//     <FormModule title="Property Details">
//       <FormField label="Beds">
//         <input
//           type="number"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Number of bedrooms"
//           value={data.beds || ''}
//           onChange={(e) => onChange('beds', e.target.value)}
//         />
//       </FormField>

//       <FormField label="Baths">
//         <input
//           type="number"
//           step="0.5"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Number of bathrooms"
//           value={data.baths || ''}
//           onChange={(e) => onChange('baths', e.target.value)}
//         />
//       </FormField>

//       <FormField label="Land Size/Building Area">
//         <input
//           type="text"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           placeholder="e.g., 1,200 sq ft"
//           value={data.landSize || ''}
//           onChange={(e) => onChange('landSize', e.target.value)}
//         />
//       </FormField>
//     </FormModule>
//   );
// };


// export default PropertyDetailsModule 
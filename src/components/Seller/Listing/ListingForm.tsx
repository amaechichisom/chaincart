// import { useState } from "react";

// import DocumentsModule from "@/components/shared/form/DocumentsModule";
// import GeneralInfoModule from "@/components/shared/form/GeneralInfoModule";
// import MediaModule from "@/components/shared/form/MediaModule";
// import PropertyDetailsModule from "@/components/shared/form/PropertyDetailsModule";

// function ListingForm() {
//   const [formData, setFormData] = useState({
//     listingName: '',
//     description: '',
//     category: '',
//     price: '',
//     location: '',
//     beds: '',
//     baths: '',
//     landSize: '',
//     coverImage: null as File | null,
//     otherImages: [] as File[],
//     documents: [] as File[],
//   });

//   const handleInputChange = (field: string, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleFileUpload = (field: string, files: FileList) => {
//     const fileArray = Array.from(files);
//     if (field === 'coverImage') {
//       setFormData(prev => ({
//         ...prev,
//         coverImage: fileArray[0] || null,
//       }));
//     } else if (field === 'otherImages' || field === 'documents') {
//       setFormData(prev => ({
//         ...prev,
//         [field]: [...prev[field], ...fileArray],
//       }));
//     }
//   };

//   const handleFileRemove = (field: string, index: number) => {
//     console.log(`Removing file at index ${index} from field ${field}`);
//     // if (field === 'coverImage') {
//     //   setFormData(prev => ({
//     //     ...prev,
//     //     coverImage: null,
//     //   }));
//     // } else {
//     //   setFormData(prev => ({
//     //     ...prev,
//     //     [field]: prev[field].filter((_, i) => i !== index),
//     //   }));
//     // }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Property Listing Form
//           </h1>
//           <p className="text-gray-600">
//             Fill out the information below to create your listing
//           </p>
//         </div>

//         <div className="space-y-6">
//           <GeneralInfoModule
//             data={formData}
//             onChange={handleInputChange}
//           />

//           <PropertyDetailsModule
//             data={formData}
//             onChange={handleInputChange}
//           />

//           <MediaModule
//             data={formData}
//             onFileUpload={handleFileUpload}
//             onFileRemove={handleFileRemove}
//           />

//           <DocumentsModule
//             data={formData}
//             onFileUpload={handleFileUpload}
//             onFileRemove={handleFileRemove}
//           />

//           {/* Submit Buttons */}
//           <div className="flex justify-end space-x-4 pt-6">
//             <button
//               type="button"
//               className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-colors"
//             >
//               Save Draft
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
//             >
//               Submit Listing
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ListingForm;

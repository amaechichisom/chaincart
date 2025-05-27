import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { X, FileText, Image } from "lucide-react";
import { InputField } from "../shared/InputField";
import { TextareaField } from "../shared/TextareaField";
import {
  useCreateProductMutation,
  useGetCategoryQuery,
} from "@/api/prodService";
import { IApiResponse, ICategory } from "@/@types/types";
import SelectField from "../shared/SelectField";
import AppButton from "../shared/AppButton";
import { useToast } from "@/hooks/useToast";

// Chaincart123
// superadmin@chaincart.com

interface FormData {
  title: string;
  description: string;
  category: string;
  stock: string;
  price: string;
  // location?: string;
  address: string;
  beds: string;
  baths: string;
  size_of_land: string;
  coverImage: File | null;
  image_of_land: File[];
  document_of_land: File[];
  isSpecialOffer: boolean;
  specialOfferPrice?: string;
  offerStartDate?: Date;
  offerEndDate?: Date;
  // isActive:boolean
}

const PropertyListing: React.FC = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const toast = useToast();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    // location: "",
    address: "",
    beds: "",
    baths: "",
    size_of_land: "",
    coverImage: null,
    image_of_land: [],
    document_of_land: [],
    isSpecialOffer: false,
    specialOfferPrice: "",
    offerStartDate: undefined,
    offerEndDate: undefined,
  });

  const documentTypes = [
    "Survey Plan",
    "C of O / Deed of Assignment",
    "Building Plan (if applicable)",
    "Government Consent / Gazette",
    "Proof of Ownership",
    "Utility Bills or Tax Receipts",
  ];

  const removeFile = (
    field: "image_of_land" | "document_of_land",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const removeCoverImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading("Posting ad...");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("beds", formData.beds);
      formDataToSend.append("baths", formData.baths);
      formDataToSend.append("size_of_land", formData.size_of_land);

      if (formData.offerStartDate) {
        formDataToSend.append(
          "offerStartDate",
          formData.offerStartDate.toISOString()
        );
      }
      if (formData.offerEndDate) {
        formDataToSend.append(
          "offerEndDate",
          formData.offerEndDate.toISOString()
        );
      }

      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      if (formData.specialOfferPrice) {
        formDataToSend.append("specialOfferPrice", formData.specialOfferPrice);
      }

      formDataToSend.append("isSpecialOffer", String(formData.isSpecialOffer));

      formData.image_of_land.forEach((file) => {
        formDataToSend.append("image_of_land", file);
      });

      formData.document_of_land.forEach((file) => {
        formDataToSend.append("document_of_land", file);
      });

      const result: IApiResponse = await createProduct(formDataToSend).unwrap();

      toast.dismiss(loadingToast);
      toast.success(result.message || "Ad successfully posted!");
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error submitting form:", error);
      toast.error("Error posting ad");
    }
  };

  const onCoverImageDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData((prev) => ({ ...prev, coverImage: acceptedFiles[0] }));
    }
  }, []);

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value ? new Date(value) : undefined,
      }));
    },
    []
  );

  const {
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
  } = useDropzone({
    onDrop: onCoverImageDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
  });

const onOtherImagesDrop = useCallback((acceptedFiles: File[]) => {
  setFormData((prev) => {
    const totalFiles = prev.image_of_land.length + acceptedFiles.length;
    if (totalFiles > 4) {
      toast.error("You can only upload a maximum of 4 images.");
      return prev;
    }
    return {
      ...prev,
      image_of_land: [...prev.image_of_land, ...acceptedFiles],
    };
  });
}, [toast]);


  const {
    getRootProps: getOtherRootProps,
    getInputProps: getOtherInputProps,
    isDragActive: isOtherDragActive,
  } = useDropzone({
    onDrop: onOtherImagesDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: (fileRejections) => {
      toast.error('Only 4 image is allow')
},
    
  });

  const onDocumentsDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        document_of_land: [...prev.document_of_land, ...acceptedFiles],
      }));
    }
  }, []);

  const {
    getRootProps: getDocRootProps,
    getInputProps: getDocInputProps,
    isDragActive: isDocDragActive,
  } = useDropzone({
    onDrop: onDocumentsDrop,
    accept: {
      "application/pdf": [".pdf"],
      // "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: true,
    maxSize: 5 * 1024 * 1024,
  });
  const { data } = useGetCategoryQuery({});

  const formattedCategories = useMemo(() => {
    return (
      data?.data?.map((item: ICategory) => ({
        value: item._id,
        label: item.name,
      })) || []
    );
  }, [data]);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-xl font-semibold mb-6">General info</h2>

          <div className="space-y-6">
            <InputField
              id="title"
              label="Listing Name"
              placeholder="Enter title"
              required
              value={formData.title}
              onChange={handleChange}
            />
            <TextareaField
              id="description"
              label="Description"
              placeholder="Enter description"
              required
              value={formData.description}
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                options={formattedCategories}
                placeholder="Select a category"
                onChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                defaultValue={formData.category}
              />
              <InputField
                id="stock"
                label="Stock"
                type="number"
                placeholder="Enter stock"
                required
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
            <InputField
              id="price"
              label={`Price (USD)`}
              placeholder="Enter price"
              required
              value={formData.price}
              onChange={handleChange}
            />
            <InputField
              id="address"
              label={`Address`}
              placeholder="Enter address"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isSpecialOffer"
                checked={formData.isSpecialOffer}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isSpecialOffer: e.target.checked,
                    specialOfferPrice: e.target.checked
                      ? prev.specialOfferPrice
                      : "",
                  }))
                }
              />

              <label htmlFor="isSpecialOffer" className="text-sm">
                Is this a special offer?
              </label>
            </div>

            {formData.isSpecialOffer && (
              <>
                <InputField
                  id="specialOfferPrice"
                  label="Special Offer Price"
                  placeholder="Enter special offer price"
                  required
                  value={formData.specialOfferPrice!}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Offer Start Date"
                    type="date"
                    id="offerStartDate"
                    required
                    value={
                      formData.offerStartDate
                        ? formData.offerStartDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={handleDateChange}
                  />
                  <InputField
                    type="date"
                    id="offerEndDate"
                    label="Offer End Date"
                    value={
                      formData.offerEndDate
                        ? formData.offerEndDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={handleDateChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-xl font-semibold mb-6">Property Details</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="beds"
                label={`How many bedrooms?`}
                placeholder="Enter beds"
                // required
                value={formData.beds}
                onChange={handleChange}
              />
              <InputField
                id="baths"
                label={`How many baths?`}
                placeholder="Enter baths"
                // required
                value={formData.baths}
                onChange={handleChange}
              />
            </div>
            <InputField
              id="size_of_land"
              label={` Land size/Building Area?`}
              placeholder="Enter size_of_land"
              // required
              value={formData.size_of_land}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-xl font-semibold mb-6">Media</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover image
              </label>
              {formData.coverImage ? (
                <div className="relative border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image className="w-6 h-6 text-blue-500" />
                      <span className="text-sm">
                        {formData.coverImage.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({(formData.coverImage.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  {...getCoverRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isCoverDragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-blue-300 hover:border-blue-400"
                  }`}
                >
                  <input {...getCoverInputProps()} />
                  <Image className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-500 font-medium">
                    {isCoverDragActive
                      ? "Drop the image here"
                      : "Upload a file"}
                  </p>
                  <p className="text-blue-500">or drag and drop</p>
                  <p className="text-gray-500 text-sm mt-1">
                    PNG, JPG upto 5MB
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other images
              </label>

              {formData.image_of_land.length > 0 && (
                <div className="mb-4 space-y-2">
                  {formData.image_of_land.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border border-gray-300 rounded-lg p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <Image className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile("image_of_land", index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                {...getOtherRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isOtherDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-blue-300 hover:border-blue-400"
                }`}
              >
                <input {...getOtherInputProps()} />
                <Image className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-500 font-medium">
                  {isOtherDragActive ? "Drop the images here" : "Upload files"}
                </p>
                <p className="text-blue-500">or drag and drop</p>
                <p className="text-gray-500 text-sm mt-1">
                  PNG, JPG upto 5MB each
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-xl font-semibold mb-6">Documents</h2>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-4">
              Upload all document_of_land
            </p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              {documentTypes.map((doc, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-3"></span>
                  {doc}
                </li>
              ))}
            </ul>

            {formData.document_of_land.length > 0 && (
              <div className="mb-4 space-y-2">
                {formData.document_of_land.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-gray-300 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("document_of_land", index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              {...getDocRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDocDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-blue-300 hover:border-blue-400"
              }`}
            >
              <input {...getDocInputProps()} />
              <FileText className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-500 font-medium">
                {isDocDragActive
                  ? "Drop the document_of_land here"
                  : "Upload files"}
              </p>
              <p className="text-blue-500">or drag and drop</p>
              <p className="text-gray-500 text-sm mt-1">
                PDF upto 5MB each
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <AppButton label="            Submit Listing" isLoading={isLoading} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default PropertyListing;

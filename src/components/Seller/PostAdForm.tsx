import { useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Image, X } from "lucide-react";
import { InputField } from "../shared/InputField";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MapComponent from "../shared/MapComponent";
import {
  useCreateProductMutation,
  useGetCategoryQuery,
} from "@/api/prodService";
import AppButton from "../shared/AppButton";
import { IApiResponse, ICategory } from "@/@types/types";
import SelectField from "../shared/SelectField";
import { useToast } from "@/hooks/useToast";
import { TextareaField } from "../shared/TextareaField";

export default function PostAdForm() {
  const [formData, setFormData] = useState({
    title: "",
    size_of_land: "",
    price: "",
    category: "",
    stock: "",
    address: "",
    mapping_location: { lat: 0, lng: 0 },
    description: "",
    document_of_land: null as File | null,
    image_of_land: null as File | null,
  });

  const toast = useToast()
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [documentError, setDocumentError] = useState("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data } = useGetCategoryQuery({});

  const formattedCategories = useMemo(() => {
    return (
      data?.data?.map((item: ICategory) => ({
        value: item._id,
        label: item.name,
      })) || []
    );
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setFormData({ ...formData, image_of_land: file });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.name === "document_of_land") {
      if (file.type !== "application/pdf") {
        setDocumentError("Only PDF documents are allowed.");
      } else {
        setDocumentError("");
        setFormData({ ...formData, document_of_land: file });
      }
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData({ ...formData, mapping_location: { lat, lng } });
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image_of_land: null });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData.mapping_location)
    if (!formData.mapping_location || formData.mapping_location.lat == 0 || formData.mapping_location.lng == 0) {
      toast.error("Please select a valid location");
      return;
    }
  
    const loadingToast = toast.loading("Posting ad...");
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("size_of_land", formData.size_of_land);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("address", formData.address);
      formDataToSend.append(
        "mapping_location",
        JSON.stringify(formData.mapping_location)
      );
      formDataToSend.append("description", formData.description);
  
      if (formData.image_of_land) {
        formDataToSend.append("image_of_land", formData.image_of_land);
      }
  
      if (formData.document_of_land) {
        formDataToSend.append("document_of_land", formData.document_of_land);
      }
  
      const result: IApiResponse = await createProduct(formDataToSend).unwrap();
      
      toast.dismiss(loadingToast);
      toast.success(result.message || "Ad successfully posted!");
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error submitting form:", error);
      toast.error("Error posting ad");
    }
  };
  
  

  return (
    <form
      className="container mx-auto  py-10 w-full bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">Post An Ad</h2>

          <InputField
            id="title"
            label="Title"
            placeholder="Enter title"
            required
            value={formData.title}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField
              id="size_of_land"
              label="Land Size"
              placeholder="Enter land size"
              required
              value={formData.size_of_land}
              onChange={handleChange}
            />
            <InputField
              id="price"
              type="number"
              label="Price (XION)"
              placeholder="Enter price"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
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
            id="address"
            label="Address"
            placeholder="Enter address"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-4"
          />
        </Card>

        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">
            Select Mapping Location
          </h2>
          <div className="h-64 w-full border mt-4 rounded-lg overflow-hidden">
            <MapComponent onLocationSelect={handleLocationSelect} />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Selected Location: {formData.mapping_location.lat},{" "}
            {formData.mapping_location.lng}
          </p>
        </Card>

        <Card className="p-4 border">
          {/* <h2 className="text-lg font-semibold border-b pb-2">Description</h2> */}
          <TextareaField
            id="description"
            // type="textarea"
            label="Description"
            placeholder="Enter a detailed description..."
            required
            value={formData.description}
            onChange={handleChange}
            className="mt-4 h-32"
          />
        </Card>

        <Card className="p-4 border">
          <h2 className="text-lg font-semibold border-b pb-2">Upload Files</h2>

          <Input
            id="image_of_land"
            name="image_of_land"
            type="file"
            accept="image/*"
            required
            className="mt-2"
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <div className="relative mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-40 mt-4 border border-dashed rounded-lg">
              <Image className="w-10 h-10 text-gray-400" />
              <p className="text-gray-500 text-sm ml-2">
                Image preview will appear here
              </p>
            </div>
          )}

          <div className="mt-4">
            <Label htmlFor="document_of_land">
              Document of Land (PDF) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="document_of_land"
              name="document_of_land"
              type="file"
              accept="application/pdf"
              required
              className="mt-2"
              onChange={handleFileChange}
            />
            {documentError && (
              <p className="text-red-500 text-sm mt-1">{documentError}</p>
            )}
          </div>
        </Card>
      </div>

      <AppButton isLoading={isLoading} type="submit" className="mt-6 px-6 mx-auto">
        Submit Ad
      </AppButton>
    </form>
  );
}

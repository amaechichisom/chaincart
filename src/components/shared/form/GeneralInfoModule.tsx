import FormField from "./FormFIeld";
import FormModule from "./FormModule";

const GeneralInfoModule = ({ data, onChange }:any) => {
  return (
    <FormModule title="General Info">
      <FormField label="Listing Name">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter listing name"
          value={data.listingName || ''}
          onChange={(e) => onChange('listingName', e.target.value)}
        />
      </FormField>

      <FormField label="Description">
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your property"
          value={data.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </FormField>

      <FormField label="Category">
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={data.category || ''}
          onChange={(e) => onChange('category', e.target.value)}
        >
          <option value="">Select category</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
          <option value="industrial">Industrial</option>
        </select>
      </FormField>

      <FormField label="Price (USD)">
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="0.00"
          value={data.price || ''}
          onChange={(e) => onChange('price', e.target.value)}
        />
      </FormField>

      <FormField label="Location">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter location"
          value={data.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
        />
      </FormField>
    </FormModule>
  );
};

export default GeneralInfoModule
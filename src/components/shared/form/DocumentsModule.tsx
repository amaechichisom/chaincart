import FileUploadArea from "./FileUploadArea ";
import FormField from "./FormFIeld";
import FormModule from "./FormModule";


const DocumentsModule = ({ data, onFileUpload, onFileRemove }: any) => {
  return (
    <FormModule title="Documents">
      <FormField label="Upload Files">
        <FileUploadArea
          label="Documents"
          accept=".pdf,.doc,.docx,.txt"
          multiple={true}
          onUpload={(files) => onFileUpload('documents', files)}
          files={data.documents || []}
          onRemove={(index) => onFileRemove('documents', index)}
        />
      </FormField>
    </FormModule>
  );
};

export default DocumentsModule
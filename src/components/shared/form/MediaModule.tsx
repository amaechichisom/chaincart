
import FormModule from './FormModule';
import FileUploadArea from './FileUploadArea ';
import FormField from './FormField';

const MediaModule = ({ data, onFileUpload, onFileRemove } : any) => {
  return (
    <FormModule title="Media">
      <FormField label="Cover Image">
        <FileUploadArea
          label="Cover Image"
          accept="image/*"
          onUpload={(files) => onFileUpload('coverImage', files)}
          files={data.coverImage ? [data.coverImage] : []}
          onRemove={() => onFileRemove('coverImage')}
        />
      </FormField>

      <FormField label="Other Images">
        <FileUploadArea
          label="Additional Images"
          accept="image/*"
          multiple={true}
          onUpload={(files) => onFileUpload('otherImages', files)}
          files={data.otherImages || []}
          onRemove={(index) => onFileRemove('otherImages', index)}
        />
      </FormField>
    </FormModule>
  );
};

export default MediaModule
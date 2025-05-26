import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const aboutWordLimit = 120;

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  companyName: Yup.string().required('Company Name is required'),
  about: Yup.string()
    .test('wordCount', `About must be ${aboutWordLimit} words or less`, (value = '') => {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      return wordCount <= aboutWordLimit;
    })
    .required('About is required'),
});

function EditSection() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      companyName: '',
      about: '',
    },
    validationSchema,
    onSubmit: (values:any) => {
      localStorage.setItem('sellerProfile', JSON.stringify(values));
      alert('Profile saved successfully!');
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem('sellerProfile');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formik.setValues(parsedData);
    }
  }, []);

  const aboutWordCount = formik.values.about.trim()
    ? formik.values.about.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const inputClass =
    'w-full  border-b outline-none py-2 text-gray-700 placeholder:text-gray-400 transition duration-200 hover:border-primary border-neutral-400';

  return (
    <div className="w-full md:w-2/3 p-8 rounded-2xl flex flex-col gap-6 max-h-[36rem] h-auto overflow-y-auto">
        <h1 className='text-2xl md:text-4xl font-bold mb-3'>Edit Profile</h1>
        <form onSubmit={formik.handleSubmit} className="flex-1 space-y-6">
        <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter full name"
            className={inputClass}
            />
            {formik.touched.fullName && typeof formik.errors.fullName === 'string' && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.fullName}</div>
            )}
        </div>

        <div>
            <label className="block mb-1 text-sm font-medium">Company Name</label>
            <input
            type="text"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter company name"
            className={inputClass}
            />
            {formik.touched.companyName && formik.errors.companyName && typeof formik.errors.companyName === 'string' && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.companyName}</div>
            )}
        </div>

        <div>
            <label className="block mb-1 text-sm font-medium">About</label>
            <textarea
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Tell us about yourself"
            rows={4}
            className={inputClass}
            />
            <div className="text-sm text-gray-500 mt-1">
            {aboutWordCount}/{aboutWordLimit} words
            </div>
            {formik.touched.about && formik.errors.about && typeof formik.errors.about === 'string' && (
            <div className="text-sm text-red-500 mt-1">{formik.errors.about}</div>
            )}
        </div>

        <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
            Save Profile
        </button>
        </form>
    </div>
  );
}

export default EditSection;
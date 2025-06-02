import { useState, ChangeEvent, FocusEvent, FormEvent } from 'react';

interface FormikConfig<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}

export const useFormik = <T extends Record<string, any>>(config: FormikConfig<T>) => {
  const [values, setValues] = useState<T>(config.initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof T, value: any) => {
    if (config.validate) {
      const allErrors = config.validate({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: allErrors[name] }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof T, value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof T, values[name as keyof T]);
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setIsSubmitting(true);

    // Mark all fields as touched
    const touchedFields: Partial<Record<keyof T, boolean>> = {};
    Object.keys(values).forEach(key => {
      touchedFields[key as keyof T] = true;
    });
    setTouched(touchedFields);

    if (config.validate) {
      const allErrors = config.validate(values);
      setErrors(allErrors);
      if (Object.keys(allErrors).length > 0) {
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await config.onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFieldValue = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const setFieldTouched = (name: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  };

  const resetForm = () => {
    setValues(config.initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  const validate = (vals: T = values) => {
    if (config.validate) {
      return config.validate(vals);
    }
    return {};
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
    validate,
  };
};
// Types for values and errors
type PersonalInfoValues = {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  phone: string;
  email?: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  [key: string]: any;
};

type PersonalInfoErrors = Partial<Record<keyof PersonalInfoValues, string>>;

type DocumentValues = {
  idCard?: any;
  idCardBack?: any;
  proofOfAddress?: any;
  proofOfIncome?: any;
  selfie?: any;
  businessRegistration?: any;
  businessLicense?: any;
  taxCertificate?: any;
  ownershipProof?: any;
  financialStatements?: any;
  additionalDocs?: any;
  [key: string]: any;
};

type DocumentErrors = Partial<Record<keyof DocumentValues, string>>;

// Personal Information Validation Schema
export const personalInfoValidation = (values: PersonalInfoValues): PersonalInfoErrors => {
  const errors: PersonalInfoErrors = {};

  // First Name validation
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s'-]+$/.test(values.firstName)) {
    errors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
  }

  // Last Name validation
  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  } else if (values.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s'-]+$/.test(values.lastName)) {
    errors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
  }

  // Date of Birth validation
  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const today = new Date();
    const birthDate = new Date(values.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      errors.dateOfBirth = 'You must be at least 18 years old';
    } else if (age > 120) {
      errors.dateOfBirth = 'Please enter a valid date of birth';
    }
  }

  // Phone validation
  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(values.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number (minimum 10 digits)';
  }

  // Address validation
  if (!values.address) {
    errors.address = 'Address is required';
  } else if (values.address.length < 10) {
    errors.address = 'Please enter a complete address (minimum 10 characters)';
  }

  return errors;
};

// Document Upload Validation Schema
export const documentValidation = (values: DocumentValues): DocumentErrors => {
  const errors: DocumentErrors = {};

  if (!values.idCard) {
    errors.idCard = 'Government ID is required';
  }

  if (!values.proofOfAddress) {
    errors.proofOfAddress = 'Proof of address is required';
  }

  if (!values.selfie) {
    errors.selfie = 'Selfie photo is required';
  }

  return errors;
};

// File validation helper
export const validateFile = (
  file: File | null,
  maxSize: number = 10 * 1024 * 1024,
  allowedTypes: string[] = ['image/*', 'application/pdf']
): string[] => {
  const errors: string[] = [];

  if (!file) {
    errors.push('File is required');
    return errors;
  }

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
  }

  const fileType = file.type;
  const isAllowed = allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      return fileType.startsWith(type.replace('/*', ''));
    }
    return fileType === type;
  });

  if (!isAllowed) {
    errors.push(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  return errors;
};

// Email validation helper
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number formatting helper
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const phoneNumber = value.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX for US numbers
  if (phoneNumber.length === 10) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  } else if (phoneNumber.length === 11 && phoneNumber[0] === '1') {
    return `+1 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
  }

  return value;
};
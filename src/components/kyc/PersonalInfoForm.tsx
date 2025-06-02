import FormInput, { EmailInput, PhoneInput, DateInput, TextAreaInput } from './FormInput';
import { User, Mail, Phone, MapPin, Calendar, Globe, CreditCard } from 'lucide-react';

const PersonalInfoForm = ({ 
  formik, 
  showAdvancedFields = false,
  layout = 'default',
  className = ''
} : {
  formik: any;
  showAdvancedFields?: boolean;
  layout?: 'default' | 'compact' | 'single-column';
  className?: string;
}) => {
  const layoutClasses = {
    default: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    compact: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3',
    'single-column': 'space-y-4'
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Personal Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User size={20} className="text-blue-600" />
          Personal Information
        </h3>
        
        <div className={layoutClasses[layout]}>
          <FormInput
            label="First Name"
            name="firstName"
            formik={formik}
            placeholder="Enter your first name"
            required
            leftIcon={<User size={16} className="text-gray-400" />}
            helpText="As it appears on your government ID"
          />
          
          <FormInput
            label="Last Name"
            name="lastName"
            formik={formik}
            placeholder="Enter your last name"
            required
            leftIcon={<User size={16} className="text-gray-400" />}
          />
          
          {showAdvancedFields && (
            <FormInput
              label="Middle Name"
              name="middleName"
              formik={formik}
              placeholder="Enter your middle name (optional)"
              leftIcon={<User size={16} className="text-gray-400" />}
            />
          )}
        </div>
        
        <div className={layoutClasses[layout]}>
          <DateInput
            label="Date of Birth"
            name="dateOfBirth"
            formik={formik}
            required
            leftIcon={<Calendar size={16} className="text-gray-400" />}
            helpText="You must be 18 or older"
          />
          
          {showAdvancedFields && (
            <>
              <FormInput
                label="Place of Birth"
                name="placeOfBirth"
                formik={formik}
                placeholder="City, Country"
                leftIcon={<Globe size={16} className="text-gray-400" />}
              />
              
              <FormInput
                label="Nationality"
                name="nationality"
                formik={formik}
                placeholder="Enter your nationality"
                leftIcon={<Globe size={16} className="text-gray-400" />}
              />
            </>
          )}
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Mail size={20} className="text-blue-600" />
          Contact Information
        </h3>
        
        <div className={layoutClasses[layout]}>
          <EmailInput
            label="Email Address"
            name="email"
            formik={formik}
            placeholder="Enter your email address"
            required
            leftIcon={<Mail size={16} className="text-gray-400" />}
            helpText="We'll send verification updates here"
          />
          
          <PhoneInput
            label="Phone Number"
            name="phone"
            formik={formik}
            placeholder="(555) 123-4567"
            required
            leftIcon={<Phone size={16} className="text-gray-400" />}
            helpText="Include country code if outside US"
          />
          
          {showAdvancedFields && (
            <PhoneInput
              label="Alternative Phone"
              name="alternativePhone"
              formik={formik}
              placeholder="(555) 987-6543"
              leftIcon={<Phone size={16} className="text-gray-400" />}
            />
          )}
        </div>
      </div>

      {/* Address Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin size={20} className="text-blue-600" />
          Address Information
        </h3>
        
        <div className="space-y-4">
          <TextAreaInput
            label="Street Address"
            name="address"
            formik={formik}
            placeholder="Enter your complete street address"
            required
            rows={2}
            maxLength={200}
            showCharCount
            helpText="Include apartment, suite, or unit number if applicable"
          />
          
          <div className={layoutClasses[layout]}>
            <FormInput
              label="City"
              name="city"
              formik={formik}
              placeholder="Enter your city"
              required
              leftIcon={<MapPin size={16} className="text-gray-400" />}
            />
            
            <FormInput
              label="State/Province"
              name="state"
              formik={formik}
              placeholder="Enter your state or province"
              required
              leftIcon={<MapPin size={16} className="text-gray-400" />}
            />
            
            <FormInput
              label="ZIP/Postal Code"
              name="zipCode"
              formik={formik}
              placeholder="12345"
              required
              leftIcon={<MapPin size={16} className="text-gray-400" />}
            />
          </div>
          
          <FormInput
            label="Country"
            name="country"
            formik={formik}
            placeholder="United States"
            required
            leftIcon={<Globe size={16} className="text-gray-400" />}
          />
        </div>
      </div>

      {/* Advanced Fields Section */}
      {showAdvancedFields && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard size={20} className="text-blue-600" />
            Additional Information
          </h3>
          
          <div className={layoutClasses[layout]}>
            <FormInput
              label="Social Security Number"
              name="ssn"
              formik={formik}
              placeholder="XXX-XX-XXXX"
              type="password"
              leftIcon={<CreditCard size={16} className="text-gray-400" />}
              helpText="Required for identity verification"
            />
            
            <FormInput
              label="Government ID Number"
              name="governmentId"
              formik={formik}
              placeholder="Enter ID number"
              leftIcon={<CreditCard size={16} className="text-gray-400" />}
            />
            
            <FormInput
              label="Occupation"
              name="occupation"
              formik={formik}
              placeholder="Enter your occupation"
              leftIcon={<User size={16} className="text-gray-400" />}
            />
          </div>
          
          <div className={layoutClasses[layout]}>
            <FormInput
              label="Employer"
              name="employer"
              formik={formik}
              placeholder="Enter your employer name"
              leftIcon={<User size={16} className="text-gray-400" />}
            />
            
            <FormInput
              label="Annual Income"
              name="annualIncome"
              formik={formik}
              placeholder="$50,000"
              type="number"
              leftIcon={<span className="text-gray-400 text-sm">$</span>}
            />
            
            <FormInput
              label="Source of Funds"
              name="sourceOfFunds"
              formik={formik}
              placeholder="e.g., Salary, Investment, Business"
              leftIcon={<CreditCard size={16} className="text-gray-400" />}
            />
          </div>
        </div>
      )}

      {/* Form Summary */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Information Summary</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• All required fields must be completed to proceed</p>
          <p>• Information must match your government-issued ID</p>
          <p>• Double-check spelling and accuracy before submitting</p>
          {showAdvancedFields && (
            <p>• Sensitive information is encrypted and securely stored</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Simplified Personal Info Form for quick verification
export const QuickPersonalInfoForm = ({ formik, className = '' }:{ formik: any, className?: string}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          name="firstName"
          formik={formik}
          placeholder="Enter first name"
          required
        />
        <FormInput
          label="Last Name"
          name="lastName"
          formik={formik}
          placeholder="Enter last name"
          required
        />
      </div>
      
      <DateInput
        label="Date of Birth"
        name="dateOfBirth"
        formik={formik}
        required
      />
      
      <PhoneInput
        label="Phone Number"
        name="phone"
        formik={formik}
        placeholder="(555) 123-4567"
        required
      />
      
      <TextAreaInput
        label="Address"
        name="address"
        formik={formik}
        placeholder="Enter your complete address"
        required
        rows={3}
      />
    </div>
  );
};

// Business Information Form Component
export const BusinessInfoForm = ({ formik, className = '' }:{ formik: any, className?: string}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <CreditCard size={20} className="text-blue-600" />
          Business Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Business Name"
            name="businessName"
            formik={formik}
            placeholder="Enter legal business name"
            required
          />
          
          <FormInput
            label="Business Registration Number"
            name="businessRegNumber"
            formik={formik}
            placeholder="Enter registration number"
            required
          />
          
          <FormInput
            label="Tax ID / EIN"
            name="taxId"
            formik={formik}
            placeholder="XX-XXXXXXX"
            required
          />
          
          <FormInput
            label="Business Type"
            name="businessType"
            formik={formik}
            placeholder="e.g., LLC, Corporation, Partnership"
            required
          />
        </div>
        
        <TextAreaInput
          label="Business Address"
          name="businessAddress"
          formik={formik}
          placeholder="Enter complete business address"
          required
          rows={2}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Industry"
            name="industry"
            formik={formik}
            placeholder="e.g., Technology, Healthcare, Retail"
            required
          />
          
          <FormInput
            label="Annual Revenue"
            name="annualRevenue"
            formik={formik}
            placeholder="$100,000"
            type="number"
            leftIcon={<span className="text-gray-400 text-sm">$</span>}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
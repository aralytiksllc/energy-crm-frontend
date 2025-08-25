// External

// Internal

export const customerFormRules = {
  companyName: [
    { required: true, message: 'Company name is required' },
    { max: 255, message: 'Max 255 characters' },
  ],

  registeredAddress: [],

  legalNoticeEmail: [
    { type: 'email', message: 'Enter a valid email' },
    { max: 255, message: 'Max 255 characters' },
  ],

  phone: [
    { max: 50, message: 'Max 50 characters' },
    {
      pattern: /^[\d\s+().-]{6,50}$/,
      message: 'Enter a valid phone number',
    },
  ],

  defaultOperationalEmail: [
    { type: 'email', message: 'Enter a valid email' },
    { max: 255, message: 'Max 255 characters' },
  ],

  defaultEscalationEmail: [
    { type: 'email', message: 'Enter a valid email' },
    { max: 255, message: 'Max 255 characters' },
  ],

  registrationNumber: [
    { required: true, message: 'Business registration number is required' },
    { max: 50, message: 'Max 50 characters' },
  ],

  businessType: [{ max: 100, message: 'Max 100 characters' }],

  registrationDate: [],

  registeredCapital: [
    { type: 'number', min: 0, message: 'Must be a positive number' },
  ],

  companyStatus: [{ max: 50, message: 'Max 50 characters' }],

  mainActivity: [{ max: 255, message: 'Max 255 characters' }],

  legalId: [{ max: 255, message: 'Max 255 characters' }],

  legalStatus: [{ max: 255, message: 'Max 255 characters' }],

  companyCode: [{ max: 50, message: 'Max 50 characters' }],

  companyType: [{ max: 50, message: 'Max 50 characters' }],

  companyDescription: [{ max: 255, message: 'Max 255 characters' }],

  cityRegion: [{ max: 255, message: 'Max 255 characters' }],

  authorizedRepresentative: [{ max: 255, message: 'Max 255 characters' }],

  companyRole: [{ max: 50, message: 'Max 50 characters' }],

  sectorPrimary: [{ max: 255, message: 'Max 255 characters' }],

  sectorSecondary: [{ max: 255, message: 'Max 255 characters' }],

  clientStatus: [{ max: 50, message: 'Max 50 characters' }],

  preferredCommunicationLanguage: [{ max: 50, message: 'Max 50 characters' }],
};

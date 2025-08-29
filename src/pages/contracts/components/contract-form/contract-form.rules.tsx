// External
import type { Rule } from 'antd/es/form';

// Internal
import type { IContract } from '@/interfaces/contracts';

export const rules: Partial<Record<keyof IContract, Rule[]>> = {
  customerId: [{ required: true, message: 'Customer is required' }],

  contractNumber: [
    {
      required: true,
      whitespace: true,
      message: 'Contract number is required',
    },
    { max: 512, message: 'Contract number cannot exceed 512 characters' },
  ],

  effectiveDate: [{ required: true, message: 'Effective date is required' }],

  supplyStartDate: [
    { required: true, message: 'Supply start date is required' },
  ],

  maturityDate: [{ required: true, message: 'Maturity date is required' }],

  initialTermYears: [
    { type: 'number', min: 0, message: 'Initial term must be 0 or greater' },
    { required: true, message: 'Initial term is required' },
  ],

  renewalTermYears: [
    { type: 'number', min: 0, message: 'Renewal term must be 0 or greater' },
  ],

  contractQuantity: [
    {
      required: true,
      whitespace: true,
      message: 'Contract quantity is required',
    },
    { max: 100, message: 'Contract quantity cannot exceed 100 characters' },
  ],

  pricePerMwh: [
    {
      type: 'number',
      min: 0.000001,
      message: 'Price per MWh must be greater than 0',
    },
    { required: true, message: 'Price per MWh is required' },
  ],

  includesNetworkTariffs: [],

  includesVat: [],

  paymentTermsDays: [
    { type: 'number', min: 0, message: 'Payment terms must be 0 or greater' },
    { required: true, message: 'Payment terms (days) are required' },
  ],

  securityDepositAmount: [
    {
      type: 'number',
      min: 0,
      message: 'Security deposit must be 0 or greater',
    },
  ],

  terminationNoticeDays: [
    {
      type: 'number',
      min: 0,
      message: 'Termination notice days must be 0 or greater',
    },
  ],

  earlyTerminationFee: [
    { max: 100, message: 'Early termination fee cannot exceed 100 characters' },
  ],

  disputeResolutionMethod: [
    {
      required: true,
      whitespace: true,
      message: 'Dispute resolution method is required',
    },
  ],

  forecastDeadlineDaysBeforeMonth: [
    {
      type: 'number',
      min: 0,
      message: 'Forecast deadline days must be 0 or greater',
    },
  ],
};

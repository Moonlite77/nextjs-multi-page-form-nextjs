import z from 'zod';

export const stepOneSchema = z.object({
  charRadio: z.string().optional(),
});

export const stepTwoSchema = z.object({
  coupon: z.string().min(5, 'Coupon code must be at least 5 characters long'),
  discount: z.coerce
    .number()
    .min(1, 'Discount must be at least 1%')
    .max(100, 'Discount must be at most 100%'),
  discountTwo: z.coerce.boolean().optional(),
});

export const stepThreeSchema = z.object({
  contactName: z
    .string()
    .min(5, 'Please enter a contact name of at least 5 characters long'),
  contactEmail: z.string().email('Please enter a valid email'),
});

export const stepFourSchema = z.object({
  coolCheckbox: z.coerce.boolean().optional(),
  securityPlusCompTIA: z.coerce.boolean().optional(),
  cisspISC2:z.coerce.boolean().optional(),
});

export const newDealSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
  ...stepFourSchema.shape,
});

export const newDealInitialValuesSchema = z.object({
  name: z.string().optional(),
  charRadio: z.string().optional(),
  coupon: z.string().optional(),
  discount: z.coerce.number().optional(),
  discountTwo: z.coerce.boolean().optional(),
  coolCheckbox: z.coerce.boolean().optional(),
  securityPlusCompTIA: z.coerce.boolean().optional(),
  cisspISC2:z.coerce.boolean().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().optional(),
});

// z.preprocess(value => value === "false", z.boolean()),
export type NewDealType = z.infer<typeof newDealSchema>;
export type NewDealInitialValuesType = z.infer<
  typeof newDealInitialValuesSchema
>;

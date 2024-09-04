import z from 'zod';

export const stepOneSchema = z.object({
  charRadio: z.string().optional(),
});

export const stepTwoSchema = z.object({
  yoe: z.coerce
    .number()
    .min(1, 'Discount must be at least 1%')
    .max(100, 'Discount must be at most 100%'),
});

export const stepThreeSchema = z.object({
  awsCloudPractitioner: z.coerce.boolean().optional(),
  securityPlusCompTIA: z.coerce.boolean().optional(),
  cisspISC2:z.coerce.boolean().optional(),
});

export const stepFourSchema = z.object({
  degree: z.string().optional(),
});

export const stepFiveSchema = z.object({
  clearance: z.string().optional(),
});

export const stepSixSchema = z.object({
  contactEmail: z.string().email('Please enter a valid email'),
});

export const newDealSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
  ...stepFourSchema.shape,
});

export const newDealInitialValuesSchema = z.object({
  charRadio: z.string().optional(),
  yoe: z.coerce.number().optional(),
  discountTwo: z.coerce.boolean().optional(),
  awsCloudPractitioner: z.coerce.boolean().optional(),
  securityPlusCompTIA: z.coerce.boolean().optional(),
  cisspISC2:z.coerce.boolean().optional(),
  degree: z.string().optional(),
  clearance: z.string().optional(),
  contactEmail: z.string().optional(),
});

// z.preprocess(value => value === "false", z.boolean()),
export type NewDealType = z.infer<typeof newDealSchema>;
export type NewDealInitialValuesType = z.infer<
  typeof newDealInitialValuesSchema
>;

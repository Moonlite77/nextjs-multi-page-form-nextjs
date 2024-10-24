import { Zen_Antique } from 'next/font/google';
import z from 'zod';

export const stepOneSchema = z.object({
  charRadio: z.string().optional(),
});

export const stepTwoSchema = z.object({
  yoe: z.coerce
    .number()
    .min(1, 'Must be at least 1')
    .max(100, 'Must be at most 100'),
});

export const stepThreeSchema = z.object({
  resumeText: z.string().optional(),
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
  openAIURL: z.string().optional(),
});

export const newDealInitialValuesSchema = z.object({
  charRadio: z.string().optional(),
  yoe: z.coerce.number().optional(),
  discountTwo: z.coerce.boolean().optional(),
  degree: z.string().optional(),
  clearance: z.string().optional(),
  contactEmail: z.string().optional(),
  openAIURL: z.string().optional(),
  resumeText: z.string().optional(),
});

// z.preprocess(value => value === "false", z.boolean()),
export type NewDealType = z.infer<typeof newDealSchema>;
export type NewDealInitialValuesType = z.infer<
  typeof newDealInitialValuesSchema
>;

'use client';
import Input from '@/components/Input';
import CheckboxInput from '@/components/CheckboxInput';
import SubmitButton from '../../../components/SubmitButton';
import { stepTwoFormAction } from './actions';
import { useFormState } from 'react-dom';
import { FormErrors } from '@/types';
import { useEffect, useState } from 'react';

const initialState: FormErrors = {};

export default function StepTwoForm() {
  const [serverErrors, formAction] = useFormState(
    stepTwoFormAction,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <Input
          label="How much Experience do you have in your selected career field?"
          id="yoe"
          min={1}
          max={100}
          required
          description="Must be between 1 and 100"
          type="number"
          errorMsg={serverErrors?.yoe}
        />

        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}

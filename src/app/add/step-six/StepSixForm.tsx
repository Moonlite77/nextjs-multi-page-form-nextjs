'use client';
import Input from '@/components/Input';
import CheckboxInput from '@/components/CheckboxInput';
import Radiobuttons from '@/components/Radiobuttons';
import SubmitButton from '../../../components/SubmitButton';
import { stepFourFormAction } from './actions';
import { useFormState } from 'react-dom';
import { FormErrors } from '@/types';
import { useEffect, useState } from 'react';

const initialState: FormErrors = {};

export default function StepFourForm() {
  const [serverErrors, formAction] = useFormState(
    stepFourFormAction,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col lg:max-w-[700px]">
      <Input
          label="Contact Email"
          id="contactEmail"
          required
          type="email"
          errorMsg={serverErrors?.email}
        />


        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}

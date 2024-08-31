'use client';
import Input from '@/components/Input';
import CheckboxInput from '@/components/CheckboxInput';
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
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">

        <CheckboxInput
          label="checkbox on new page test"
          id="coolCheckbox"
          description="Cool New Checkbox"
          type="checkbox"
          errorMsg={serverErrors?.discount}
        />

        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}

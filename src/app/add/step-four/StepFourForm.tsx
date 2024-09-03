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
      <div className="flex w-full flex-col lg:max-w-[700px]">

        <CheckboxInput
          label="AWS Cloud Practioner"
          id="coolCheckbox"
          description="Cool New Checkbox"
          type="checkbox"
          errorMsg={serverErrors?.discount}
        />
        <CheckboxInput
          label="Sec+"
          id="securityPlusCompTIA"
          description="CompTIA security plus"
          type="checkbox"
          errorMsg={serverErrors?.discount}
        />
        <CheckboxInput
          label="CISSP"
          id="cisspISC2"
          description="CompTIA security plus"
          type="checkbox"
          errorMsg={serverErrors?.discount}
        />

        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}

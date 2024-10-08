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

        <Radiobuttons
          label="Degree"
          id="highschool"
          name="degree"
          type="radio"
          value="highschool"
          errorMsg={serverErrors?.name}
        />
        <Radiobuttons
          label="Degree"
          id="associates"
          name="degree"
          type="radio"
          value="associates"
          errorMsg={serverErrors?.name}
        />
        <Radiobuttons
          label="Degree"
          name="degree"
          id="bachelors"
          type="radio"
          value="bachelors"
          errorMsg={serverErrors?.name}
        />
        <Radiobuttons
          label="Degree"
          name="degree"
          id="masters"
          type="radio"
          value="masters"
          errorMsg={serverErrors?.name}
        />
        <Radiobuttons
          label="Degree"
          name="degree"
          id="phd"
          type="radio"
          value="phd"
          errorMsg={serverErrors?.name}
        />

        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}

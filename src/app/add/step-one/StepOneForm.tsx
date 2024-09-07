'use client';
import Radiobuttons from '@/components/Radiobuttons';
import { useFormState } from 'react-dom';
import { stepOneFormAction } from './actions';
import { FormErrors } from '@/types';
import SubmitButton from '@/components/SubmitButton';

const initialState: FormErrors = {};

export default function StepOneForm() {
  const [serverErrors, formAction] = useFormState(
    stepOneFormAction,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
        <Radiobuttons
          label="Name"
          id="cybercat"
          name="charRadio"
          type="radio"
          value="Cybersecurity"
          errorMsg={serverErrors?.name}
        />
        <Radiobuttons
          label="Name"
          id="devdog"
          name="charRadio"
          type="radio"
          value="Software Developement/engineer"
          errorMsg={serverErrors?.name}
        />
        <Radiobuttons
          label="Name"
          name="charRadio"
          id="linuxpenguin"
          type="radio"
          value="Linux Administrator"
          errorMsg={serverErrors?.name}
        />

        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}

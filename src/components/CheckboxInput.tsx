'use client';

import { useAddDealContext } from '@/contexts/addDealContext';
import { useState, useEffect, useCallback } from 'react';

interface InputProps {
  label: string;
  id: string;
  description?: string;
  required?: boolean;
  pattern?: string;
  type: string;
  minLength?: number;
  min?: number;
  max?: number;
  errorMsg?: string;

}
export default function CheckboxInput({
  label,
  id,
  required,
  pattern,
  type,
  minLength,
  min,
  max,
  description,
  errorMsg,
}: InputProps) {
  const { updateNewDealDetails, newDealData } = useAddDealContext();
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked)
    updateNewDealDetails({ [e.target.name]: !isChecked });
  }

  //only need to run this one time upon refresh
  useEffect(
    ()=>{
      console.log('running useEffect')

      if(newDealData[id] === true){
        setIsChecked(true)
        console.log('newDeal data was true')
      }
      console.log('running useEffect')
    },[newDealData[id]]
  )

  console.log(`isChecked is ${isChecked}`)

  return (
    <div className='block'>
      <label className='flexbox pr-4' htmlFor={id}>
        {label}     <input
          checked={isChecked}
          className={`rounded-md px-2 text-slate-900 ${
            errorMsg ? 'border-red-500' : 'border-slate-300'
          } border-2`}
          type={type}
          name={id}
          id={id}
          required={required}
          pattern={pattern}
          minLength={minLength}
          min={min}
          max={max}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}
function setUpdatedDeal(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}

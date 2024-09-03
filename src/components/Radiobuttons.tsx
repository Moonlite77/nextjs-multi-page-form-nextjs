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
  value?: string;
  name?: string;

}
export default function Radiobuttons({
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
  value,
  name,
}: InputProps) {
  const { updateNewDealDetails, newDealData } = useAddDealContext();
  let myCurrentName = newDealData[name]
  const [myName, setMyName] = useState('');

  const isRadioSelected = (value: string): boolean => {if(myName == value){ return true} else {return false}}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    updateNewDealDetails({ [e.target.name]: e.target.value });
    console.log(`new deal data @ charRadio is: ${newDealData[name]}`)
  }

  //only need to run this one time upon refresh
useEffect(()=>{
  console.log(`Before useEffect, data shows: ${newDealData[name]} and local state is ${myName}`)
  setMyName(newDealData[name]);
  console.log(`After useEffect, data shows: ${newDealData[name]} and local state is ${myName}`)
},[newDealData[name]])
  

  return (
    <div className='block'>
      <label className='flexbox pr-4' htmlFor={id}>
        {value}     <input
          className={`rounded-md px-2 text-slate-900 ${
            errorMsg ? 'border-red-500' : 'border-slate-300'
          } border-2`}
          type={type}
          value={value}
          name={name}
          id={id}
          required={required}
          pattern={pattern}
          minLength={minLength}
          min={min}
          max={max}
          onChange={handleInputChange}
          checked={myName === value}
        />
      </label>
    </div>
  );
}
function setUpdatedDeal(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}

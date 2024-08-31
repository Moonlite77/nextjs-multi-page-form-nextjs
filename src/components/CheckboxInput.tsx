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
    console.log(e.target.name)
    updateNewDealDetails({ [e.target.name]: !isChecked });
  }

  useEffect(
    ()=>{
      console.log('running useEffect')
      console.log(newDealData[id])
      if(newDealData[id] === true){
        setIsChecked(true)
        console.log('newDeal data was true')
      }
      console.log('running useEffect')
    },[newDealData[id]]
  )
  
    
  /*const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked)
    updateNewDealDetails({ [e.target.name]: !isChecked });
    setForceUpdateKey(forceUpdateKey + 1);
  };*/

  console.log(`isChecked is ${isChecked}`)

  return (
    <div>
      <label className="block text-lg" htmlFor={id}>
        {label}
        {description && (
          <span className="text-sm text-slate-200 block mb-1">
            {description}
          </span>
        )}
      </label>
      <input
        checked={isChecked}
        className={`w-full rounded-md py-4 px-2 text-slate-900 ${
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
      <div className="min-h-8 mt-1">
        {errorMsg && (
          <span className="text-red-500 text-sm block ">{errorMsg}</span>
        )}
      </div>
    </div>
  );
}
function setUpdatedDeal(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}

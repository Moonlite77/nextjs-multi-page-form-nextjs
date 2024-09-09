'use client';
import Input from '@/components/Input';
import SubmitButton from '../../../components/SubmitButton';
import { submitDealAction } from './actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAddDealContext } from '@/contexts/addDealContext';
import { NewDealType } from '@/schemas';
import CreatePicture from '@/app/add/review/createPicture'
import StoreLink from './storeLink';

export default function ReviewForm() {
  const router = useRouter();
  const { updateNewDealDetails, newDealData, resetLocalStorage } = useAddDealContext();

  const { charRadio, yoe, awsCloudPractitioner, securityPlusCompTIA, cisspISC2, degree, clearance, contactEmail } =
    newDealData;


  const handleFormSubmit = async (formData: FormData) => {
    const res = await submitDealAction(newDealData as NewDealType);
    const { redirect, errorMsg, success } = res;

    if (success) {
      toast.success('Deal submitted successfully');


      //start running CreatePicture here?
      //
      const createPicResponse = await CreatePicture(
        newDealData['charRadio'], 
        newDealData['yoe'],  
        newDealData['degree'],
        newDealData['clearance'],
        newDealData['contactEmail'],
        newDealData['awsCloudPractitioner'],
        newDealData['securityPlusCompTIA'],
        newDealData['cisspISC2'],
       );
      console.log(createPicResponse)
      updateNewDealDetails({['openAIURL']: createPicResponse})
      //
      //end running here maybe?

      //BELOW IS THE CODE TO RESET LOCAL STORAGE... BE CAREFUL. It's commented out to move this logic later in the UX.
      //resetLocalStorage();
    } else if (errorMsg) {
      toast.error(errorMsg);
    }
    if (redirect) {
      return router.push(redirect);
    }
  };

  return (
    <form
      action={handleFormSubmit}
      className="flex flex-1 flex-col gap-2 items-stretch lg:max-w-[700px]"
    >
      <p className="text-xl md:text-3xl">Career Field: {charRadio}</p>
      <p className="text-white/90">Years of Experience: {yoe}</p>
      <p className="text-white/90">Degree: {degree}</p>
      <p className="text-white/90">Clearance: {clearance}</p>
      <p className="text-white/90">Contact Email: {contactEmail}</p>
      <SubmitButton text="Submit" />
    </form>
  );
}
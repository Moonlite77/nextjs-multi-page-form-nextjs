'use client';
import Icon from '@/components/Icon';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';
import { AddDealRoutes } from '@/types';

const steps = [
  {
    title: 'Step One',
    route: 'step-one',
    link: AddDealRoutes.PRODUCT_INFO,
  },
  {
    title: 'Step Two',
    route: 'step-two',
    link: AddDealRoutes.COUPON_DETAILS,
  },
  {
    title: 'Step Three',
    route: 'step-three',
    link: AddDealRoutes.CONTACT_INFO,
  },
  {
    title: 'Step Five',
    route: 'step-five',
    link: AddDealRoutes.CLEARANCE,
  },
  {
    title: 'Step Six',
    route: 'step-six',
    link: AddDealRoutes.CLIENT_EMAIL,
  },
  { title: 'Review', route: 'review', link: AddDealRoutes.REVIEW_DEAL },
  { title: 'View', route: 'view-image', link: AddDealRoutes.VIEW_IMAGE },
];

export default function StepNavigation() {
  const pathname = usePathname();
  const currentPath = path.basename(pathname);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(steps.findIndex((step) => step.route === currentPath));
  }, [currentPath]);

  return (
    <div className="bg-red min-w-60">
      {/* back button */}
      <Link
        href={steps[currentStep - 1]?.link || steps[0].link}
        className="flex items-center gap-2 text-xl disabled:text-white/50"
      >
        Back
      </Link>

      {/* list of form steps */}
      <div className="mt-4 mb-10 grid grid-cols-7 justify-between items-center justify-items-center">
        {steps.map((step, i) => (
          <Link
            href={step.link}
            key={step.link}
            className="group z-20 flex items-center gap-3 text-2xl"
            prefetch={true}
          >
            <span
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full border  text-sm  transition-colors duration-200  lg:h-12 lg:w-12 lg:text-lg',
                {
                  'border-none bg-teal-500 text-black group-hover:border-none group-hover:text-black':
                    currentPath === step.route,
                  'border-white/75 bg-gray-900 group-hover:border-white group-hover:text-white text-white/75':
                    currentPath !== step.route,
                }
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                'hidden text-white/75 transition-colors duration-200 group-hover:text-white lg:block',
                {
                  'font-light': currentPath !== step.route,
                  'font-semibold text-white': currentPath === step.route,
                }
              )}
            >
            </span>
          </Link>
        ))}
        {/* mobile background dashes */}
      </div>
    </div>
  );
}

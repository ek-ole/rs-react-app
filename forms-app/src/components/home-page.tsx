import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addSubmission } from '@/store/form-slice';
import { cn } from '@/utils/cn';

import FormSubmissions from './form-submissions/form-submissions';
import UncontrolledForm from './forms/uncontrolled-form';
import Modal from './modal/modal';

function HomePage() {
  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);
  const [isHookFormModalOpen, setIsHookFormModalOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='flex h-[100vh] flex-col justify-between'>
      <div className="mx-2 flex min-h-[80vh] gap-26 flex-col items-center justify-center p-4 md:p-14">
        <div
          className={cn(
            'mx-auto flex w-full max-w-3xl flex-col',
            'items-center rounded-xl border-4 p-4',
            'shadow-glow justify-center',
          )}
        >
          <h1 className="text-3xl font-bold">Forms</h1>
          <div className="mb-8 space-y-4 text-center">
            <p>This is a React application for exploring React Forms.</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row">
            <button
              onClick={() => setIsUncontrolledModalOpen(true)}
              className={cn(
                'hover:bg-shadow hover:text-primary-light',
                'hover:border-shadow m-8 cursor-pointer',
                'rounded-xl border-3 px-2 font-medium',
                'shadow-shadow shadow-[0px_0px_5px_2px]',
                'px-4 py-2 transition-colors duration-400 sm:border-4',
                'transition-transform duration-400 hover:scale-105',
              )}
            >
              Uncontrolled Form
            </button>
            <button
              onClick={() => setIsHookFormModalOpen(true)}
              className={cn(
                'hover:bg-shadow hover:text-primary-light',
                'hover:border-shadow m-8 cursor-pointer',
                'rounded-xl border-3 px-2 font-medium',
                'shadow-shadow shadow-[0px_0px_5px_2px]',
                'px-4 py-2 transition-colors duration-400 sm:border-4',
                'transition-transform duration-400 hover:scale-105',
              )}
            >
              React Hook Form
            </button>
          </div>

          <Modal
            isOpen={isUncontrolledModalOpen}
            onClose={() => setIsUncontrolledModalOpen(false)}
            title="Uncontrolled Form"
          >
            <UncontrolledForm
              onSubmit={(data) => {
                console.log('Uncontrolled form:', data);
                dispatch(
                  addSubmission({
                    formType: 'uncontrolled',
                    data: data,
                  }),
                );
                setIsUncontrolledModalOpen(false);
              }}
            />
          </Modal>

          <Modal
            isOpen={isHookFormModalOpen}
            onClose={() => setIsHookFormModalOpen(false)}
            title="React Hook Form"
          >
            <p>Look, it&apos;s React Hook Form</p>
          </Modal>
        </div>
        <FormSubmissions />
      </div>
      
      <div className="p-3 flex w-full flex-wrap items-center justify-center">
        Created by Ekaterina Dmitrenko as part of the RS School React Course
        <img
          src="/rss-logo.svg"
          alt="RS School"
          className="ml-2 h-5 w-5 transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>
  );
}

export default HomePage;

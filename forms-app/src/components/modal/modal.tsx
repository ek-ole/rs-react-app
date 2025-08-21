import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  children: ReactNode;
  title: string;
};

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={cn('bg-shadow/40 fixed inset-0', 'z-50 flex items-center', 'justify-center p-4')}
    >
      <div
        ref={modalRef}
        className={cn(
          'bg-custom-linear w-full rounded-lg',
          'inset-shadow-shadow flex flex-col inset-shadow-[0px_0px_20px_-2px]',
          'max-h-[90vh] max-w-md items-center',
          'justify-center overflow-y-auto',
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {title && (
          <div className="relative flex w-full items-center justify-center p-6">
            <h2 id="modal-title" className="text-xl font-semibold">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className={cn(
                'hover:text-shadow absolute top-0 right-3',
                'cursor-pointer',
                'rounded-4xl text-3xl hover:scale-120',
                'font-bold transition-transform duration-300',
              )}
            >
              ×
            </button>
          </div>
        )}

        <div
          className={cn(
            'border-p-4 flex w-full max-w-sm items-center gap-2',
            'mb-6 rounded-xl border-3 p-2',
            'shadow-inset items-center justify-center',
          )}
        >
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

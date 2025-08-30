import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/utils/cn";

import Portal from "./portal";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  children: ReactNode;
  title: string;
}

function Modal({ isOpen, onClose, children, title }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
document.body.style.overflow = 'unset';
  }

  return () => {
    document.body.style.overflow = 'unset';
  };
  }, [isOpen]);

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

  return (
    <Portal>
      <div className={cn('bg-shadow/40 fixed inset-0 z-50 flex items-center justify-center p-4')}>
        <div
          ref={modalRef}
          className={cn('bg-primary-light w-full max-w-md rounded-xl border-3 p-6', 'shadow-glow')}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
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
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
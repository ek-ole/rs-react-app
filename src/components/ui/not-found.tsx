import useLocalStorage from '@/hooks/useLocalStorage';
import { SEARCH_TERM_KEY } from '@/services/constants';

type Props = {
  error: string;
  onReset: VoidFunction;
};

export function NotFound({ error, onReset }: Props) {
  const [, setSearchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');
  const handleReset = () => {
    setSearchTerm('');
    onReset();
  };

  return (
    <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center rounded-xl border-4 p-4">
      <p className="text-center whitespace-pre-line">{error}</p>
      <button
        onClick={handleReset}
        className="hover:bg-foreground/80 hover:text-primary-light hover:border-foreground my-4 cursor-pointer rounded-xl border-3 px-4 font-medium transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2"
      >
        Reset search
      </button>
      <img
        src="/not-found.webp"
        alt="Not found"
        className="mb-4 rounded-2xl object-contain"
        loading="lazy"
      />
    </div>
  );
}

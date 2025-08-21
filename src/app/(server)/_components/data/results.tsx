import { useTranslations } from 'next-intl';

import ResultsInteractive from '@/app/(client)/_components/data/results-interactive';
import { cn } from '@/app/(server)/_lib/cn';
import type { Character } from '@/app/_types/character';

type ResultsProps = {
  characters: Character[];
};

function Results({ characters }: ResultsProps) {
  const t = useTranslations('Results');
  return (
    <div
      className={cn(
        'mx-auto mt-6 flex w-full max-w-6xl',
        'flex-col items-center rounded-xl border-4 p-4',
        'shadow-glow',
      )}
    >
      <h2 className="text-xl font-bold">{t('title')}</h2>
      <ResultsInteractive characters={characters} />
    </div>
  );
}

export default Results;

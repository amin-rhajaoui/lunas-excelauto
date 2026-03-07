import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function GenerateButton({ onClick, loading, disabled }: Props) {
  return (
    <Button
      size="lg"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full md:w-auto h-12 px-8 text-base font-bold gap-2"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      {loading ? 'Generation en cours...' : 'Generer le fichier Excel'}
    </Button>
  );
}

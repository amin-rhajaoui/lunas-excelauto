import { Download, Loader2 } from 'lucide-react';

interface Props {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function GenerateButton({ onClick, loading, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full md:w-auto inline-flex items-center justify-center gap-3 h-14 px-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-lg font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      {loading ? 'Generation en cours...' : 'Generer le fichier Excel'}
    </button>
  );
}

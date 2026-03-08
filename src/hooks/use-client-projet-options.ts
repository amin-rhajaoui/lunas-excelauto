import { useEffect, useState } from 'react';
import { fetchDistinctClients, fetchDistinctProjets } from '../services/tarificationService';

export function useClientProjetOptions(client: string, refreshKey: number) {
  const [clientOptions, setClientOptions] = useState<string[]>([]);
  const [projetOptions, setProjetOptions] = useState<string[]>([]);

  // Fetch distinct clients on mount and when refreshKey changes
  useEffect(() => {
    fetchDistinctClients()
      .then(setClientOptions)
      .catch(() => setClientOptions([]));
  }, [refreshKey]);

  // Fetch distinct projets when client changes (or refreshKey)
  useEffect(() => {
    if (!client.trim()) {
      setProjetOptions([]);
      return;
    }
    fetchDistinctProjets(client)
      .then(setProjetOptions)
      .catch(() => setProjetOptions([]));
  }, [client, refreshKey]);

  return { clientOptions, projetOptions };
}

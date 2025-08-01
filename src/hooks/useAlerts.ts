import { useEffect, useState } from "react";
import { Alert } from "../data/alerts";
import { fetchAlerts } from "../mockApi/alertsApi";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAlerts = async () => {
    setLoading(true);
    const data = await fetchAlerts();
    setAlerts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return { alerts, setAlerts, loading };
}

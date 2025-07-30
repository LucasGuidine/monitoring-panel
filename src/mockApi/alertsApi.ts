import { Alert, alerts as mockAlerts } from "../data/alerts";

const ALERT_STORAGE_KEY = "mocked_alerts";

const delay = () => {
  const randomMs = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  return new Promise((res) => setTimeout(res, randomMs));
};

function getStoredAlerts(): Alert[] {
  const raw = localStorage.getItem(ALERT_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function setStoredAlerts(alerts: Alert[]) {
  localStorage.setItem(ALERT_STORAGE_KEY, JSON.stringify(alerts));
}

function initializeStorage() {
  const raw = localStorage.getItem(ALERT_STORAGE_KEY);
  if (!raw) {
    setStoredAlerts(mockAlerts);
  }
}

initializeStorage();

export async function fetchAlerts(): Promise<Alert[]> {
  await delay();
  return getStoredAlerts();
}

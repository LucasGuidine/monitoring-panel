import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import * as Styled from "./styles";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "../../data/alerts";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Camera } from "../../data/cameras";
import { fetchCameras } from "../../mockApi/cameraApi";
import Loader from "../../components/Loader";
import { fetchAlerts } from "../../mockApi/alertsApi";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

const COLORS = ["#f87171", "#facc15", "#4ade80"];

export default function Analytics() {
  const navigate = useNavigate();
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [listCameraLoading, setListCameraLoading] = useState(false);
  const [listAlertsLoading, setListAlertsLoading] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [groupBy, setGroupBy] = useState<"day" | "week" | "month">("day");

  const getCameras = async () => {
    setListCameraLoading(true);
    const cameras = await fetchCameras();
    setCameras(cameras);
    setListCameraLoading(false);
  };

  const getAlerts = async () => {
    setListAlertsLoading(true);
    const alerts = await fetchAlerts();
    setAlerts(alerts);
    setListAlertsLoading(false);
  };

  useEffect(() => {
    getCameras();
    getAlerts();
  }, []);

  const alertsByType = useMemo(() => {
    return alerts.reduce((acc: Record<string, number>, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1;
      return acc;
    }, {});
  }, [alerts]);

  const alertsByCamera = useMemo(() => {
    return alerts.reduce((acc: Record<string, number>, alert) => {
      const camera = cameras.find((c) => c.id === alert.cameraId);
      const cameraName = camera ? camera.name : "Câmera Desconhecida";

      acc[cameraName] = (acc[cameraName] || 0) + 1;
      return acc;
    }, {});
  }, [cameras, alerts]);

  const alertsByTime = useMemo(() => {
    const counts: Record<string, number> = {};

    alerts.forEach((alert) => {
      let key = "";
      const date = moment(alert.timestamp);

      if (groupBy === "day") {
        key = date.format("YYYY-MM-DD");
      } else if (groupBy === "week") {
        key = `${date.year()}-W${date.week()}`;
      } else if (groupBy === "month") {
        key = date.format("YYYY-MM");
      }

      counts[key] = (counts[key] || 0) + 1;
    });

    const sortedKeys = Object.keys(counts).sort();

    return sortedKeys.map((key) => ({
      date: key,
      count: counts[key],
    }));
  }, [alerts, groupBy]);

  const top5Cameras = useMemo(() => {
    const counts: Record<string, number> = {};
    alerts.forEach((alert) => {
      counts[alert.cameraId] = (counts[alert.cameraId] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
      .slice(0, 5);

    return sorted.map(([cameraId, count]) => {
      const camera = cameras.find((c) => c.id === cameraId);
      return {
        name: camera ? camera.name : "Câmera Desconhecida",
        value: count,
      };
    });
  }, [alerts, cameras]);

  const typeData = Object.entries(alertsByType).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const cameraData = Object.entries(alertsByCamera).map(([camera, count]) => ({
    name: camera,
    value: count,
  }));

  return (
    <Styled.Container>
      <Styled.BackButton onClick={() => navigate("/")}>
        <ArrowLeft size={18} />
        <span>Voltar para o Dashboard</span>
      </Styled.BackButton>

      {listCameraLoading || listAlertsLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Estatísticas de Alertas</h2>

          <Styled.GroupByButtons>
            <button
              onClick={() => setGroupBy("day")}
              className={groupBy === "day" ? "active" : ""}
            >
              Dia
            </button>
            <button
              onClick={() => setGroupBy("week")}
              className={groupBy === "week" ? "active" : ""}
            >
              Semana
            </button>
            <button
              onClick={() => setGroupBy("month")}
              className={groupBy === "month" ? "active" : ""}
            >
              Mês
            </button>
          </Styled.GroupByButtons>

          <Styled.ChartsGrid>
            <Styled.Card style={{ gridColumn: "span 2" }}>
              <h3>Alertas ao Longo do Tempo</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={alertsByTime}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => {
                      if (groupBy === "day")
                        return moment(date).format("DD/MM/YYYY");
                      if (groupBy === "week")
                        return `Semana ${moment(date).week()}`;
                      if (groupBy === "month")
                        return moment(date).format("MM/YYYY");
                      return date;
                    }}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    labelFormatter={(label) => {
                      if (groupBy === "day")
                        return moment(label).format("DD/MM/YYYY");
                      if (groupBy === "week")
                        return `Semana ${moment(label).week()}`;
                      if (groupBy === "month")
                        return moment(label).format("MM/YYYY");
                      return label;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Styled.Card>

            <Styled.Card>
              <h3>Alertas por Tipo</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {typeData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Styled.Card>

            <Styled.Card>
              <h3>Alertas por Câmera</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={cameraData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Styled.Card>

            <Styled.Card>
              <h3>Top 5 Câmeras com Mais Alertas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="vertical"
                  data={top5Cameras}
                  margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                >
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 14 }}
                    width={120}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </Styled.Card>
          </Styled.ChartsGrid>
        </>
      )}
    </Styled.Container>
  );
}

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
} from "recharts";
import * as Styled from "./styles";
import { useMemo } from "react";
import { alerts } from "../../data/alerts";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const COLORS = ["#f87171", "#facc15", "#4ade80"];

export default function Analytics() {
  const navigate = useNavigate();

  const alertsByType = useMemo(() => {
    return alerts.reduce((acc: Record<string, number>, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const alertsByCamera = useMemo(() => {
    return alerts.reduce((acc: Record<string, number>, alert) => {
      acc[alert.cameraName] = (acc[alert.cameraName] || 0) + 1;
      return acc;
    }, {});
  }, []);

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

      <h2>Estatísticas de Alertas</h2>

      <Styled.ChartsGrid>
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
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Styled.Card>
      </Styled.ChartsGrid>
    </Styled.Container>
  );
}

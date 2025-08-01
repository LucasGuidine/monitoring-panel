import React from "react";
import * as Styled from "./styles";
import { Camera } from "../../data/cameras";

type Props = {
  startDate: string;
  endDate: string;
  selectedCameraId: string;
  selectedAlertType: string;
  cameras: Camera[];
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onCameraChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
};

export default function AlertsFilterPanel({
  startDate,
  endDate,
  selectedCameraId,
  selectedAlertType,
  cameras,
  onStartDateChange,
  onEndDateChange,
  onCameraChange,
  onTypeChange,
  onClearFilters,
}: Props) {
  return (
    <Styled.FiltersWrapper>
      <label>
        Início:
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </label>

      <label>
        Fim:
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </label>

      <label>
        Câmera:
        <select
          value={selectedCameraId}
          onChange={(e) => onCameraChange(e.target.value)}
        >
          <option value="">Todas</option>
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tipo:
        <select
          value={selectedAlertType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Invasão">Invasão</option>
          <option value="EPI">EPI</option>
        </select>
      </label>

      <Styled.ClearButton onClick={onClearFilters}>
        Limpar Filtros
      </Styled.ClearButton>
    </Styled.FiltersWrapper>
  );
}

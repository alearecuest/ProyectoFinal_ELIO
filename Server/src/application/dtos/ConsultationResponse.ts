export type ConsultationResponse = {
  patientID: string;
  pasoActual: string;
  opciones?: { label: string; checked: boolean }[];
};

export const ConsultationResponse = {
  toHttp(result: ConsultationResponse) {
    return {
      patientID: result.patientID,
      pasoActual: result.pasoActual,
      opciones: (result.opciones ?? []).map((o: any) => ({
        label: String(o?.label ?? '').trim(),
        checked: Boolean(o?.checked),
      })),
    };
  },
};


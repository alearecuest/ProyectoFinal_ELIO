import type { IConsultationRepository } from '../../domain/ports/IConsultationRepository.ts';
import type { PartialState } from '../../session.ts';
import { NotFoundError } from '../../domain/errors/NotFoundError.ts';
import type { AnamnesisCollectRequest, AnamnesisAnswer } from '../dtos/AnamnesisCollectRequest.ts';

export class CollectAnamnesisUseCase {
  constructor(private repo: IConsultationRepository) {}

  async execute(req: AnamnesisCollectRequest) {
  const consultation = await this.repo.get(req.patientID);
  if (!consultation) throw new NotFoundError('Consulta no encontrada');

    const existing: PartialState = consultation.getPartialState() || {};

  const update: Record<string, any> = {};

    const applyAnswer = (a: AnamnesisAnswer) => {
      const key = a.key;
      try {
        switch (a.type) {
          case 'boolean':
            update[key] = Boolean(a.value);
            break;
          case 'number':
            update[key] = typeof a.value === 'number' ? a.value : Number(a.value);
            break;
          case 'multi':
            update[key] = Array.isArray(a.value) ? a.value.map((v: any) => String(v)) : String(a.value).split(',').map((s: string) => s.trim());
            break;
          case 'date':
            update[key] = String(a.value);
            break;
          case 'single':
          case 'text':
          default:
            update[key] = a.value != null ? String(a.value) : '';
        }
      } catch (e) {
        // best-effort: skip invalid conversion
      }
    };

    for (const a of req.answers ?? []) applyAnswer(a as AnamnesisAnswer);

    consultation.savePartialState({ ...existing, ...update });
    await this.repo.save(req.patientID, consultation);

    return { patientID: req.patientID, pasoActual: consultation.getCurrentStep(), partialState: consultation.getPartialState() };
  }
}

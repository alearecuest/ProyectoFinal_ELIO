import type { IConsultationRepository } from "../../infrastructure/adapters/persistence/IConsultationRepository.ts";
import type { PartialState } from '../../session.ts';
import { AntecedentePersonal, Alergia, FarmacoHabitual } from '../../domain/value-objects/index.ts';

export class AdvanceStepUseCase {
  constructor(private repo: IConsultationRepository) {}

  async execute(id: string, update: PartialState) {
    const consultation = await this.repo.get(id);
    if (!consultation) {
      const { NotFoundError } = await import('../../domain/errors/NotFoundError.ts');
      throw new NotFoundError('No existe la sesión');
    }

    if (update.antecedentes_personales) {

      const arr = Array.isArray(update.antecedentes_personales) ? update.antecedentes_personales : [];
      arr.forEach((a) => new AntecedentePersonal(a));
    }

    if (update.alergias) {
      const arr = Array.isArray(update.alergias) ? update.alergias : [];
      arr.forEach((a) => new Alergia(a));
    }

    if (update.farmacos_habituales) {
      const arr = Array.isArray(update.farmacos_habituales) ? update.farmacos_habituales : [];
      arr.forEach((f) => new FarmacoHabitual(f));
    }

    consultation.savePartialState(update);
    consultation.nextStep();
    await this.repo.save(id, consultation);

    return {
      pasoActual: consultation.getCurrentStep(),
      partialState: consultation.getPartialState(),
    };
  }
}
 

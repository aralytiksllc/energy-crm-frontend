// External

// Internal
import { Stage } from '@/interfaces/stage';

export const StageLabels: Record<Stage, string> = {
  [Stage.LEAD]: 'Lead',
  [Stage.QUALIFIED]: 'Qualified',
  [Stage.PROPOSAL]: 'Proposal',
  [Stage.NEGOTIATION]: 'Negotiation',
  [Stage.CLOSED_WON]: 'Closed Won',
  [Stage.CLOSED_LOST]: 'Closed Lost',
};

export const stageOptions = Object.values(Stage).map((value) => ({
  label: StageLabels[value],
  value,
}));

/**
 * Topic registry. Every question part lists topic ids. Add new topics here as needed.
 */
export const TOPICS = [
  { id: 'linear-models', label: 'Linear models & matrices' },
  { id: 'cramer', label: "Cramer's rule" },
  { id: 'comparative-statics', label: 'Comparative statics' },
  { id: 'matrix-algebra', label: 'Matrix algebra' },
  { id: 'derivatives', label: 'Derivatives & differentials' },
  { id: 'lagrange', label: 'Constrained optimisation' },
  { id: 'second-order', label: 'Second-order conditions' },
  { id: 'value-function', label: 'Value function & envelope' },
  { id: 'unconstrained', label: 'Unconstrained optimisation' },
  { id: 'integration', label: 'Integration' },
  { id: 'interpretation', label: 'Economic interpretation' },
];

export const topicById = new Map(TOPICS.map((t) => [t.id, t]));

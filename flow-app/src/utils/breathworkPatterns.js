// Breathwork Pattern Definitions

export const PILLAR_COLORS = {
  SELF: '#FF6F61',
  SPACE: '#6BA292',
  STORY: '#5B84B1',
  SPIRIT: '#7A4DA4',
};

export const PILLAR_ORDER = ['SELF', 'SPACE', 'STORY', 'SPIRIT'];

export const BREATHWORK_PATTERNS = {
  // BEFORE FLOW - Activation patterns
  BOX_BREATHING: {
    key: 'box-breathing',
    name: 'Box Breathing',
    description: 'Equal breathing for focus (4-4-4-4)',
    benefit: 'Calm Focus',
    phases: [
      { type: 'inhale', duration: 4, label: 'Breathe In' },
      { type: 'hold-full', duration: 4, label: 'Hold' },
      { type: 'exhale', duration: 4, label: 'Breathe Out' },
      { type: 'hold-empty', duration: 4, label: 'Hold' },
    ],
    cycles: 3,
    colorMode: 'cycle',
    timing: 'before',
  },

  ENERGIZING_BREATH: {
    key: 'energizing-breath',
    name: 'Energizing Breath',
    description: 'Quick inhale/exhale for alertness (2-0-2-0)',
    benefit: 'High Alert',
    phases: [
      { type: 'inhale', duration: 2, label: 'Breathe In' },
      { type: 'exhale', duration: 2, label: 'Breathe Out' },
    ],
    cycles: 6,
    colorMode: 'cycle',
    timing: 'before',
  },

  POWER_BREATH: {
    key: 'power-breath',
    name: 'Power Breath',
    description: 'Build confidence and readiness (4-4-6-2)',
    benefit: 'Confidence Boost',
    phases: [
      { type: 'inhale', duration: 4, label: 'Breathe In' },
      { type: 'hold-full', duration: 4, label: 'Hold' },
      { type: 'exhale', duration: 6, label: 'Breathe Out' },
      { type: 'hold-empty', duration: 2, label: 'Pause' },
    ],
    cycles: 3,
    colorMode: 'cycle',
    timing: 'before',
  },

  // AFTER FLOW - Recovery patterns
  RELAXATION_478: {
    key: 'relaxation-478',
    name: '4-7-8 Relaxation',
    description: 'Deep relaxation technique',
    benefit: 'Deep Relaxation',
    phases: [
      { type: 'inhale', duration: 4, label: 'Breathe In' },
      { type: 'hold-full', duration: 7, label: 'Hold' },
      { type: 'exhale', duration: 8, label: 'Breathe Out' },
    ],
    cycles: 3,
    colorMode: 'cycle',
    timing: 'after',
  },

  COHERENT_BREATHING: {
    key: 'coherent-breathing',
    name: 'Coherent Breathing',
    description: 'Balance nervous system (5-5)',
    benefit: 'Nervous System Reset',
    phases: [
      { type: 'inhale', duration: 5, label: 'Breathe In' },
      { type: 'exhale', duration: 5, label: 'Breathe Out' },
    ],
    cycles: 4,
    colorMode: 'cycle',
    timing: 'after',
  },

  GROUNDING_BREATH: {
    key: 'grounding-breath',
    name: 'Grounding Breath',
    description: 'Integration and centering (4-2-6-2)',
    benefit: 'Ground & Integrate',
    phases: [
      { type: 'inhale', duration: 4, label: 'Breathe In' },
      { type: 'hold-full', duration: 2, label: 'Hold' },
      { type: 'exhale', duration: 6, label: 'Breathe Out' },
      { type: 'hold-empty', duration: 2, label: 'Pause' },
    ],
    cycles: 4,
    colorMode: 'cycle',
    timing: 'after',
  },

  // Legacy patterns for compatibility
  PRE_FLOW: {
    key: 'box-breathing',
    name: 'Box Breathing',
    description: 'Equal breathing for focus (4-4-4-4)',
    phases: [
      { type: 'inhale', duration: 4, label: 'Breathe In' },
      { type: 'hold-full', duration: 4, label: 'Hold' },
      { type: 'exhale', duration: 4, label: 'Breathe Out' },
      { type: 'hold-empty', duration: 4, label: 'Hold' },
    ],
    cycles: 3,
    colorMode: 'cycle',
  },

  POST_FLOW: {
    key: 'relaxation-478',
    name: '4-7-8 Relaxation',
    description: 'Deep relaxation technique',
    phases: [
      { type: 'inhale', duration: 4, label: 'Breathe In' },
      { type: 'hold-full', duration: 7, label: 'Hold' },
      { type: 'exhale', duration: 8, label: 'Breathe Out' },
    ],
    cycles: 3,
    colorMode: 'cycle',
  },

  FOUR_LAYER: {
    key: 'four-layer',
    name: 'Four Layer Breath',
    description: 'Framework integration breath - align with each layer',
    phases: [
      // Inhale - 8 seconds total, 2s per layer
      { type: 'inhale', duration: 8, label: 'Breathe In', colorMode: 'layer-transition', layerDuration: 2 },

      // Hold Full - 4 seconds with all-color gradient
      { type: 'hold-full', duration: 4, label: 'Hold & Integrate', colorMode: 'all-gradient' },

      // Exhale - 8 seconds total, 2s per layer (reverse)
      { type: 'exhale', duration: 8, label: 'Breathe Out', colorMode: 'layer-transition-reverse', layerDuration: 2 },
    ],
    cycles: 4,
    colorMode: 'four-layer', // Special mode for Four Layer breath
  },
};

/**
 * Get the color for a specific phase
 * @param {Object} pattern - The breathwork pattern
 * @param {Object} phase - The current phase
 * @param {number} cycleIndex - The current cycle index
 * @param {number} timeInPhase - Current time within the phase (for layer transitions)
 * @returns {string|array} - The color hex value or array of colors for gradient
 */
export function getPhaseColor(pattern, phase, cycleIndex, timeInPhase = 0) {
  // Four Layer breath - special handling
  if (pattern.colorMode === 'four-layer') {
    // Hold phase - return all colors for gradient
    if (phase.colorMode === 'all-gradient') {
      return [PILLAR_COLORS.SELF, PILLAR_COLORS.SPACE, PILLAR_COLORS.STORY, PILLAR_COLORS.SPIRIT];
    }

    // Inhale/Exhale - transition through layers
    if (phase.colorMode === 'layer-transition' || phase.colorMode === 'layer-transition-reverse') {
      const layerDuration = phase.layerDuration || 2;
      const layerIndex = Math.floor(timeInPhase / layerDuration);

      if (phase.colorMode === 'layer-transition') {
        // Forward: SELF -> SPACE -> STORY -> SPIRIT
        const layer = PILLAR_ORDER[Math.min(layerIndex, 3)];
        return PILLAR_COLORS[layer];
      } else {
        // Reverse: SPIRIT -> STORY -> SPACE -> SELF
        const layer = PILLAR_ORDER[Math.max(0, 3 - layerIndex)];
        return PILLAR_COLORS[layer];
      }
    }
  }

  // Legacy pillar mode
  if (pattern.colorMode === 'pillar' && phase.pillar) {
    return PILLAR_COLORS[phase.pillar];
  }

  // Cycle mode - cycle through colors
  if (pattern.colorMode === 'cycle') {
    const colorIndex = cycleIndex % PILLAR_ORDER.length;
    return PILLAR_COLORS[PILLAR_ORDER[colorIndex]];
  }

  return PILLAR_COLORS.SELF; // Default
}

/**
 * Get the current layer label for Four Layer breath
 * @param {Object} phase - The current phase
 * @param {number} timeInPhase - Current time within the phase
 * @returns {string|null} - The layer label or null
 */
export function getCurrentLayerLabel(phase, timeInPhase) {
  if (!phase.colorMode || (!phase.colorMode.includes('layer-transition') && phase.colorMode !== 'all-gradient')) {
    return null;
  }

  if (phase.colorMode === 'all-gradient') {
    return 'All Four Layers';
  }

  const layerDuration = phase.layerDuration || 2;
  const layerIndex = Math.floor(timeInPhase / layerDuration);

  if (phase.colorMode === 'layer-transition') {
    return PILLAR_ORDER[Math.min(layerIndex, 3)];
  } else {
    return PILLAR_ORDER[Math.max(0, 3 - layerIndex)];
  }
}

/**
 * Calculate total duration of one cycle in seconds
 */
export function getCycleDuration(pattern) {
  return pattern.phases.reduce((sum, phase) => sum + phase.duration, 0);
}

/**
 * Calculate total duration of the entire exercise
 */
export function getTotalDuration(pattern) {
  return getCycleDuration(pattern) * pattern.cycles;
}

import React from 'react';

/**
 * Breathwork Animation Component
 * Displays a smooth, minimalist animated circle that responds to breath phases
 */
const BreathworkAnimation = ({ phase, progress, color }) => {
  if (!phase) return null;

  // Check if color is a gradient (array of colors)
  const isGradient = Array.isArray(color);

  // Calculate scale based on phase type and progress
  const getScale = () => {
    switch (phase.type) {
      case 'inhale':
        // Expand from 0.4 to 1.0
        return 0.4 + (progress * 0.6);

      case 'hold-full':
        // At full size (1.0) with gentle outward pulse
        const pulseFull = 1.0 + (Math.sin(progress * Math.PI * 4) * 0.05);
        return pulseFull;

      case 'exhale':
        // Contract from 1.0 to 0.4
        return 1.0 - (progress * 0.6);

      case 'hold-empty':
        // At small size (0.4) with gentle inward pulse
        const pulseEmpty = 0.4 + (Math.sin(progress * Math.PI * 4) * 0.03);
        return pulseEmpty;

      default:
        return 0.7;
    }
  };

  // Calculate opacity for glow effect
  const getGlowIntensity = () => {
    switch (phase.type) {
      case 'inhale':
        return 0.3 + (progress * 0.4); // Building energy
      case 'hold-full':
        return 0.7 + (Math.sin(progress * Math.PI * 2) * 0.2); // Pulsing energy
      case 'exhale':
        return 0.7 - (progress * 0.4); // Releasing energy
      case 'hold-empty':
        return 0.3; // Grounded, minimal
      default:
        return 0.5;
    }
  };

  const scale = getScale();
  const glowIntensity = getGlowIntensity();

  // Create gradient for the circle
  const gradientId = `breath-gradient-${phase.type}`;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* SVG for gradient circle */}
      <svg className="absolute inset-0 w-full h-full" style={{ filter: `blur(0px)` }}>
        <defs>
          {/* Radial gradient */}
          {!isGradient ? (
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={color} stopOpacity={glowIntensity * 0.9} />
              <stop offset="50%" stopColor={color} stopOpacity={glowIntensity * 0.6} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </radialGradient>
          ) : (
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={color[0]} stopOpacity={glowIntensity * 0.9} />
              <stop offset="30%" stopColor={color[1]} stopOpacity={glowIntensity * 0.7} />
              <stop offset="60%" stopColor={color[2]} stopOpacity={glowIntensity * 0.5} />
              <stop offset="90%" stopColor={color[3]} stopOpacity={glowIntensity * 0.3} />
              <stop offset="100%" stopColor={color[3]} stopOpacity={0} />
            </radialGradient>
          )}

          {/* Blur filter for glow */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main circle with gradient */}
        <circle
          cx="50%"
          cy="50%"
          r="35%"
          fill={`url(#${gradientId})`}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            transition: 'transform 0.1s ease-out',
          }}
        />
      </svg>

      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '70%',
          height: '70%',
          background: isGradient
            ? `radial-gradient(circle, ${color[0]}${Math.floor(glowIntensity * 100).toString(16).padStart(2, '0')} 0%, ${color[1]}${Math.floor(glowIntensity * 80).toString(16).padStart(2, '0')} 35%, ${color[2]}${Math.floor(glowIntensity * 60).toString(16).padStart(2, '0')} 65%, ${color[3]}${Math.floor(glowIntensity * 40).toString(16).padStart(2, '0')} 100%)`
            : `radial-gradient(circle, ${color}${Math.floor(glowIntensity * 100).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          transform: `scale(${scale})`,
          transition: 'all 0.1s ease-out',
          filter: 'blur(20px)',
        }}
      />

      {/* Core solid circle */}
      <div
        className="absolute rounded-full"
        style={{
          width: '50%',
          height: '50%',
          background: isGradient
            ? `conic-gradient(from 0deg, ${color[0]} 0deg, ${color[1]} 90deg, ${color[2]} 180deg, ${color[3]} 270deg, ${color[0]} 360deg)`
            : `radial-gradient(circle, ${color} 0%, ${color}88 100%)`,
          transform: `scale(${scale})`,
          transition: 'all 0.1s ease-out',
          boxShadow: isGradient
            ? `0 0 40px ${color[0]}88, 0 0 60px ${color[2]}66`
            : `0 0 40px ${color}${Math.floor(glowIntensity * 150).toString(16).padStart(2, '0')}`,
        }}
      />
    </div>
  );
};

export default BreathworkAnimation;

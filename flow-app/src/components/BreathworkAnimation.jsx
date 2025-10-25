import React from 'react';

/**
 * Breathwork Animation Component
 * Displays a sophisticated, smooth, and flowy animated circle that responds to breath phases
 * with advanced easing, layered animations, and organic movement
 */
const BreathworkAnimation = ({ phase, progress, color }) => {
  if (!phase) return null;

  // Check if color is a gradient (array of colors)
  const isGradient = Array.isArray(color);

  // Advanced easing functions for organic movement
  const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
  const easeOutElastic = (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  };

  // Calculate scale based on phase type and progress with sophisticated easing
  const getScale = () => {
    switch (phase.type) {
      case 'inhale':
        // Smooth expansion from 0.3 to 1.0 with easeInOutQuart
        const inhaleEased = easeInOutQuart(progress);
        return 0.3 + (inhaleEased * 0.7);

      case 'hold-full':
        // Gentle organic pulse at full size using multiple sine waves
        const time = progress * Math.PI * 6;
        const pulse1 = Math.sin(time) * 0.03;
        const pulse2 = Math.sin(time * 1.3 + 0.5) * 0.02;
        const pulse3 = Math.sin(time * 0.7 + 1.2) * 0.015;
        return 1.0 + pulse1 + pulse2 + pulse3;

      case 'exhale':
        // Smooth contraction from 1.0 to 0.3 with easeInOutSine
        const exhaleEased = easeInOutSine(progress);
        return 1.0 - (exhaleEased * 0.7);

      case 'hold-empty':
        // Subtle breathing at small size
        const emptyTime = progress * Math.PI * 4;
        const emptyPulse = Math.sin(emptyTime) * 0.02 + Math.sin(emptyTime * 1.7) * 0.01;
        return 0.3 + emptyPulse;

      default:
        return 0.65;
    }
  };

  // Calculate opacity for glow effect with smooth transitions
  const getGlowIntensity = () => {
    switch (phase.type) {
      case 'inhale':
        const inhaleGlow = easeInOutQuart(progress);
        return 0.2 + (inhaleGlow * 0.6); // Building energy
      case 'hold-full':
        const holdTime = progress * Math.PI * 3;
        return 0.8 + (Math.sin(holdTime) * 0.15); // Pulsing peak energy
      case 'exhale':
        const exhaleGlow = easeInOutSine(progress);
        return 0.8 - (exhaleGlow * 0.5); // Releasing energy smoothly
      case 'hold-empty':
        return 0.25; // Grounded, minimal, restful
      default:
        return 0.5;
    }
  };

  // Calculate rotation for organic swirling motion
  const getRotation = () => {
    switch (phase.type) {
      case 'inhale':
        return progress * 15; // Slow rotation during inhale
      case 'hold-full':
        return 15 + (progress * 10); // Continue gentle rotation
      case 'exhale':
        return 25 + (progress * 15); // Slightly faster rotation
      case 'hold-empty':
        return 40 + (progress * 5); // Minimal rotation
      default:
        return 0;
    }
  };

  // Calculate blur amount for dreamy effect
  const getBlurAmount = () => {
    switch (phase.type) {
      case 'inhale':
        return 25 + (progress * 15); // Increasing dreaminess
      case 'hold-full':
        return 40 - (Math.abs(Math.sin(progress * Math.PI * 2)) * 10); // Pulsing blur
      case 'exhale':
        return 40 - (progress * 15); // Decreasing blur
      case 'hold-empty':
        return 25; // Soft focused
      default:
        return 30;
    }
  };

  const scale = getScale();
  const glowIntensity = getGlowIntensity();
  const rotation = getRotation();
  const blurAmount = getBlurAmount();

  // Create gradient for the circle
  const gradientId = `breath-gradient-${phase.type}`;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient background glow - largest layer */}
      <div
        className="absolute rounded-full"
        style={{
          width: '95%',
          height: '95%',
          background: isGradient
            ? `radial-gradient(circle, ${color[0]}15, ${color[1]}12, ${color[2]}08, transparent 70%)`
            : `radial-gradient(circle, ${color}15, transparent 70%)`,
          transform: `scale(${scale * 0.9}) rotate(${rotation * 0.3}deg)`,
          transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
          filter: `blur(${blurAmount * 1.5}px)`,
          opacity: glowIntensity * 0.6,
        }}
      />

      {/* Outer glow ring - second layer with rotation */}
      <div
        className="absolute rounded-full"
        style={{
          width: '80%',
          height: '80%',
          background: isGradient
            ? `radial-gradient(circle, ${color[0]}${Math.floor(glowIntensity * 60).toString(16).padStart(2, '0')}, ${color[1]}${Math.floor(glowIntensity * 45).toString(16).padStart(2, '0')} 40%, ${color[2]}${Math.floor(glowIntensity * 30).toString(16).padStart(2, '0')} 70%, transparent 90%)`
            : `radial-gradient(circle, ${color}${Math.floor(glowIntensity * 60).toString(16).padStart(2, '0')}, transparent 80%)`,
          transform: `scale(${scale}) rotate(${rotation * 0.5}deg)`,
          transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          filter: `blur(${blurAmount}px)`,
        }}
      />

      {/* Middle ring with rotating gradient */}
      <div
        className="absolute rounded-full"
        style={{
          width: '65%',
          height: '65%',
          background: isGradient
            ? `conic-gradient(from ${rotation}deg, ${color[0]}99, ${color[1]}99, ${color[2]}99, ${color[3]}99, ${color[0]}99)`
            : `radial-gradient(circle, ${color}99 0%, ${color}66 100%)`,
          transform: `scale(${scale * 1.05})`,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          filter: `blur(${blurAmount * 0.6}px)`,
          opacity: glowIntensity * 0.7,
        }}
      />

      {/* Core solid circle with enhanced depth */}
      <div
        className="absolute rounded-full"
        style={{
          width: '50%',
          height: '50%',
          background: isGradient
            ? `conic-gradient(from ${rotation * 1.5}deg, ${color[0]}, ${color[1]}, ${color[2]}, ${color[3]}, ${color[0]})`
            : `radial-gradient(circle at 40% 40%, ${color}FF, ${color}CC, ${color}99)`,
          transform: `scale(${scale})`,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isGradient
            ? `0 0 30px ${color[0]}99, 0 0 60px ${color[2]}77, 0 0 90px ${color[1]}55, inset 0 0 40px ${color[3]}33`
            : `0 0 30px ${color}${Math.floor(glowIntensity * 180).toString(16).padStart(2, '0')}, 0 0 60px ${color}${Math.floor(glowIntensity * 120).toString(16).padStart(2, '0')}, inset 0 0 30px ${color}33`,
        }}
      />

      {/* Inner highlight for depth perception */}
      <div
        className="absolute rounded-full"
        style={{
          width: '30%',
          height: '30%',
          background: isGradient
            ? `radial-gradient(circle at 30% 30%, ${color[0]}AA, transparent 60%)`
            : `radial-gradient(circle at 30% 30%, ${color}66, transparent 60%)`,
          transform: `scale(${scale * 1.1}) translate(-10%, -10%)`,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          filter: 'blur(10px)',
          opacity: glowIntensity * 0.5,
        }}
      />

      {/* Particle-like shimmer effect */}
      <div
        className="absolute rounded-full"
        style={{
          width: '55%',
          height: '55%',
          background: `radial-gradient(circle, transparent 40%, white 40.5%, transparent 41%, transparent 60%, white 60.5%, transparent 61%, transparent 80%, white 80.5%, transparent 81%)`,
          transform: `scale(${scale * 0.95}) rotate(${rotation * 2}deg)`,
          transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
          opacity: glowIntensity * 0.1,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default BreathworkAnimation;

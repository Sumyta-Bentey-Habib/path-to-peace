import { useState, useCallback } from "react";
import { DHIKR_PHRASES } from "@/components/sections/cta-constants";

export function useDhikrCounter() {
  const [activeDhikrIdx, setActiveDhikrIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isTapping, setIsTapping] = useState(false);

  const activeDhikr = DHIKR_PHRASES[activeDhikrIdx];

  // Self-contained Web Audio click synthesizer
  const playClickSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.06);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("Audio Context failure:", e);
    }
  }, []);

  const handleTap = useCallback(() => {
    playClickSound();
    setIsTapping(true);
    setTimeout(() => setIsTapping(false), 100);

    // Haptic vibration feedback for supported mobile devices
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }

    const nextCount = count + 1;
    if (nextCount >= activeDhikr.target) {
      setCount(0);
      setCompletedCycles((c) => c + 1);
    } else {
      setCount(nextCount);
    }
  }, [count, activeDhikr.target, playClickSound]);

  const handleReset = useCallback(() => {
    setCount(0);
    setCompletedCycles(0);
  }, []);

  const handleDhikrChange = useCallback((idx: number) => {
    setActiveDhikrIdx(idx);
    setCount(0);
  }, []);

  // Progress percentage
  const progressPercent = (count / activeDhikr.target) * 100;

  return {
    activeDhikrIdx,
    activeDhikr,
    count,
    completedCycles,
    isTapping,
    progressPercent,
    handleTap,
    handleReset,
    handleDhikrChange,
  };
}

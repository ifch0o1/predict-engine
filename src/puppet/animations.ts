import {interpolate, spring} from 'remotion';
import type {AnimationClip, AnimationPose} from './types';

const idle: AnimationClip = {
  id: 'idle',
  sample: ({frame, fps}) => {
    const phase = (frame / fps) * Math.PI * 2;
    return {
      root: {position: [0, Math.sin(phase) * 2]},
      parts: {
        head: {rotation: Math.sin(phase * 0.5) * 1.2},
        upperArmLeft: {rotation: Math.sin(phase) * 1.5},
        upperArmRight: {rotation: -Math.sin(phase) * 1.5},
      },
    };
  },
};

const walk: AnimationClip = {
  id: 'walk',
  sample: ({frame, fps}) => {
    const phase = (frame / fps) * Math.PI * 3.4;
    const stride = Math.sin(phase);
    const kneeLeft = Math.max(0, -stride) * 28;
    const kneeRight = Math.max(0, stride) * 28;
    return {
      root: {position: [0, -Math.abs(Math.sin(phase)) * 8]},
      parts: {
        head: {rotation: Math.sin(phase) * 1.5},
        torso: {rotation: Math.sin(phase) * 1.2},
        upperArmLeft: {rotation: stride * 28},
        upperArmRight: {rotation: -stride * 28},
        lowerArmLeft: {rotation: 8 + Math.max(0, stride) * 15},
        lowerArmRight: {rotation: -8 - Math.max(0, -stride) * 15},
        upperLegLeft: {rotation: -stride * 27},
        upperLegRight: {rotation: stride * 27},
        lowerLegLeft: {rotation: kneeLeft},
        lowerLegRight: {rotation: kneeRight},
      },
    };
  },
};

const point: AnimationClip = {
  id: 'point',
  sample: ({frame, fps, durationInFrames}) => {
    const enter = spring({
      frame,
      fps,
      config: {damping: 16, stiffness: 120, mass: 0.8},
      durationInFrames: Math.min(durationInFrames, Math.round(fps * 0.7)),
    });
    const emphasis = Math.sin((frame / fps) * Math.PI * 2.2) * 2;
    return {
      root: {position: [0, -enter * 3]},
      parts: {
        torso: {rotation: interpolate(enter, [0, 1], [0, -3])},
        head: {rotation: interpolate(enter, [0, 1], [0, 7])},
        upperArmRight: {rotation: interpolate(enter, [0, 1], [0, -93 + emphasis])},
        lowerArmRight: {rotation: interpolate(enter, [0, 1], [0, 5])},
        upperArmLeft: {rotation: interpolate(enter, [0, 1], [0, 5])},
      },
    };
  },
};

const wave: AnimationClip = {
  id: 'wave',
  sample: ({frame, fps, durationInFrames}) => {
    const raise = spring({
      frame,
      fps,
      config: {damping: 15, stiffness: 125, mass: 0.8},
      durationInFrames: Math.min(durationInFrames, Math.round(fps * 0.65)),
    });
    const waving = Math.sin((frame / fps) * Math.PI * 4.5) * 25 * raise;
    return {
      root: {position: [0, -Math.sin((frame / fps) * Math.PI * 2) * 2]},
      parts: {
        head: {rotation: waving * -0.04},
        upperArmRight: {rotation: interpolate(raise, [0, 1], [0, -152])},
        lowerArmRight: {rotation: interpolate(raise, [0, 1], [0, 58]) + waving},
        upperArmLeft: {rotation: interpolate(raise, [0, 1], [0, 4])},
      },
    };
  },
};

export const animationClips: Record<string, AnimationClip> = {
  idle,
  walk,
  point,
  wave,
};

export const neutralPose: AnimationPose = {parts: {}};

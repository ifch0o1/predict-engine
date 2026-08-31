import {interpolate} from 'remotion';
import type {Action, CharacterCue} from './types';

export type Pose = {
  x: number;
  y: number;
  body: number;
  leftArm: number;
  rightArm: number;
  leftForearm: number;
  rightForearm: number;
  leftLeg: number;
  rightLeg: number;
  bob: number;
  rotation: number;
  mouth: number;
};

const ease = (value: number) => value * value * (3 - 2 * value);

export const poseFor = (cue: CharacterCue, localFrame: number, fps: number): Pose => {
  const duration = Math.max(1, (cue.end - cue.start) * fps);
  const progress = Math.min(1, Math.max(0, localFrame / duration));
  const phase = localFrame / fps;
  const action: Action = cue.action;
  const walking = action === 'walk' ? Math.sin(phase * Math.PI * 4) : 0;
  const talking = action === 'talk' ? Math.sin(phase * Math.PI * 7) : 0;
  const falling = action === 'fall' ? ease(progress) : 0;

  return {
    x: interpolate(progress, [0, 1], [cue.x ?? 0.5, cue.toX ?? cue.x ?? 0.5]),
    y: (cue.y ?? 0.76) + falling * 0.11,
    body: action === 'walk' ? walking * 4 : action === 'point' ? -2 : 0,
    leftArm: action === 'walk' ? -walking * 32 : action === 'talk' ? -25 + talking * 12 : action === 'fall' ? -70 : -8,
    rightArm: action === 'walk' ? walking * 32 : action === 'point' ? -88 : action === 'talk' ? 25 - talking * 18 : action === 'fall' ? 70 : 8,
    leftForearm: action === 'talk' ? -35 + talking * 20 : action === 'fall' ? -20 : 8,
    rightForearm: action === 'point' ? -4 : action === 'talk' ? 35 - talking * 20 : action === 'fall' ? 20 : -8,
    leftLeg: action === 'walk' ? walking * 30 : action === 'fall' ? -20 : -7,
    rightLeg: action === 'walk' ? -walking * 30 : action === 'fall' ? 30 : 7,
    bob: action === 'walk' ? Math.abs(walking) * -10 : action === 'idle' ? Math.sin(phase * Math.PI * 2) * 3 : 0,
    rotation: falling * 86,
    mouth: action === 'talk' ? Math.abs(talking) : 0,
  };
};

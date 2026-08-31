import {animationClips} from './animations';
import {sharedHumanoidSkeleton} from './skeleton';
import {scientistSkin} from './skins/scientist';
import type {AnimationClip, Character} from './types';

const scientist: Character = {
  id: 'scientist',
  skeleton: sharedHumanoidSkeleton,
  skin: scientistSkin,
};

export const characters: Record<string, Character> = {scientist};
export const clips: Record<string, AnimationClip> = animationClips;

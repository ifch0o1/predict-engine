import type {ComponentType} from 'react';

export type Vec2 = [number, number];

export const bodyPartNames = [
  'head',
  'torso',
  'upperArmLeft',
  'lowerArmLeft',
  'upperArmRight',
  'lowerArmRight',
  'upperLegLeft',
  'lowerLegLeft',
  'upperLegRight',
  'lowerLegRight',
] as const;

export type BodyPartName = (typeof bodyPartNames)[number];

export type JointName =
  | 'root'
  | 'neck'
  | 'leftShoulder'
  | 'leftElbow'
  | 'rightShoulder'
  | 'rightElbow'
  | 'leftHip'
  | 'leftKnee'
  | 'rightHip'
  | 'rightKnee';

export type PartDefinition = {
  parentPart: BodyPartName | null;
  parentJoint: JointName;
  pivot: Vec2;
  position: Vec2;
  rotation: number;
  scale: Vec2;
  zIndex: number;
};

export type Skeleton = {
  id: string;
  parts: Record<BodyPartName, PartDefinition>;
};

export type SvgPartVisual = {
  kind: 'svg';
  width: number;
  height: number;
  Component: ComponentType;
};

export type ImagePartVisual = {
  kind: 'image';
  width: number;
  height: number;
  src: string;
};

export type PartVisual = SvgPartVisual | ImagePartVisual;

export type CharacterSkin = {
  id: string;
  skeletonId: string;
  parts: Record<BodyPartName, PartVisual>;
};

export type Character = {
  id: string;
  skeleton: Skeleton;
  skin: CharacterSkin;
};

export type PartPose = {
  position?: Vec2;
  rotation?: number;
  scale?: Vec2;
};

export type AnimationPose = {
  root?: PartPose;
  parts?: Partial<Record<BodyPartName, PartPose>>;
};

export type AnimationSampleContext = {
  frame: number;
  fps: number;
  durationInFrames: number;
};

export type AnimationClip = {
  id: AnimationName;
  sample: (context: AnimationSampleContext) => AnimationPose;
};

export type AnimationName =
  | 'idle'
  | 'walk'
  | 'wave'
  | 'point'
  | 'nod'
  | 'shakeHead'
  | 'talk'
  | 'think'
  | 'fall';

export type Actor = {
  id: string;
  character: string;
  animation: AnimationName;
  from: Vec2;
  to?: Vec2;
  start: number;
  duration: number;
  scale?: number;
  facing?: 'left' | 'right';
};

export type Scene = {
  id: string;
  duration: number;
  background?: string;
  actors: Actor[];
};

export type ResolvedActor = {
  command: Actor;
  character: Character;
  pose: AnimationPose;
  position: Vec2;
  scale: number;
  facing: 'left' | 'right';
};

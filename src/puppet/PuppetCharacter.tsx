import React from 'react';
import type {AnimationPose, BodyPartName, Character, PartPose, PartVisual, Vec2} from './types';

const add = (left: Vec2, right: Vec2 = [0, 0]): Vec2 => [left[0] + right[0], left[1] + right[1]];
const multiply = (left: Vec2, right: Vec2 = [1, 1]): Vec2 => [left[0] * right[0], left[1] * right[1]];

const PartArtwork: React.FC<{visual: PartVisual}> = ({visual}) => {
  if (visual.kind === 'image') {
    return <image href={visual.src} width={visual.width} height={visual.height} preserveAspectRatio="xMidYMid meet" />;
  }
  const {Component} = visual;
  return <Component />;
};

const PartNode: React.FC<{
  name: BodyPartName;
  character: Character;
  pose: AnimationPose;
}> = ({name, character, pose}) => {
  const definition = character.skeleton.parts[name];
  const offset: PartPose = pose.parts?.[name] ?? {};
  const position = add(definition.position, offset.position);
  const scale = multiply(definition.scale, offset.scale);
  const rotation = definition.rotation + (offset.rotation ?? 0);
  const children = (Object.keys(character.skeleton.parts) as BodyPartName[])
    .filter((partName) => character.skeleton.parts[partName].parentPart === name)
    .sort((a, b) => character.skeleton.parts[a].zIndex - character.skeleton.parts[b].zIndex);
  const behind = children.filter((child) => character.skeleton.parts[child].zIndex < definition.zIndex);
  const inFront = children.filter((child) => character.skeleton.parts[child].zIndex >= definition.zIndex);
  const transform = `translate(${position[0]} ${position[1]}) rotate(${rotation}) scale(${scale[0]} ${scale[1]}) translate(${-definition.pivot[0]} ${-definition.pivot[1]})`;

  return (
    <g transform={transform}>
      {behind.map((child) => <PartNode key={child} name={child} character={character} pose={pose} />)}
      <PartArtwork visual={character.skin.parts[name]} />
      {inFront.map((child) => <PartNode key={child} name={child} character={character} pose={pose} />)}
    </g>
  );
};

export const PuppetCharacter: React.FC<{
  character: Character;
  pose: AnimationPose;
  position: Vec2;
  scale: number;
  facing: 'left' | 'right';
}> = ({character, pose, position, scale, facing}) => {
  const root = pose.root ?? {};
  const rootPosition = add(position, root.position);
  const rootScale = multiply([scale * (facing === 'left' ? -1 : 1), scale], root.scale);
  const rootRotation = root.rotation ?? 0;
  const roots = (Object.keys(character.skeleton.parts) as BodyPartName[])
    .filter((name) => character.skeleton.parts[name].parentPart === null)
    .sort((a, b) => character.skeleton.parts[a].zIndex - character.skeleton.parts[b].zIndex);

  return (
    <g transform={`translate(${rootPosition[0]} ${rootPosition[1]}) rotate(${rootRotation}) scale(${rootScale[0]} ${rootScale[1]})`}>
      {roots.map((name) => <PartNode key={name} name={name} character={character} pose={pose} />)}
    </g>
  );
};

import {Easing, interpolate} from 'remotion';
import {clips, characters} from './registry';
import type {Actor, ResolvedActor, Scene, Vec2} from './types';

const findCommand = (commands: Actor[], seconds: number): Actor | null => {
  const active = commands.find((command) => seconds >= command.start && seconds < command.start + command.duration);
  if (active) return active;
  const completed = commands.filter((command) => seconds >= command.start + command.duration);
  return completed.at(-1) ?? null;
};

export const actorIds = (scene: Scene): string[] => [...new Set(scene.actors.map((actor) => actor.id))];

export const resolveActor = (scene: Scene, actorId: string, frame: number, fps: number): ResolvedActor | null => {
  const seconds = frame / fps;
  const commands = scene.actors
    .filter((actor) => actor.id === actorId)
    .sort((a, b) => a.start - b.start);
  const command = findCommand(commands, seconds);
  if (!command) return null;

  const character = characters[command.character];
  const clip = clips[command.animation];
  if (!character) throw new Error(`Unknown character: ${command.character}`);
  if (!clip) throw new Error(`Animation is not implemented: ${command.animation}`);

  const durationInFrames = Math.max(1, Math.round(command.duration * fps));
  const rawLocalFrame = frame - Math.round(command.start * fps);
  const localFrame = Math.min(Math.max(0, rawLocalFrame), durationInFrames - 1);
  const progress = interpolate(localFrame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const destination = command.to ?? command.from;
  const position: Vec2 = [
    interpolate(progress, [0, 1], [command.from[0], destination[0]]),
    interpolate(progress, [0, 1], [command.from[1], destination[1]]),
  ];

  return {
    command,
    character,
    pose: clip.sample({frame: localFrame, fps, durationInFrames}),
    position,
    scale: command.scale ?? 1,
    facing: command.facing ?? 'right',
  };
};

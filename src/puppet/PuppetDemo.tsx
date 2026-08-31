import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {PuppetCharacter} from './PuppetCharacter';
import {actorIds, resolveActor} from './resolveScene';
import type {AnimationName, Scene} from './types';

const labels: Record<AnimationName, string> = {
  idle: 'Stops', walk: 'Walks in', point: 'Points', wave: 'Waves', nod: 'Nods',
  shakeHead: 'Shakes head', talk: 'Talks', think: 'Thinks', fall: 'Falls',
};

const Background: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const pointProgress = interpolate(frame, [5.5 * fps, 6.2 * fps], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <g>
      <rect width="1080" height="1920" fill="#f4f7fb" />
      <circle cx="87" cy="310" r="245" fill="#dcecff" />
      <circle cx="1010" cy="1730" r="290" fill="#e4f6ee" />
      <rect x="85" y="205" width="910" height="230" rx="42" fill="#ffffff" opacity="0.94" />
      <text x="130" y="295" fill="#26334d" fontFamily="Arial, sans-serif" fontSize="47" fontWeight="700">Reusable 2D Puppet Engine</text>
      <text x="130" y="365" fill="#61718a" fontFamily="Arial, sans-serif" fontSize="31">One skeleton · Swappable skins · JSON control</text>
      <g opacity={pointProgress} transform={`translate(${(1 - pointProgress) * 40} 0)`}>
        <rect x="710" y="705" width="285" height="330" rx="30" fill="#ffffff" stroke="#d5dfeb" strokeWidth="6" />
        <text x="755" y="775" fill="#52647c" fontFamily="Arial, sans-serif" fontSize="27" fontWeight="700">AUTOMATION</text>
        <rect x="762" y="935" width="38" height="48" rx="8" fill="#72c6a1" />
        <rect x="826" y="875" width="38" height="108" rx="8" fill="#4e9be8" />
        <rect x="890" y="808" width="38" height="175" rx="8" fill="#ef6b70" />
        <path d="m760 899 82-78 66-63" fill="none" stroke="#26334d" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="908" cy="758" r="12" fill="#26334d" />
      </g>
      <path d="M72 1560H1008" stroke="#c8d6e4" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="455" cy="1567" rx="245" ry="36" fill="#b8c9d9" opacity="0.35" />
    </g>
  );
};

export const PuppetDemo: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const resolved = actorIds(scene).map((id) => resolveActor(scene, id, frame, fps)).filter((actor) => actor !== null);
  const currentAction = resolved[0]?.command.animation ?? 'walk';
  return (
    <AbsoluteFill style={{backgroundColor: scene.background ?? '#f4f7fb'}}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920">
        <Background frame={frame} fps={fps} />
        {resolved.map((actor) => <PuppetCharacter key={actor.command.id} character={actor.character} pose={actor.pose} position={actor.position} scale={actor.scale} facing={actor.facing} />)}
        <g transform="translate(390 1690)">
          <rect width="300" height="80" rx="40" fill="#26334d" />
          <circle cx="43" cy="40" r="12" fill="#72c6a1" />
          <text x="75" y="51" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="700">{labels[currentAction]}</text>
        </g>
        <text x="540" y="1832" textAnchor="middle" fill="#7c8ca2" fontFamily="Arial, sans-serif" fontSize="24" letterSpacing="3">FRAME-DETERMINISTIC SVG RENDERING</text>
      </svg>
    </AbsoluteFill>
  );
};

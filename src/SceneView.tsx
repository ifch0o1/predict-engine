import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {poseFor} from './animation';
import {StickFigure} from './StickFigure';
import type {Scene} from './types';

export const SceneView: React.FC<{scene: Scene; characterColor: string}> = ({scene, characterColor}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const seconds = frame / fps;
  const cue = scene.cues.find((item) => seconds >= item.start && seconds < item.end) ?? scene.cues.at(-1)!;
  const cueFrame = Math.max(0, frame - cue.start * fps);
  const pose = poseFor(cue, cueFrame, fps);
  const isVertical = height > width;
  const horizontalPadding = isVertical ? 72 : 110;

  return (
    <AbsoluteFill style={{backgroundColor: scene.background ?? '#F8FAFC', fontFamily: 'Arial, sans-serif', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: horizontalPadding, right: horizontalPadding, top: isVertical ? 120 : 86, opacity: interpolate(frame, [0, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <div style={{height: 12, width: 130, borderRadius: 8, background: scene.accent ?? '#635BFF', marginBottom: 34}} />
        <div style={{fontSize: isVertical ? 88 : 82, fontWeight: 900, letterSpacing: -3, color: '#101828', lineHeight: 0.95}}>{scene.title}</div>
        <div style={{fontSize: isVertical ? 38 : 34, color: '#475467', marginTop: 30, maxWidth: isVertical ? 900 : 820, lineHeight: 1.25}}>{scene.subtitle}</div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" aria-label="Animated stick figure">
        <path d={`M ${horizontalPadding} ${height * 0.88} L ${width - horizontalPadding} ${height * 0.88}`} stroke="#D0D5DD" strokeWidth="5" strokeLinecap="round" />
        <StickFigure
          pose={pose}
          color={characterColor}
          facing={cue.facing ?? 1}
          canvasWidth={width}
          canvasHeight={height}
          scale={isVertical ? 1.15 : 1}
        />
      </svg>

      {cue.text ? (
        <div style={{position: 'absolute', left: `${Math.min(76, pose.x * 100 + (isVertical ? 12 : 8))}%`, top: `${Math.max(42, pose.y * 100 - (isVertical ? 17 : 23))}%`, maxWidth: isVertical ? 470 : 620, translate: '-50% -100%', background: '#FFFFFF', border: `5px solid ${scene.accent ?? '#635BFF'}`, borderRadius: 28, padding: isVertical ? '26px 30px' : '22px 30px', fontSize: isVertical ? 32 : 28, fontWeight: 700, color: '#101828', boxShadow: '0 12px 0 rgba(16,24,40,.08)'}}>
          {cue.text}
        </div>
      ) : null}

      <div style={{position: 'absolute', right: horizontalPadding, bottom: isVertical ? 72 : 46, color: '#98A2B3', fontSize: isVertical ? 20 : 22, fontWeight: 700, letterSpacing: 2}}>JSON → REACT → SVG → VIDEO</div>
    </AbsoluteFill>
  );
};

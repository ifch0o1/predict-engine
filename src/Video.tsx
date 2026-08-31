import React from 'react';
import {Series} from 'remotion';
import {SceneView} from './SceneView';
import type {VideoScript} from './types';

export const StickFigureVideo: React.FC<{script: VideoScript}> = ({script}) => (
  <Series>
    {script.scenes.map((scene) => (
      <Series.Sequence key={scene.id} name={scene.id} durationInFrames={Math.round(scene.duration * script.fps)}>
        <SceneView scene={scene} characterColor={script.characterColor} />
      </Series.Sequence>
    ))}
  </Series>
);

export type Action = 'idle' | 'walk' | 'point' | 'talk' | 'fall';

export type CharacterCue = {
  action: Action;
  start: number;
  end: number;
  x?: number;
  toX?: number;
  y?: number;
  facing?: 1 | -1;
  text?: string;
};

export type Scene = {
  id: string;
  duration: number;
  background?: string;
  accent?: string;
  title?: string;
  subtitle?: string;
  cues: CharacterCue[];
};

export type VideoScript = {
  fps: number;
  width: number;
  height: number;
  characterColor: string;
  scenes: Scene[];
};

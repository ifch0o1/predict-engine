import React from 'react';
import {Composition} from 'remotion';
import demo from './data/demo.json';
import puppetDemo from './data/puppet-demo.json';
import {PuppetDemo} from './puppet/PuppetDemo';
import type {Scene as PuppetScene} from './puppet/types';
import type {VideoScript} from './types';
import {StickFigureVideo} from './Video';

const script = demo as VideoScript;
const durationInFrames = script.scenes.reduce((sum, scene) => sum + Math.round(scene.duration * script.fps), 0);
const puppetScene = puppetDemo as PuppetScene;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="PuppetDemo" component={PuppetDemo} durationInFrames={Math.round(puppetScene.duration * 30)} fps={30} width={1080} height={1920} defaultProps={{scene: puppetScene}} />
    <Composition id="StickFigureVideo" component={StickFigureVideo} durationInFrames={durationInFrames} fps={script.fps} width={script.width} height={script.height} defaultProps={{script}} />
  </>
);

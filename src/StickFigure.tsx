import React from 'react';
import type {Pose} from './animation';

const segment = (angle: number, length: number) => ({
  x: Math.sin((angle * Math.PI) / 180) * length,
  y: Math.cos((angle * Math.PI) / 180) * length,
});

const Limb: React.FC<{x: number; y: number; angle: number; bend: number; upper: number; lower: number}> = ({x, y, angle, bend, upper, lower}) => {
  const elbow = segment(angle, upper);
  const hand = segment(angle + bend, lower);
  return <path d={`M ${x} ${y} L ${x + elbow.x} ${y + elbow.y} L ${x + elbow.x + hand.x} ${y + elbow.y + hand.y}`} />;
};

export const StickFigure: React.FC<{
  pose: Pose;
  color: string;
  facing: 1 | -1;
  canvasWidth: number;
  canvasHeight: number;
  scale?: number;
}> = ({pose, color, facing, canvasWidth, canvasHeight, scale = 1}) => (
  <g
    transform={`translate(${pose.x * canvasWidth} ${pose.y * canvasHeight + pose.bob}) rotate(${pose.rotation}) scale(${facing * scale} ${scale})`}
  >
    <g transform={`rotate(${pose.body})`} stroke={color} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="0" cy="-240" r="56" fill="#FFFFFF" />
      <circle cx="-18" cy="-250" r="5" fill={color} stroke="none" />
      <circle cx="18" cy="-250" r="5" fill={color} stroke="none" />
      <path d={`M -18 -220 Q 0 ${-215 + pose.mouth * 18} 18 -220`} strokeWidth="7" />
      <path d="M 0 -184 L 0 25" />
      <Limb x={0} y={-145} angle={pose.leftArm} bend={pose.leftForearm} upper={105} lower={96} />
      <Limb x={0} y={-145} angle={pose.rightArm} bend={pose.rightForearm} upper={105} lower={96} />
      <Limb x={0} y={20} angle={pose.leftLeg} bend={-4} upper={125} lower={118} />
      <Limb x={0} y={20} angle={pose.rightLeg} bend={4} upper={125} lower={118} />
    </g>
  </g>
);

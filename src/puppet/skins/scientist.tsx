import type {CharacterSkin} from '../types';

const Head = () => (
  <g>
    <path d="M22 77C22 32 42 9 70 9s48 23 48 68v30c0 24-20 42-48 42s-48-18-48-42Z" fill="#f4b98f" />
    <path d="M20 76C20 27 43 3 72 3c24 0 43 17 47 48-18-12-48-15-77 1l-12 28Z" fill="#353c55" />
    <circle cx="51" cy="83" r="18" fill="none" stroke="#24324a" strokeWidth="5" />
    <circle cx="94" cy="83" r="18" fill="none" stroke="#24324a" strokeWidth="5" />
    <path d="M69 82h8M33 80l-13-4M112 80l12-4" stroke="#24324a" strokeWidth="5" strokeLinecap="round" />
    <circle cx="53" cy="84" r="3" fill="#24324a" />
    <circle cx="92" cy="84" r="3" fill="#24324a" />
    <path d="M59 112c9 7 18 7 27 0" fill="none" stroke="#a95550" strokeWidth="4" strokeLinecap="round" />
  </g>
);

const Torso = () => (
  <g>
    <path d="M23 46 69 19h52l46 27 14 198H9Z" fill="#f5f8fb" stroke="#2a3550" strokeWidth="6" strokeLinejoin="round" />
    <path d="m69 19 26 43 26-43M95 62v178" fill="none" stroke="#a9b8c8" strokeWidth="5" />
    <path d="m85 64 10-12 10 12-6 80h-8Z" fill="#ef5f63" />
    <rect x="116" y="89" width="43" height="32" rx="4" fill="#d9eefa" stroke="#4d91bd" strokeWidth="4" />
    <path d="M32 205h126" stroke="#d2dde7" strokeWidth="5" />
  </g>
);

const UpperArm = () => (
  <g>
    <path d="M7 17C8 5 19 0 30 0s22 5 23 17l4 133c0 13-10 22-27 22S3 163 3 150Z" fill="#f5f8fb" stroke="#2a3550" strokeWidth="6" />
    <path d="M10 121h42" stroke="#c7d6e2" strokeWidth="5" />
  </g>
);

const LowerArm = () => (
  <g>
    <path d="M5 15C6 6 16 1 30 1s24 5 25 14l2 119c0 11-10 19-27 19S3 145 3 134Z" fill="#f5f8fb" stroke="#2a3550" strokeWidth="6" />
    <path d="M14 126h32v25c0 9-7 16-16 16s-16-7-16-16Z" fill="#f4b98f" stroke="#2a3550" strokeWidth="5" />
    <path d="M30 149v18" stroke="#2a3550" strokeWidth="4" strokeLinecap="round" />
  </g>
);

const UpperLeg = () => (
  <path d="M5 17C6 6 16 1 30 1s24 5 25 16l3 145c0 12-10 20-28 20S2 174 2 162Z" fill="#385477" stroke="#25344e" strokeWidth="6" />
);

const LowerLeg = () => (
  <g>
    <path d="M5 13C6 4 16 0 30 0s24 4 25 13l3 133c0 12-10 20-28 20S2 158 2 146Z" fill="#385477" stroke="#25344e" strokeWidth="6" />
    <path d="M4 142h51l14 21c5 8 0 17-10 17H13c-8 0-13-6-11-14Z" fill="#263147" stroke="#172033" strokeWidth="5" />
  </g>
);

export const scientistSkin: CharacterSkin = {
  id: 'scientist',
  skeletonId: 'humanoid-v1',
  parts: {
    head: {kind: 'svg', width: 140, height: 150, Component: Head},
    torso: {kind: 'svg', width: 190, height: 250, Component: Torso},
    upperArmLeft: {kind: 'svg', width: 60, height: 175, Component: UpperArm},
    lowerArmLeft: {kind: 'svg', width: 60, height: 170, Component: LowerArm},
    upperArmRight: {kind: 'svg', width: 60, height: 175, Component: UpperArm},
    lowerArmRight: {kind: 'svg', width: 60, height: 170, Component: LowerArm},
    upperLegLeft: {kind: 'svg', width: 60, height: 185, Component: UpperLeg},
    lowerLegLeft: {kind: 'svg', width: 75, height: 185, Component: LowerLeg},
    upperLegRight: {kind: 'svg', width: 60, height: 185, Component: UpperLeg},
    lowerLegRight: {kind: 'svg', width: 75, height: 185, Component: LowerLeg},
  },
};

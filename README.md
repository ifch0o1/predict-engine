# PredictEngine

A zero-cost Remotion video engine for deterministic, JSON-controlled social video. It contains two independent renderers:

- `PuppetDemo`: a reusable 2D cutout-puppet runtime with a shared skeleton and swappable SVG/PNG skins.
- `StickFigureVideo`: the original SVG stickman engine, preserved as a fallback and reference.

Both compositions are vertical 1080 × 1920 reels/shorts.

## Run it

```bash
npm install
npm run studio
npm run render
```

`npm run render` creates `out/puppet-demo.mp4`. Use `npm run render:stickman` for the original composition.

## Puppet architecture

The puppet engine separates what the AI requests from how a character is drawn:

```text
scene.json -> scene resolver -> AnimationClip -> Skeleton -> CharacterSkin -> Remotion
```

- `src/puppet/types.ts`: the `Character`, `Skeleton`, `CharacterSkin`, `AnimationClip`, `Actor`, and `Scene` contracts.
- `src/puppet/skeleton.ts`: the shared ten-part humanoid hierarchy, pivots, base transforms, and layer order.
- `src/puppet/animations.ts`: frame-deterministic `idle`, `walk`, `point`, and `wave` clips.
- `src/puppet/skins/scientist.tsx`: placeholder SVG artwork only; it contains no animation logic.
- `src/puppet/PuppetCharacter.tsx`: recursive SVG part renderer.
- `src/puppet/resolveScene.ts`: translates implementation-independent actor commands into positions and poses.
- `src/data/puppet-demo.json`: the 12-second demonstration timeline.

The public scene command stays flat and automation-friendly:

```json
{
  "id": "actor1",
  "character": "scientist",
  "animation": "walk",
  "from": [200, 1200],
  "to": [700, 1200],
  "start": 0,
  "duration": 2
}
```

Multiple commands with the same actor ID form that actor's timeline. The resolver selects the active command and samples it solely from the Remotion frame, so rendering is repeatable and safe for parallel/headless jobs.

## Adding a skin

Create a `CharacterSkin` whose `skeletonId` is `humanoid-v1` and provide all ten parts. A part can use an inline SVG component or an image source via `{kind: "image", src, width, height}`. Register the character in `src/puppet/registry.ts`. Existing animations then work without modification as long as artwork uses the shared pivots and dimensions.

Future animation names (`nod`, `shakeHead`, `talk`, `think`, and `fall`) are part of the scene contract but intentionally have no clip implementation yet. This keeps the prototype small and fails clearly if an unimplemented clip is requested.

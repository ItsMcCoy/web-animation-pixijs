import React from 'react'
import {
  Stage,
  Container,
  AnimatedSprite,
  useTick,
  useApp,
} from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

const spritesheet =
  'https://pixijs.io/examples/examples/assets/spritesheet/fighter.json'
const [width, height] = [500, 500]

const JetFighter = () => {
  const [frames, setFrames] = React.useState([])
  const [rot, setRot] = React.useState(0)
  const app = useApp()

  useTick((delta) => setRot((r) => r + 0.01 * delta))

  // load
  React.useEffect(() => {
    app.loader.add(spritesheet).load((_, resource) => {
      setFrames(
        Object.keys(resource[spritesheet].data.frames).map((frame) =>
          PIXI.Texture.from(frame)
        )
      )
    })
  }, [])

  if (frames.length === 0) {
    return null
  }

  return (
    <Container rotation={rot} x={width / 2} y={height / 2}>
      <AnimatedSprite
        animationSpeed={0.5}
        isPlaying={true}
        textures={frames}
        anchor={0.5}
      />
    </Container>
  )
}

const Animation = ({ bgColor = '0x1d2330' }) => {
  return (
    <Stage
      width={width}
      height={height}
      options={{ autoDensity: true, backgroundColor: bgColor }}
    >
      <JetFighter />
    </Stage>
  )
}

export default Animation

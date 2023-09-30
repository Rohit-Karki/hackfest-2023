import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TextFade } from "./TextFade";

const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, textAlign: "center", fontSize: "7em" }}>{title}</div>
  );
};

export const MyTitleComponent = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 100,
  });

  // const translateY = interpolate()
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={100}>
        <TextFade>
          <Title title="How's Pokhara to you?" />
          <Title title="Hello Peoples" />
        </TextFade>
      </Sequence>
    </AbsoluteFill>
  );
};

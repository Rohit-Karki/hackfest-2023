import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import styled from "styled-components";

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  color: #fff;
`;

export const Howto: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });
  const progress1 = spring({
    fps,
    frame: frame + 10,
    config: {
      damping: 200,
    },
  });

  const translateY = interpolate(progress, [0, 0.5, 1], [600, 0, -600]);
  const translate_Y = interpolate(progress1, [0, 0.5, 1], [800, 0, -800]);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          color: "#f5ad43",
          transform: `translateY(${translateY}px)`,
        }}
      >
        Seeking directions to our location?
        <br />
      </div>
      <div
        style={{
          color: "#5757f5",
          transform: `translateY(${translate_Y}px)`,
        }}
      >
        We offer an interactive demo for your convenience.
      </div>
    </Container>
  );
};

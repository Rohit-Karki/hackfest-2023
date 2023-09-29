import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import styled from "styled-components";

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 80px;
  font-weight: 700;
  text-align: center;
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

  const translateY = interpolate(progress, [0, 1], [600, 0]);

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
          transform: `translateY(${translateY}px)`,
        }}
      >
        How to reach to us?
        <br />
        Want some interactive demo of our location?
      </div>
    </Container>
  );
};

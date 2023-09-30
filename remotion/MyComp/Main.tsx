import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  Video,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Series,
} from "remotion";
import { CompositionProps } from "../../types/constants";
import { NextLogo } from "./NextLogo";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React, { useMemo } from "react";
import { Rings } from "./Rings";
import { TextFade } from "./TextFade";
import { MyTitleComponent } from "./MyTitleComponent";
import EndCredits from "./EndCredits/EndCredits";
import { Gradient } from "./Gradient";
import { TypeWriter } from "./Typewriter";
import { Howto } from "./Howto";
import { Transition } from "./utils/Transition";
import { BestQualities } from "./BestQualities";
import { Pricing } from "./Pricing";

loadFont();

const container: React.CSSProperties = {
  backgroundColor: "white",
};

const logo: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: transitionDuration,
    delay: transitionStart,
  });

  const titleStyle: React.CSSProperties = useMemo(() => {
    return { fontFamily, fontSize: 120, color: "white" };
  }, []);

  return (
    <AbsoluteFill style={container}>
      <Series>
        <Series.Sequence durationInFrames={100}>
          <Rings outProgress={logoOut}></Rings>
          <AbsoluteFill style={logo}>
            <NextLogo outProgress={logoOut}></NextLogo>
          </AbsoluteFill>
        </Series.Sequence>
        <Series.Sequence durationInFrames={75}>
          <Transition type="out">
            <TypeWriter />
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={100}>
          <Gradient />
        </Series.Sequence>
        <Series.Sequence durationInFrames={500}>
          <Transition type="out">
            <AbsoluteFill>
              <Series.Sequence durationInFrames={60}>
                {/* <TextFade>
                  <h1 style={titleStyle}>{title}</h1>
                </TextFade> */}
                <AbsoluteFill>
                  <Howto />
                </AbsoluteFill>
              </Series.Sequence>
              <Audio src={staticFile("Welcome_to_a_wor_1.wav")} />

              <Video
                playbackRate={2.5}
                src={staticFile("Starbucks_westlink_with_background.mp4")}
                endAt={600}
              />
            </AbsoluteFill>
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={500}>
          <AbsoluteFill>
            <Audio src={staticFile(`Experience_the_p_1.wav`)} />
            <OffthreadVideo
              playbackRate={0.8}
              volume={(f) =>
                interpolate(f, [0, 100], [0, 1], { extrapolateLeft: "clamp" })
              }
              src={staticFile("Upstairs_Master_with_background.mp4")}
            />
          </AbsoluteFill>
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <Transition type="out">
            <BestQualities />
          </Transition>
        </Series.Sequence>

        {/* <Series.Sequence durationInFrames={100}>
          <Transition type="out">
            <MyTitleComponent />
          </Transition>
        </Series.Sequence> */}
        <Series.Sequence durationInFrames={200}>
          <Transition type="out">
            <Pricing />
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
          <EndCredits />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

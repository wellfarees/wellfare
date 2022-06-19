import { ShrankContainer } from "../../styled/reusable";
import styled from "styled-components";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules
import ReactSlider from "react-slider";
import { fontSizes } from "../../config/userConfig";
import AdaptiveAnimation from "../../components/animated/AdaptiveAnimation";
import { NextPage } from "next";
import { useEffect } from "react";

import { useActions } from "../../hooks/useActions";
import { useMutation } from "@apollo/client";
import { EDIT_USER_CONFIG } from "../../graphql/mutations";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { transformFetchedConfig } from "../../utils/transformFetchedConfig";

const StyledSlider = styled(ReactSlider)`
  width: 82%;
  height: 2px;
  background: ${(props) => props.theme.watermark};
  margin: 0 9%;
  position: relative;

  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    background: ${(props) => props.theme.watermark};
    width: 122%;
    left: -11%;
    height: 2px;
  }

  .mark {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: ${(props) => props.theme.watermark};
    margin-top: -1.5px;
  }
`;

const StyledThumb = styled.div`
  height: 11px;
  width: 11px;
  background-color: ${(props) => props.theme.shadedColor};
  border-radius: 4px;
  cursor: grab;
  border: none !important;
  margin-top: -0.5em;
  position: relative;
`;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  border-radius: 999px;
`;

const Track = (props: any, state: any) => (
  <StyledTrack {...props} index={state.index} />
);

const ValueIndicator = styled.span`
  position: absolute;
  top: -1.4em;
  left: -2px;
  font-size: ${fontSizes.base / 1.15}px !important;
`;

const Thumb = (props: any, state: any) => (
  <StyledThumb {...props}>
    <ValueIndicator>{state.valueNow}</ValueIndicator>
  </StyledThumb>
);

const Wrapper = styled.div`
  margin-bottom: 5em;

  h2 {
    font-weight: 500;
    max-width: 300px;
    line-height: 1.5;
  }

  .config {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .block {
      p {
        font-weight: bold;
      }

      padding: 2.5em;
      background: ${(props) => props.theme.sidebar};
      border-radius: 8px;
      margin-top: 3em;
      min-width: 350px;
    }

    .togglers {
      display: inline-flex;
      align-items: center;
      gap: 4em;
      width: auto;
    }

    .fontSize {
      .slider {
        margin-top: 5em;
      }

      .slider-block {
        position: relative;

        i {
          position: absolute;
        }

        .fa-1x {
          left: 0px;
          top: -20px;
        }

        .fa-2x {
          right: 0px;
          top: -30px;
        }
      }
    }

    /* Custom css for Toggle component */
    .toggler {
      margin-top: 1.5em;

      .react-toggle-thumb {
        box-shadow: none !important;
        background: ${(props) => props.theme.watermark};
        border: 1px solid ${(props) => props.theme.watermark};
        top: 4px;
        left: 4px;
      }

      .react-toggle-track {
        height: 30px;
        width: 65px;
      }

      .react-toggle-track {
        background: none;
        border: 1px solid ${(props) => props.theme.watermark};
      }
    }

    .toggler.react-toggle--checked {
      .react-toggle-thumb {
        left: 38px;
        background: ${(props) => props.theme.maximum};
        border: 1px solid ${(props) => props.theme.maximum};
      }

      .react-toggle-track {
        background: #78db78;
        border: 1px solid #78db78;
      }
    }
  }

  @media only screen and (max-width: 425px) {
    .block {
      min-width: 100% !important;
      padding: 0 !important;
      background: none !important;
    }

    .togglers {
      flex-direction: column;
      align-items: flex-start !important;

      .togglers-block {
        align-items: flex-start !important;
      }
    }

    .fontSize {
      margin-top: 5em !important;
    }
  }
`;

const Conf: NextPage = () => {
  const { saveConfig } = useActions();
  const { user } = useTypedSelector((state) => state);
  const [mutateAppearance, { data }] = useMutation(EDIT_USER_CONFIG);

  const mutateSpecificValue = (mutation: { [key: string]: any }) => {
    mutateAppearance({
      variables: mutation,
      refetchQueries: ["getUser", "login"],
    });
  };

  // TODO: Solve the reactive reduced motion problem by calling the mutation on component's unmounting lifecycle (useEffect cleanup function)
  useEffect(() => {
    if (data) {
      saveConfig(transformFetchedConfig(data.editAppearance.config));
    }
  }, [data, saveConfig]);

  return (
    <Wrapper>
      <ShrankContainer>
        <AdaptiveAnimation>
          <h2>
            Personalize <b>your</b> user experience
          </h2>
        </AdaptiveAnimation>

        <div className="config">
          <div className="togglers block">
            <div className="toggler-block">
              <p>Dark mode</p>
              <Toggle
                icons={false}
                className="toggler"
                defaultChecked={
                  user.info?.config.theme === "dark" ? true : false
                }
                onChange={(e) => {
                  mutateSpecificValue({ darkMode: e.target.checked });
                }}
              />
            </div>
            <div className="toggler-block">
              <p>Reduced motion</p>
              <Toggle
                icons={false}
                className="toggler"
                defaultChecked={Boolean(user.info?.config.reducedMotion)}
                onChange={(e) => {
                  mutateSpecificValue({ reducedMotion: e.target.checked });
                }}
              />
            </div>
          </div>

          <div className="block fontSize">
            <p>Font size</p>
            <div className="slider-block">
              <i className="fas fa-font fa-1x"></i>
              <StyledSlider
                renderThumb={Thumb}
                min={14}
                max={19}
                renderTrack={Track}
                className="slider"
                value={user.info?.config.fontSize}
                marks={[14, 15, 16, 17, 18, 19]}
                onChange={(val) => {
                  mutateSpecificValue({ fontSize: val });
                }}
              />
              <i className="fas fa-font fa-2x"></i>
            </div>
          </div>
        </div>
      </ShrankContainer>
    </Wrapper>
  );
};

export default Conf;

import Fade from "react-reveal/Fade";
import { userConfig } from "../../config/userConfig";

const AdaptiveAnimation: React.FC = ({ children }) => {
  return userConfig.reducedMotion ? (
    <>{children}</>
  ) : (
    <Fade bottom>{children}</Fade>
  );
};

export default AdaptiveAnimation;

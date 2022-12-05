import Fade from "react-reveal/Fade";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const AdaptiveAnimation: React.FC<any> = ({ children }) => {
  const { user } = useTypedSelector((state) => state);

  return user.info?.config.reducedMotion ? (
    <>{children}</>
  ) : (
    <Fade bottom>{children}</Fade>
  );
};

export default AdaptiveAnimation;

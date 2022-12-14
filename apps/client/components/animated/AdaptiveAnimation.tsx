import { useTypedSelector } from "../../hooks/useTypedSelector";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const animationVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  hidden: { opacity: 0, y: 10 },
};

const AdaptiveAnimation: React.FC<any> = ({ children }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  const { user } = useTypedSelector((state) => state);

  return user.info?.config.reducedMotion ? (
    <>{children}</>
  ) : (
    <motion.div
      className="box"
      ref={ref}
      variants={animationVariants}
      initial="hidden"
      animate={control}
    >
      {children}
    </motion.div>
  );
};

export default AdaptiveAnimation;

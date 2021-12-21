import ShowcaseSlider from "../components/ShowcaseSlider/ShowcaseSlider";
import { useEffect, useState, memo } from "react";

const Showcase = memo(ShowcaseSlider);

export default () => {
  const [state, setState] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setState(state + 1);
    }, 1000);
  });

  return (
    <div>
      <Showcase />
    </div>
  );
};

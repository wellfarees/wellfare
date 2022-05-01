import styled from "styled-components";
import Link from "next/link";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface PfpProps {
  url: string;
}

const Pfp: React.FC<PfpProps> = ({ url }) => {
  const PfpEl = styled.div`
    width: 4em;
    height: 4em;
    border-radius: 100%;
    cursor: pointer;
    background-image: url(${url});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `;

  return (
    <div className="pfp">
      <Link href="/app/user">
        <PfpEl></PfpEl>
      </Link>
    </div>
  );
};

const UserPfp: React.FC = () => {
  const { pfp } = useTypedSelector((state) => state.user).info;
  return <Pfp url={pfp || "/img/mesh-gradient.png"} />;
};

export default Pfp;
export { UserPfp };

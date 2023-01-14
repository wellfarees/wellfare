import styled from "styled-components";
import Link from "next/link";
import { useAppSelector } from "../../hooks/useAppSelector";

interface PfpProps {
  url: string;
}

const PfpEl = styled.div`
  width: 4em;
  height: 4em;
  border-radius: 100%;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Pfp: React.FC<PfpProps> = ({ url }) => {
  return (
    <div className="pfp">
      <Link passHref href="/app/user">
        <PfpEl
          style={{
            backgroundImage: `url(${url})`,
          }}
        ></PfpEl>
      </Link>
    </div>
  );
};

const UserPfp: React.FC = () => {
  const { pfp } = useAppSelector((state) => state.user).info;
  return <Pfp url={pfp || "/img/mesh-gradient.png"} />;
};

export default Pfp;
export { UserPfp };

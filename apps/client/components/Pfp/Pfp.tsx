import styled from "styled-components";
import Link from "next/link";

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

const UserPfp: React.FC<Partial<PfpProps>> = ({ url }) => {
  // TODO: Try to fetch actual pfp if it exists
  const path = url || "/img/mesh-gradient.png";
  return <Pfp url={path} />;
};

export default Pfp;
export { UserPfp };

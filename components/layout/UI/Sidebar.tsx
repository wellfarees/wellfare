import styled from "styled-components";
import Link from "next/Link";
import { useRouter } from "next/router";

const SidebarEl = styled.aside`
  width: 400px;
  background: ${(props: any) => props.theme.sidebar};
  color: ${(props: any) => props.theme.mainColor};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  padding: 4em;

  span {
    padding: 1.2em 2em;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    transition: 0.3s all;
    border-radius: 13px;

    &:hover {
      background: ${(props: any) => props.theme.maximum};
    }

    i {
      margin-right: 0.7em;
    }
  }

  li.active {
    background: ${(props: any) => props.theme.maximum};
    border-radius: 13px;
  }

  li {
    margin-top: 1.5em;
  }

  .signOut span:hover {
    background-color: ${(props: any) => props.theme.error};
    color: white;
  }
`;

const Sidebar: React.FC = () => {
  const router = useRouter();
  return (
    <SidebarEl>
      <ul>
        <li className="active">
          <Link href="/app/">
            <span>
              <i className="fas fa-home"></i> Home
            </span>
          </Link>
        </li>
        <li>
          <Link href="/app/affirmations">
            <span>
              <i className="fas fa-brain"></i>Affirmations
            </span>
          </Link>
        </li>
        <li>
          <Link href="/app/config">
            <span>
              <i className="fas fa-sliders-h"></i>
              Design configuration
            </span>
          </Link>
        </li>
        <li>
          <Link href="/app/archive">
            <span>
              <i className="fas fa-archive"></i>Weekly recap archive
            </span>
          </Link>
        </li>
        <li>
          <a
            className="signOut"
            onClick={(e) => {
              e.preventDefault();

              //TODO: Do some auth signing out logic

              router.push("/");
            }}
          >
            <span>
              <i className="fas fa-sign-out-alt"></i>
              Sign out
            </span>
          </a>
        </li>
      </ul>
    </SidebarEl>
  );
};

export default Sidebar;

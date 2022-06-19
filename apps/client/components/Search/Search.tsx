import { useAlgolia } from "../../hooks/useAlgolia";
import { SearchResponse } from "@algolia/client-search";
import { formatDate } from "../../utils/formatDate";
import { useState } from "react";
import styled from "styled-components";
import { GlowingBLue } from "../../styled/reusable";
import Link from "next/link";
import DetailedRecord from "../Records/DetailedRecord";
import { useRouter } from "next/router";
import { useActions } from "../../hooks/useActions";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useSpring, animated } from "react-spring";

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 0.8em 1.5em;
  padding-top: 0.9em;
  width: 700px;
  background-color: ${(props: any) => props.theme.input};
  border-radius: 7px;
  color: ${(props: any) => props.theme.shadedColor};
  max-width: 500px;

  input {
    border: none;
    background-color: transparent;
    outline: none;
    width: 100%;
    color: ${(props: any) => props.theme.shadedColor};
  }

  @media only screen and (max-width: 570px) {
    max-width: 100%;
    width: 100% !important;
  }

  @media only screen and (width: 1024px) {
    width: 500px !important;
    max-width: 440px;
  }
`;

const DropDown = styled.div`
  padding: 0.5em;
  position: absolute;
  top: 6.5em;
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.solidSearchBackground};

  @supports (
    (-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))
  ) {
    background: ${(props) => props.theme.searchBackground};
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.searchBorder};
  box-shadow: 0 8px 32px 0 ${(props) => props.theme.searchShadow};
  z-index: 100;

  @media only screen and (max-width: 570px) {
    top: 6em;
  }
`;

const SearchContainer = styled.div`
  position: relative;

  @media only screen and (max-width: 768px) {
    position: relative !important;
    margin-top: 2em !important;
    width: 100% !important;
    max-width: 100% !important;
    bottom: 0 !important;
  }
`;

const StyledListItem = styled.div`
  padding: 1.3em;
  transition: 0.3s all;
  border-radius: 10px;

  &:hover {
    background: ${(props) => props.theme.searchHover};
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .descr {
      display: flex;
      align-items: center;
      gap: 2em;
      cursor: pointer;

      .date {
        margin-top: 0.3em;
        display: inline-block;
      }
    }

    button {
      ${GlowingBLue}
      padding: 0.3em 1em !important;
      display: inline-block;
      width: auto !important;
    }
  }
`;

interface ListItemProps {
  date: number;
  feelings: string;
  emoji: string;
  recapId?: null | number;
  unease: string;
  gratefulness: string;
  id: number;
}

interface RecordHit {
  record: ListItemProps;
}

const ListItem: React.FC<{ data: ListItemProps }> = ({ data }) => {
  const { date, emoji, feelings, recapId, id } = data;
  const size = useScreenSize();
  const router = useRouter();
  const { initModal } = useActions();

  return (
    <StyledListItem>
      <div className="main">
        <div
          className="descr"
          onClick={() => {
            const RecordContent = (
              <DetailedRecord
                data={{
                  ...data,
                  feelings: "Feeling " + feelings,
                }}
              />
            );
            if (size! > 425 && !(size! <= 812 && window.innerHeight <= 425)) {
              initModal(true, RecordContent);
              return;
            }

            // TODO: redirect to the record with the appropriate (fetched) id
            router.push(`/app/records/${id}`);
          }}
        >
          <p className="emoji">{emoji}</p>
          <div className="info">
            <p className="feeling">
              Feeling <b>{feelings}</b>
            </p>
            <br />
            <span className="date">{formatDate(date)}</span>
          </div>
        </div>
        {recapId && (
          <Link passHref href={`/app/recaps/${recapId}`}>
            <button>Go to recap</button>
          </Link>
        )}
      </div>
    </StyledListItem>
  );
};

// TODO: Implement keybaord navigation
const Search: React.FC = () => {
  const searchClient = useAlgolia();
  const [hits, setHits] = useState<SearchResponse<RecordHit>>();
  const [dropdownStyles, dropDownAPI] = useSpring(() => {
    return {
      from: {
        display: "none",
        opacity: 0,
        y: -10,
      },
    };
  });

  const hideDropdown = (): void => {
    dropDownAPI.start({
      to: async (animate) => {
        await animate({
          to: {
            opacity: 0,
            y: -10,
          },
        });
        await animate({
          to: {
            display: "none",
          },
        });
      },
    });
  };

  return (
    <SearchContainer className="search-container">
      <SearchBox className="search-input">
        <i className="fas fa-search"></i>
        <input
          onChange={async (e) => {
            if (!searchClient) return;
            const index = searchClient.initIndex("records");
            const hits: SearchResponse<RecordHit> = await index.search(
              e.target.value,
              {
                hitsPerPage: 4,
              }
            );

            if (e.target.value.length > 2) {
              setHits(hits);
            }

            if (e.target.value.length > 2 && hits.hits.length) {
              dropDownAPI.start({
                to: async (animate) => {
                  await animate({
                    to: {
                      display: "block",
                    },
                  });
                  await animate({
                    to: {
                      opacity: 1,
                      y: 0,
                    },
                  });
                },
              });
            } else {
              hideDropdown();
            }
          }}
          onBlur={() => {
            hideDropdown();
          }}
          placeholder="Search a record"
          type="text"
        />
      </SearchBox>
      <DropDown style={dropdownStyles} as={animated.div}>
        {hits &&
          hits.hits.map((hit, index) => {
            return <ListItem key={index} data={hit.record} />;
          })}
      </DropDown>
    </SearchContainer>
  );
};

export default Search;

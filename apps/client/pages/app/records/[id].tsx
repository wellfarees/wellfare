import { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";
import { ShrankContainer } from "../../../styled/reusable";
import DetailedRecord from "../../../components/Records/DetailedRecord";
import { useRouter } from "next/router";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";

const Wrapper = styled.div`
  margin-bottom: 5em;
`;

interface RecordProps {
  data: {
    date: number;
    feelings: string;
    unease: string;
    gratefulness: string;
    emoji: string;
  };
  isMobile: boolean;
}

const RecordPage: NextPage<RecordProps> = ({ data, isMobile }) => {
  const router = useRouter();
  const size = useScreenSize();

  if (!isMobile) {
    router.push("/404");
  }

  useEffect(() => {
    if (size === null) return;
    if (window.innerHeight <= 425) return;

    if (size > 425) {
      router.push("/404");
      return;
    }
  }, [size]);
  return (
    <Wrapper>
      <ShrankContainer>
        {size ? (
          isMobile &&
          size! > 425 &&
          !(size! <= 812 && window.innerHeight <= 425) ? (
            ""
          ) : (
            <DetailedRecord data={{ ...data }} />
          )
        ) : (
          ""
        )}
      </ShrankContainer>
    </Wrapper>
  );
};

export default RecordPage;

export const getServerSideProps: GetServerSideProps<RecordProps> = async (
  ctx
) => {
  const UA = ctx.req.headers["user-agent"]!;
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: {
      data: {
        date: Date.now(),
        feelings: "adventurous",
        unease: "Nothing really, ive just been craving for tacos lately ://",
        gratefulness: "Being able to breathe fresh air, because air >>",
        emoji: "😍",
      },
      isMobile,
    },
  };
};

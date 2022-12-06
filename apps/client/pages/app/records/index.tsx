import { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";
import { ShrankContainer } from "../../../styled/reusable";
import DetailedRecord from "../../../components/Records/DetailedRecord";
import { useRouter } from "next/router";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { useEffect } from "react";
import ExistsNot from "../../../components/ExistsNot";

import { useQuery } from "@apollo/client";
import { GET_RECORD } from "../../../graphql/queries";

const Wrapper = styled.div`
  margin-bottom: 5em;
`;

interface RecordProps {
  date: number;
  feelings: string;
  unease: string;
  gratefulness: string;
  emoji: string;
}

const RecordPage: NextPage<{ isMobile: boolean }> = ({ isMobile }) => {
  const router = useRouter();
  const size = useScreenSize();
  const { id } = router.query;
  const { data, loading } = useQuery<
    { getRecord: RecordProps },
    { identifier: number }
  >(GET_RECORD, { variables: { identifier: parseInt(id as string) } });

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
  }, [size, router]);

  return (
    <Wrapper>
      <ShrankContainer>
        {size ? (
          (isMobile &&
            size! > 425 &&
            !(size! <= 812 && window.innerHeight <= 425)) ||
          loading ? null : !data || !data.getRecord ? (
            <ExistsNot name="record" />
          ) : (
            <DetailedRecord data={data.getRecord} />
          )
        ) : (
          ""
        )}
      </ShrankContainer>
    </Wrapper>
  );
};

export default RecordPage;

export const getServerSideProps: GetServerSideProps<{
  isMobile: boolean;
}> = async (ctx) => {
  const UA = ctx.req.headers["user-agent"]!;
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: {
      isMobile,
    },
  };
};

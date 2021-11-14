import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useMutation } from "react-apollo";
import { VERIFY_USER } from "../../graphql/mutations";

const Verify: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [verifyUser, { loading, error, data }] = useMutation(VERIFY_USER);

  useEffect(() => {
    (async () => {
      try {
        await verifyUser({ variables: { token } });
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {}, [data]);

  return <div>{loading ? <>requesting server...</> : <>uh</>}</div>;
};

export default Verify;

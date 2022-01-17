import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  h2 {
    font-size: 3em;
    font-weight: 800;
    margin-bottom: 1em;
    line-height: 1.2;
  }

  .descr {
    section {
      margin-top: 1.5em;

      h3 {
        font-size: 1.8em;
      }

      p {
        margin-top: 1em;
        line-height: 1.5;
        font-size: 1.6em;
        max-width: 300px;

        a {
          text-decoration: underline;
        }
      }
    }
  }
`;

const AccountSuspended: React.FC<{ email: string }> = ({ email }) => {
  return (
    <Wrapper>
      <h2>Your account got suspended.</h2>
      <div className="descr">
        <section>
          <h3>Why is that?</h3>
          <p>
            You did not manage to prove your identity and verify your email in a
            span of 2 weeks.
          </p>
        </section>
        <section>
          <h3>What do I do?</h3>
          <p>
            Either verify your current email by clicking on the link we had sent
            you, or add another email{" "}
            <Link href={`/auth/restore?email=${email}`}>here</Link>
          </p>
        </section>
      </div>
    </Wrapper>
  );
};

export default AccountSuspended;

import { GetStaticProps, NextPage } from "next";
import { ShrankContainer } from "../../styled/reusable";
import styled from "styled-components";
import { GlowingBLue } from "../../styled/reusable";
import { LabeledInput } from "../../components";
import { Pfp } from "../../components";
import { useForm } from "../../hooks/useForm";
import AdaptiveAnimation from "../../components/animated/AdaptiveAnimation";
import { useHandleFormErrors } from "../../hooks/useHandleFormErrors";
import { useLoadingIndicator } from "../../hooks/useLoadingIndicator";
import { useState, useEffect } from "react";
import GoBack from "../../components/Routing/GoBack";

interface UserDataProps {
  name: string;
  surname: string;
  email: string;
  currentPassword: string;
}

const Wrapper = styled.div`
  header {
    max-width: 300px;

    h2 {
      font-weight: 500;
    }

    p.subtitle {
      line-height: 1.5;
      margin-top: 0.5em;
    }
  }

  .profile-img {
    .pfp-block {
      margin: 3em 0;
      margin-top: 4em;

      display: flex;
      align-items: center;
      gap: 2em;

      .change-btn {
        ${GlowingBLue}
        padding: 0.4em 2em;
      }
    }
  }

  .inputs {
    display: flex;
    gap: 5em;
  }

  .user-info-block {
    margin-top: 3em;
  }

  .input-block {
    margin-top: 3.5em;

    input {
      background: ${(props) => props.theme.input};
      color: ${(props) => props.theme.mainColor};
    }

    label {
      color: ${(props) => props.theme.mainColor};
    }
  }

  p.name {
    margin-top: 2em;
    font-weight: bold;
    margin-bottom: -1em;
  }

  .save-btn {
    ${GlowingBLue}
    margin-top: 3em;
    display: flex;
    align-items: center;
    gap: 0.3em;
    transition: 0.3s;
  }

  .saving {
    cursor: not-allowed !important;
    .save-btn {
      pointer-events: none !important;
    }
  }

  .error {
    color: ${(props) => props.theme.error};
    margin-top: 2em;
    margin-bottom: -0.5em;
  }
`;

const User: NextPage<UserDataProps> = ({
  name,
  surname,
  currentPassword,
  email,
}) => {
  const { register, handleSubmit } = useForm();
  const handleErrors = useHandleFormErrors();
  const [error, setError] = useState("");
  const { Spinner, stopSpinner, startSpinner } = useLoadingIndicator();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSaved) {
      startSpinner();
    } else {
      stopSpinner();
    }
  }, [isSaved]);

  const isImage = (type: string): boolean => {
    var ext = type.split("/")[1];
    switch (ext) {
      case "jpg":
      case "gif":
      case "bmp":
      case "png":
      case "jpeg":
        //etc
        return true;
    }
    return false;
  };

  return (
    <Wrapper>
      <ShrankContainer>
        <GoBack />
        <header>
          <AdaptiveAnimation>
            <h2>
              <b>Account</b> settings
            </h2>
          </AdaptiveAnimation>
          <p className="subtitle">
            Want to reset your password? Misspelled your name? That’s the right
            place to seek for solutions to these problems.
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSaved(false);
            const submitted = handleSubmit();
            const res = handleErrors(submitted);
            let isSuccessful = true;

            res.target.forEach((input) => {
              if (input.type === "password") return;
              if (input.value.length === 0) isSuccessful = false;
            });

            if (isSuccessful) {
              setError("");

              const passwInput = submitted.refs.find(
                (input) => input.id === "New password"
              );

              if (passwInput?.value.length) {
                setIsSaved(false);
                const currentPasswordInput = submitted.refs.find(
                  (input) => input.id === "Current password"
                )!;

                if (currentPasswordInput.value !== currentPassword) {
                  setError(
                    "Your current password does not match with the one you have previously set. "
                  );
                  return;
                }

                if (passwInput?.value.length <= 5) {
                  setError(
                    "Your password has to be at least 5 characters long."
                  );
                  return;
                }

                setIsSaved(true);
                setTimeout(() => {
                  // TODO: Do http calling work
                  stopSpinner();
                  setIsSaved(false);
                }, 1000);
              } else {
                setIsSaved(true);
                setTimeout(() => {
                  // TODO: Do http calling work
                  stopSpinner();
                  setIsSaved(false);
                }, 1000);
              }
            } else {
              setError(res.message);
            }
          }}
          className="user-info-block"
        >
          <div className="inputs">
            <div className="col">
              <div className="profile-img">
                <p className="name">Profile image</p>
                <div className="pfp-block">
                  <Pfp url="/img/sample_pfp.jpg" />
                  <label htmlFor="pfp-file" className="change-btn">
                    Change
                  </label>
                  <input
                    onChange={(e) => {
                      // TODO: Implement file uploading to the server and live reload of the pfp
                      const files = e.target.files!;

                      if (!isImage(files[0].type)) {
                        setError("File has to have a type of an image!");
                        return;
                      }

                      if (files[0].size > 80000) {
                        setError(
                          "Could not upload the file because size exceeds limit of 8MB."
                        );
                        return;
                      }

                      setError("");
                    }}
                    type="file"
                    id="pfp-file"
                    name="pfp-file"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="name-section">
                <p className="name">Name</p>
                <LabeledInput defaultValue={name} {...register("Name")} />
                <LabeledInput defaultValue={surname} {...register("Surname")} />
              </div>
            </div>

            <div className="col">
              <div className="email-section">
                <p className="name">Email</p>
                <LabeledInput defaultValue={email} {...register("Email")} />
              </div>

              <div className="password-section">
                <p className="name">Password</p>
                <LabeledInput {...register("Current password")} />
                <LabeledInput {...register("New password")} />
              </div>
            </div>
          </div>

          <footer>
            <p className="error">{error}</p>
            <div className={`btw-wrapper ${!isSaved ? "" : "saving"}`}>
              <button className="save-btn">
                {Spinner}Sav{!isSaved ? "e" : "ing"} changes
              </button>
            </div>
          </footer>
        </form>
      </ShrankContainer>
    </Wrapper>
  );
};

export default User;

export const getStaticProps: GetStaticProps<UserDataProps> = async () => {
  // TODO: fetch actual current data of user
  return {
    props: {
      name: "Rolands",
      surname: "Fridemanis",
      email: "rolands.affaires@gmail.com",
      currentPassword: "test123",
    },
    revalidate: 10,
  };
};

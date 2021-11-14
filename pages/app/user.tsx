import { GetStaticProps, NextPage } from "next";
import { ShrankContainer } from "../../styled/reusable";
import styled from "styled-components";
import { GlowingBLue } from "../../styled/reusable";
import { LabeledInput } from "../../components";
import { Pfp } from "../../components";
import { useForm } from "../../hooks/useForm";
import AdaptiveAnimation from "../../components/animated/AdaptiveAnimation";
import { useHandleFormErrors } from "../../hooks/useHandleFormErrors";
import { useState, useEffect } from "react";
import GoBack from "../../components/Routing/GoBack";
import { scrollToBottom } from "../../utils/scrollToBottom";
import Button from "../../components/Button/Button";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  mapRefsIntoValues,
  ResultingObject,
} from "../../utils/mapRefsIntoValues";

import { useMutation, useQuery, useLazyQuery } from "react-apollo";
import { EDIT_USER_INFORMATION } from "../../graphql/mutations";
import { USER_INFORMATION_QUERY } from "../../graphql/queries";

const Wrapper = styled.div`
  margin-bottom: 5em;

  header {
    max-width: 300px;

    h2 {
      font-weight: 500;
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
        padding: 0.4em 2em !important;
        display: inline-block;
        width: auto !important;
      }
    }
  }

  .inputs {
    display: flex;
    gap: 5em;
  }

  .user-info-block {
    margin-top: 0.5em;
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

  .saveBtn {
    ${GlowingBLue}
    margin-top: 3em;
    display: flex;
    align-items: center;
    gap: 0.3em;
    transition: 0.3s;
  }

  .saving,
  .hasError {
    cursor: not-allowed !important;
    .save-btn {
      pointer-events: none !important;
      filter: brightness(8%);
    }
  }

  .error {
    color: ${(props) => props.theme.error};
    margin-top: 2em;
    margin-bottom: 2em;
    line-height: 1.5;
  }

  @media only screen and (max-width: 768px) {
    input {
      width: 100%;
    }

    .inputs {
      flex-direction: column;
      gap: 1em;
    }

    .save-btn {
      margin-bottom: 4em;
    }
  }
`;

const Warning = styled.div`
  margin-top: 3em;
  margin-bottom: 1em;
  background: #fff4e5;
  color: #663c33;
  border-radius: 7px;
  padding: 2em;
  max-width: 650px;

  b {
    padding-bottom: 0.4em;
    display: inline-block;

    i {
      color: #ffa117;
      margin-right: 0.6em;
    }
  }

  p {
    line-height: 1.5;
  }
`;

const User = () => {
  const { register, handleSubmit } = useForm();
  const handleErrors = useHandleFormErrors();
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const { user } = useTypedSelector((state) => state);
  const [userInformationQuery, { data, loading }] = useLazyQuery(
    USER_INFORMATION_QUERY,
    {
      variables: { token: user.jwt },
      fetchPolicy: "network-only",
    }
  );

  const [editUserInformation, mutationProps] = useMutation(
    EDIT_USER_INFORMATION
  );

  useEffect(() => {
    setInProgress(!inProgress);
  }, [isSaved]);

  useEffect(() => {
    userInformationQuery();
  }, []);

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

  interface UserData {
    ["Name"]: string;
    ["Surname"]: string;
    ["Current password"]: string;
    ["New password"]: string;
    ["Email"]: string;
  }

  const sendData = async (
    data: UserData | ResultingObject,
    withPassword?: boolean
  ) => {
    const baseVariables = {
      firstName: data.Name,
      lastName: data.Surname,
      email: data.Email,
      token: user.jwt as string,
    };

    const passwordReset = {
      changePassword: {
        new: data["New password"],
        current: data["Current password"],
      },
    };

    const variables = withPassword
      ? { ...baseVariables, ...passwordReset }
      : baseVariables;

    try {
      await editUserInformation({ variables });
    } catch (e) {
      setError(mutationProps.error?.graphQLErrors[0].message as string);
    }
  };

  useEffect(() => {
    console.log(mutationProps.data);
    if (mutationProps.error) {
      setError(mutationProps.error.graphQLErrors[0].message as string);
    }
  }, [mutationProps.loading]);

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
        </header>
        {loading ? null : data && !data.getUser.information.verified ? (
          // TODO: Support styling for dark mode
          <Warning>
            <p>
              <b>
                <i className="fa fa-exclamation-triangle"></i>Action required
              </b>
            </p>
            <p>
              Please, verify your identity by following instructions we sent to
              your email. Your account will get locked in 1 week otherwise.
            </p>
          </Warning>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSaved(false);
            const submitted = handleSubmit();
            const res = handleErrors(submitted);
            let isSuccessful = true;

            res.target
              .filter((input) => input.type !== "password")
              .forEach((input) => {
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

                // TODO: Implement this
                if (currentPasswordInput.value === "") {
                  setError("Please, enter your current password");
                  return;
                }

                if (passwInput?.value.length <= 5) {
                  setError(
                    "Your password has to be at least 5 characters long."
                  );
                  return;
                }

                const values = mapRefsIntoValues<HTMLInputElement>(
                  submitted.refs
                );

                sendData(values, true);
                setIsSaved(true);
                setTimeout(() => {
                  // TODO: Do http calling work
                  setIsSaved(false);
                }, 1000);
              } else {
                const values = mapRefsIntoValues<HTMLInputElement>(
                  submitted.refs
                );
                sendData(values);
                setIsSaved(true);
                setTimeout(() => {
                  // TODO: Do http calling work
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
                        scrollToBottom();

                        setError("File has to have a type of an image!");
                        return;
                      }

                      if (files[0].size > 80000) {
                        scrollToBottom();

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
                <LabeledInput
                  defaultValue={
                    data ? data.getUser.information.firstName : null
                  }
                  {...register("Name")}
                />
                <LabeledInput
                  defaultValue={data ? data.getUser.information.lastName : null}
                  {...register("Surname")}
                />
              </div>
            </div>

            <div className="col">
              <div className="email-section">
                <p className="name">Email</p>
                <LabeledInput
                  defaultValue={data ? data.getUser.information.email : null}
                  {...register("Email")}
                />
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
            <div
              className={`btw-wrapper ${!isSaved ? "" : "saving"}
              `}
            >
              <Button
                withLoading={{
                  toBeLoading: !inProgress,
                  toModifyOnStateChange: {
                    endingToReplace: "e",
                    word: "Save",
                  },
                }}
              >
                Save changes
              </Button>
            </div>
          </footer>
        </form>
      </ShrankContainer>
    </Wrapper>
  );
};

export default User;

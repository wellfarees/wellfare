import { ShrankContainer } from "../../styled/reusable";
import styled from "styled-components";
import { GlowingBLue } from "../../styled/reusable";
import { LabeledInput } from "../../components";
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

import { Checkbox, useCheckboxState } from "pretty-checkbox-react";

import { useMutation, useQuery } from "@apollo/client";
import {
  EDIT_USER_INFORMATION,
  RESEND_VERIFICATION,
  UPLOAD_PFP,
} from "../../graphql/mutations";
import { USER_INFORMATION_QUERY } from "../../graphql/queries";
import { UserPfp } from "../../components/Pfp/Pfp";
import { useActions } from "../../hooks/useActions";

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
  background: ${(props) => props.theme.warningBackground};
  color: ${(props) => props.theme.warningColor};
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

  .resend-verification {
    margin-top: 0.5em;

    span {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  pfp: string;
  verified: boolean;
}

const User = () => {
  const { register, handleSubmit } = useForm();
  const handleErrors = useHandleFormErrors();
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { jwt } = useTypedSelector((state) => state.user);
  const { setPfp } = useActions();

  const checkbox = useCheckboxState();

  const { data, loading } = useQuery<{
    getUser: { information: Credentials; OAuthEmail: string };
  }>(USER_INFORMATION_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
    console.log(loading);
  }, [data, error]);

  const [resendVerificationLink] = useMutation(RESEND_VERIFICATION, {
    variables: { token: jwt },
  });

  const [editUserInformation, mutationProps] = useMutation<{
    _;
    editInformation: Credentials;
  }>(EDIT_USER_INFORMATION);

  const [uploadPfp, uploadProps] = useMutation<{
    pfpUpload: {
      location: string;
    };
  }>(UPLOAD_PFP);

  useEffect(() => {
    setInProgress(!inProgress);
  }, [isSaved]);

  useEffect(() => {
    if (uploadProps.data) {
      setPfp(uploadProps.data.pfpUpload.location + "?" + new Date().getTime());
    }
  }, [uploadProps.loading]);

  const isImage = (type: string): boolean => {
    var ext = type.split("/")[1];
    switch (ext) {
      case "jpg":
      case "gif":
      case "bmp":
      case "png":
      case "jpeg":
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
    if (mutationProps.error) {
      console.log(JSON.stringify(mutationProps.error, null, 2));
      return;
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
        {loading ? null : (data && !data.getUser.information.verified) ||
          (mutationProps.data &&
            !mutationProps.data.editInformation.verified) ? (
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
            <p className="resend-verification">
              Click{" "}
              <span
                onClick={() => {
                  try {
                    resendVerificationLink();
                  } catch (e) {}
                }}
              >
                here
              </span>{" "}
              to resend the verification link.
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
                  setIsSaved(false);
                }, 1000);
              } else {
                const values = mapRefsIntoValues<HTMLInputElement>(
                  submitted.refs
                );
                sendData(values);
                setIsSaved(true);
                setTimeout(() => {
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
                  <UserPfp />
                  <label htmlFor="pfp-file" className="change-btn">
                    Change
                  </label>
                  <input
                    onChange={({
                      target: {
                        validity,
                        files: [file],
                      },
                    }) => {
                      // FIXME: AWS account no longer works (suspension)
                      validity.valid && uploadPfp({ variables: { file } });
                      if (!isImage(file.type)) {
                        scrollToBottom();
                        setError("File has to have a type of an image!");
                        return;
                      }

                      const fileSizeInMb = parseInt(
                        (file.size / (1024 * 1024)).toFixed(2)
                      );

                      // image size limit
                      if (fileSizeInMb > 5) {
                        scrollToBottom();
                        setError(
                          "Could not upload the file because size exceeds limit of 5MB."
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
                  defaultValue={
                    data
                      ? data.getUser.information.email ||
                        data.getUser.OAuthEmail
                      : null
                  }
                  {...register("Email")}
                />
              </div>

              {/* TODO: Make the changes dependant on type of jwt verified on BACKEND (sync-type needs to be encoded inside of jwt) */}

              <div className="password-section">
                <p className="name">Password</p>
                <LabeledInput {...register("Current password")} />
                <LabeledInput {...register("New password")} />
              </div>

              {localStorage.getItem("sync-type") !== "native" && (
                <div className="ch">
                  <Checkbox color="danger" {...checkbox}>
                    I understand I will not be able log in through the{" "}
                    {localStorage.getItem("sync-type")} service.
                  </Checkbox>
                </div>
              )}
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

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import {
  AdaptiveAnimation,
  GoBack,
  Button,
  LabeledInput,
  UserPfp,
} from "../../components";
import { ShrankContainer } from "../../styled/reusable";
import { GlowingBlue } from "../../styled/reusable";

import {
  mapRefsIntoValues,
  ResultingObject,
} from "../../utils/mapRefsIntoValues";
import { useForm } from "../../hooks/useForm";
import { useHandleFormErrors } from "../../hooks/useHandleFormErrors";
import { scrollToBottom } from "../../utils/scrollToBottom";
import { fontSizes } from "../../config/userConfig";

import { useMutation, useQuery } from "@apollo/client";
import { USER_INFORMATION_QUERY } from "../../graphql/queries";
import {
  EDIT_USER_INFORMATION,
  RESEND_VERIFICATION,
  UPLOAD_PFP,
  CHANGE_TO_NATIVE,
} from "../../graphql/mutations";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setPfp } from "../../redux/actions/userSlice";

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
        ${GlowingBlue}
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
    ${GlowingBlue}
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

  .ch {
    max-width: 500px;
    line-height: 2em;
    display: flex;
    align-items: flex-start;
    gap: 1em;

    label {
      color: ${(props) => props.theme.mainColor};
      font-size: ${fontSizes.base}px !important;
    }
  }

  footer {
    .footer-container {
      display: flex;
      flex-direction: column;
      gap: 3em;
    }
  }

  @media only screen and (max-width: 768px) {
    input::not(#warning-check) {
      width: 100%;
    }

    .inputs {
      flex-direction: column;
      gap: 1em;
    }

    .save-btn {
      margin-bottom: 4em;
    }

    .ch {
      width: 100%;
    }

    .footer-container {
      flex-direction: column;
      gap: 3em !important;
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
  const { jwt } = useAppSelector((state) => state.user);
  const warningCheck = useRef(null);
  const [changeToNative, changeResult] = useMutation(CHANGE_TO_NATIVE);
  const [isSetToNative, setToNative] = useState(false);
  const dispatch = useAppDispatch();

  const { data, loading } = useQuery<{
    getUser: { information: Credentials; OAuthEmail: string };
  }>(USER_INFORMATION_QUERY);

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
    if (uploadProps.loading) {
    }
  }, [uploadProps.loading]);

  useEffect(() => {
    setInProgress((state) => !state);
  }, [isSaved]);

  useEffect(() => {
    setToNative(localStorage.getItem("sync-type") == "native");
  }, []);

  useEffect(() => {
    if (uploadProps.data) {
      dispatch(
        setPfp(uploadProps.data.pfpUpload.location + "?" + new Date().getTime())
      );
    } else if (uploadProps.error) {
      setError(uploadProps.error.graphQLErrors[0].message);
    }
  }, [uploadProps.data, uploadProps.error, dispatch]);

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
      setError(mutationProps.error.graphQLErrors[0].message as string);
    }
  }, [mutationProps.error]);

  useEffect(() => {
    if (localStorage.getItem("sync-type") == "native") {
      return;
    }

    if (changeResult.data) {
      localStorage.setItem("sync-type", "native");
      localStorage.setItem("jwt", changeResult.data.changeToNative.token);
      setToNative(true);
    } else if (changeResult.error) {
      console.log(JSON.stringify(changeResult.error, null, 2));
      if (changeResult.error.graphQLErrors[0]) {
        setError(changeResult.error.graphQLErrors[0].message);
      }
    }
  }, [changeResult.data, changeResult.error]);

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
            !mutationProps.data.editInformation.verified) ||
          (changeResult.data
            ? !changeResult.data.changeToNative.verified
            : null) ? (
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
          onSubmit={async (e) => {
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

              const values = mapRefsIntoValues<HTMLInputElement>(
                submitted.refs
              );

              if (
                (passwInput.value.length ||
                  data.getUser.information.email !== values["Email"]) &&
                localStorage.getItem("sync-type") !== "native"
              ) {
                if (!warningCheck.current?.checked) {
                  setError(
                    "Please, check the below statement before continuing."
                  );
                  return;
                } else {
                  // button loading animation
                  setIsSaved(true);
                  try {
                    await changeToNative({
                      variables: {
                        service: localStorage.getItem("sync-type"),
                        password: passwInput.value,
                        email: values["Email"],
                        refresh: localStorage.getItem("jwt"),
                      },
                    });
                  } catch (e) {}

                  setTimeout(() => {
                    setIsSaved(false);
                  }, 1000);

                  return;
                }
              }

              if (passwInput?.value.length) {
                setIsSaved(false);
                const currentPasswordInput = submitted.refs.find(
                  (input) => input.id === "Current password"
                )!;

                if (localStorage.getItem("sync-type") == "native") {
                  if (currentPasswordInput.value === "") {
                    setError("Please, enter your current password");
                    return;
                  }
                }

                if (passwInput?.value.length < 5) {
                  setError(
                    "Your password has to be at least 5 characters long."
                  );
                  return;
                }

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
                    onChange={async ({
                      target: {
                        validity,
                        files: [file],
                      },
                    }) => {
                      setError("");
                      setIsSaved(false);
                      const fileSizeInMb = parseInt(
                        (file.size / (1024 * 1024)).toFixed(2)
                      );

                      if (!isImage(file.type)) {
                        scrollToBottom();
                        setError("File has to be of type image.");
                        return;
                      }

                      // image size limit
                      if (fileSizeInMb > 5) {
                        scrollToBottom();
                        setError(
                          "Could not upload the file because size exceeds limit of 5MB."
                        );
                        return;
                      }

                      try {
                        validity.valid &&
                          (await uploadPfp({ variables: { file } }));
                        setError("");
                      } catch (e) {}
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

              <div className="password-section">
                <p className="name">Password</p>
                <div style={isSetToNative ? {} : { display: "none" }}>
                  <LabeledInput {...register("Current password")} />
                </div>
                <LabeledInput {...register("New password")} />
              </div>
            </div>
          </div>

          <footer>
            <p className="error">{error}</p>
            <div className="footer-container">
              <div
                className={`btn-wrapper ${!isSaved ? "" : "saving"}
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
              {!isSetToNative && (
                <div className="ch">
                  <input
                    ref={warningCheck}
                    type="checkbox"
                    id="warning-check"
                  />
                  <label htmlFor="warning-check">
                    I understand the change of email or password will result in
                    no longer being able to log in through the{" "}
                    <b>{localStorage.getItem("sync-type")}</b> service.
                  </label>
                </div>
              )}
            </div>
          </footer>
        </form>
      </ShrankContainer>
    </Wrapper>
  );
};

export default User;

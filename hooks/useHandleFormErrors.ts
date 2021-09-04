interface AcceptableInterface {
  errors: {
    type: string;
    ref: HTMLInputElement;
  }[];
  values: { [key: string]: string } | null;
}

const useHandleFormErrors = (
  credentials: AcceptableInterface
): { success: boolean; message: string; target: HTMLInputElement[] } => {
  let message = "";
  const target: HTMLInputElement[] = credentials.errors.map((entry) => {
    return entry.ref;
  });

  credentials.errors.forEach((error) => {
    switch (error.type) {
      case "empty":
        message = "Please, fill in the required fields.";
        break;

      case "invalid_email":
        message = "Please, provide a valid email address.";
        break;

      case "short_password_5":
        message = "Your password has to be at least 5 characters long.";
        break;

      default:
        message =
          "Something went wrong... Please check all the input fields for proper entered information.";
        break;
    }
  });

  return {
    success: target.length ? false : true,
    message,
    target,
  };
};

export { useHandleFormErrors };

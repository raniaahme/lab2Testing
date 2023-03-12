import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

const typeIntoFormElements = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByLabelText("Email address");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

describe("testing App component", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("testing input initially empty", () => {
    expect(screen.getByLabelText("Email address").value).toBe("");
  });

  test("test email input changed its value", () => {
    const { emailInputElement } = typeIntoFormElements({
      email: "mernamamdouh2@gmail.com",
    });
    expect(emailInputElement.value).toBe("mernamamdouh2@gmail.com");
  });

  test("should show email message error when email is invalid", () => {
    expect(
      screen.queryByText(/The email you input is invalid./i)
    ).not.toBeInTheDocument();

    typeIntoFormElements({ email: "mernamamdouh2gmail.com" });

    // const btn=screen.getByRole("button",{name:/submit/i})
    const btn = screen.getByTestId("my-button");
    userEvent.click(btn);

    expect(
      screen.queryByText(/The email you input is invalid./i)
    ).toBeInTheDocument();
  });

  test("should show No Error when every thing is valid", () => {
    typeIntoFormElements({
      email: "mernamamdouh2@gmail.com",
      password: "Merna831997@",
      confirmPassword: "Merna83",
    });

    // const btn=screen.getByRole("button",{name:/submit/i})
    const btn = screen.getByTestId("my-button");
    userEvent.click(btn);

    expect(
      screen.queryByText(/The email you input is invalid./i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/The password you entered should between 8 to 15 and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character./i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/The passwords don't match. Try again./i)
    ).toBeInTheDocument();
  });
});

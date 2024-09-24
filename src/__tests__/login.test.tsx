import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../app/page"; // Adjust path as necessary
import { Provider } from "react-redux";
import { store } from "../store/store"; // Adjust path as necessary
import { useRouter } from "next/router"; // Mock the router

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page", () => {
  let mockedRouter;

  beforeEach(() => {
    mockedRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockedRouter);
  });

  it("renders the login form", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });

  it("shows validation error when username is empty", async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    await userEvent.click(screen.getByRole("button", { name: /Next/i }));
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
  });

  it("submits the form successfully when a username is entered", async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    await userEvent.type(
      screen.getByPlaceholderText("Enter your name"),
      "John Doe"
    );
    await userEvent.click(screen.getByRole("button", { name: /Next/i }));
    expect(mockedRouter.push).toHaveBeenCalledWith("/todos");
  });
});

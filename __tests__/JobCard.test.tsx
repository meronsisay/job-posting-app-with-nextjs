import { render, screen } from "@testing-library/react";
import JobCard from "../components/JobCard";
import { Provider } from "react-redux";
import { store } from "../app/store";
import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("../components/BookToggleButton", () => () => (
  <button data-testid="bookmark-toggle">Bookmark</button>
));

describe("JobCard Component", () => {
  const mockJob = {
    id: "job-123",
    title: "Frontend Developer",
    description: "Build user interfaces with React.",
    image: "",
  };

  const renderWithProviders = () =>
    render(
      <Provider store={store}>
        <JobCard {...mockJob} />
      </Provider>
    );

  it("renders job title and description", () => {
    renderWithProviders();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText(/Build user interfaces/)).toBeInTheDocument();
  });

  it("renders the BookmarkToggle button", () => {
    renderWithProviders();
    expect(screen.getByTestId("bookmark-toggle")).toBeInTheDocument();
  });

  it("renders fallback image when image is missing", () => {
    renderWithProviders();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("cloudinary"));
  });

  it("navigates to job detail page on click", () => {
    renderWithProviders();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/job/job-123");
  });

  it("renders organization info", () => {
    renderWithProviders();
    expect(
      screen.getByText(/Yenigat Birhan None Profit Organization/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Addis Ababa, Ethiopia/)).toBeInTheDocument();
  });

  it("renders all tag buttons", () => {
    renderWithProviders();
    expect(screen.getByText("In Person")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    renderWithProviders();
    const card = screen.getByTestId("job-card");
    expect(card).toHaveClass("border-2");
    expect(card).toHaveClass("rounded-xl");
    expect(card).toHaveClass("shadow");
  });
  
});

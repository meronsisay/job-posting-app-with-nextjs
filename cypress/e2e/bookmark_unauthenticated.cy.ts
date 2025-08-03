describe("Unauthorized Bookmark Flow", () => {
  const mockJob = {
    id: "job-123",
    title: "Frontend Developer",
    description: "Build UI",
    logoUrl:
      "https://res.cloudinary.com/dtt1wnvfb/image/upload/v1701954159/photo_2023-12-07%2016.02.23.jpeg.jpg",
  };

  beforeEach(() => {
   
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: null, 
    }).as("session");

   
    cy.intercept(
      "GET",
      "https://akil-backend.onrender.com/opportunities/search",
      {
        statusCode: 200,
        body: { data: [mockJob] },
      }
    ).as("jobs");

    cy.visit("/");
    cy.wait("@session");
    cy.wait("@jobs");
  });

  it("should show login modal when trying to bookmark while unauthenticated", () => {
  
    cy.contains(mockJob.title).should("exist");

    
    cy.get(`[data-testid="bookmark-button-${mockJob.id}"]`)
      .should("exist")
      .click();

   
    cy.get('[data-testid="login-prompt"]').should("be.visible");
    cy.contains("Login Required").should("be.visible");
    cy.contains("You must be logged in").should("be.visible");

    
    cy.contains("Log In").should("be.visible");
    cy.contains("Sign Up").should("be.visible");
    cy.contains("Cancel").should("be.visible");

    
    cy.contains("Cancel").click();
    cy.get('[data-testid="login-prompt"]').should("not.exist");
  });
});

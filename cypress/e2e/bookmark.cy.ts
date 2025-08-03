describe("Bookmark functionality Flow", () => {
  const mockJob = {
    id: "job-123",
    title: "Frontend Developer",
    description: "Build UI",
    logoUrl:
      "https://res.cloudinary.com/dtt1wnvfb/image/upload/v1701954159/photo_2023-12-07%2016.02.23.jpeg.jpg",
  };

  const mockBookmark = {
    eventID: "job-123",
  };

  const mockSession = {
    user: {
      name: "Test User",
      email: "test@example.com",
      accessToken: "valid-test-token",
    },
    expires: "2099-12-31T23:59:59.999Z",
  };

  beforeEach(() => {
    
    cy.intercept("GET", "/api/auth/session", mockSession).as("session");

    cy.intercept(
      "GET",
      "https://akil-backend.onrender.com/opportunities/search",
      {
        statusCode: 200,
        body: { data: [mockJob] },
      }
    ).as("jobs");

   
    cy.intercept("GET", "https://akil-backend.onrender.com/bookmarks", {
      statusCode: 200,
      body: { data: [] }, 
    }).as("bookmarks");

   
    cy.intercept(
      "POST",
      `https://akil-backend.onrender.com/bookmarks/${mockJob.id}`,
      (req) => {
        expect(req.headers["authorization"]).to.equal(
          "Bearer valid-test-token"
        );
        expect(req.body).to.deep.equal({});
        req.reply({
          statusCode: 200,
          body: { success: true, data: mockBookmark },
        });
      }
    ).as("addBookmark");

    cy.intercept(
      "DELETE",
      `https://akil-backend.onrender.com/bookmarks/${mockJob.id}`,
      (req) => {
        expect(req.headers["authorization"]).to.equal(
          "Bearer valid-test-token"
        );
        req.reply({
          statusCode: 200,
          body: { success: true },
        });
      }
    ).as("removeBookmark");

    cy.visit("/");
    cy.wait("@session");
    cy.wait("@jobs");
  });

it("should complete full bookmark flow with authorization", () => {
  
  cy.contains(mockJob.title).should("exist");

 
  cy.get(`[data-testid="bookmark-button-${mockJob.id}"]`).then(($btn) => {
    const isBookmarked =
      $btn.find('[data-testid="bookmark-icon-filled"]').length > 0;

    if (isBookmarked) {
     
      cy.wrap($btn).click();
      cy.wait("@removeBookmark");
      cy.get('[data-testid="bookmark-icon-outline"]').should("exist");

     
      cy.get(`[data-testid="bookmark-button-${mockJob.id}"]`).click();
      cy.wait("@addBookmark");
      cy.get('[data-testid="bookmark-icon-filled"]').should("exist");
    } else {
      
      cy.wrap($btn).click();
      cy.wait("@addBookmark");
      cy.get('[data-testid="bookmark-icon-filled"]').should("exist");

      
      cy.get(`[data-testid="bookmark-button-${mockJob.id}"]`).click();
      cy.wait("@removeBookmark");
      cy.get('[data-testid="bookmark-icon-outline"]').should("exist");
    }
  });

 
  cy.get("select").select("Bookmarked");
  cy.wait("@bookmarks");
});
});

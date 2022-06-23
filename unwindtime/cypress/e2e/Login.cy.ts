describe("Login", () => {
  it("should check the Login Component", async () => {
    cy.visit("http://localhost:3000/");
    cy.pause();
    cy.get('[name="login"]').contains("Login");
    cy.pause();
    cy.get('[class="WelcomeSVG"]').should("be.visible");
    cy.pause();
    cy.get('[class="WelcomeSVG"]').should(
      "have.attr",
      "src",
      "/static/media/WelcomeSVG.96d4dccb1ab68070d49b28a1ca3f33f1.svg"
    );
    cy.pause();
    cy.get('[data-test="resetLink"]').should("have.attr", "href", "/reset");
    cy.pause();
    cy.get('[name="email"]')
      .invoke("attr", "placeholder")
      .should("contain", "E-mail Address");
    cy.pause();
    cy.get('[data-test="noAccount"]').contains("have an account");
    cy.pause();
  });
});

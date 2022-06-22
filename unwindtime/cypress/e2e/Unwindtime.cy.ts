

describe("UnwindTime", () => {
  it("Should check app basic functionality", async () => {
    cy.visit("http://localhost:3000/");
    cy.pause();
    cy.get('[name="email"]').type("123@123.com");
    cy.pause();
    cy.get('[name="password"]').type("123123");
    cy.pause();
    cy.get('[name="login"]').click();
    cy.pause();
    cy.get('[name="fortest"]').clear();
    cy.pause();
    cy.get('[name="fortest"]').type("blablabla");
    cy.pause();
    cy.get('[class="relaxButton"]').first().click();
    cy.pause();
    cy.get('[name="letsUnwindBtn"]').click();
    cy.pause();
    cy.get('[data-test="relaxButton"]').first().click();
    cy.pause();
    cy.get('[name="createUnwind"]').click();
    cy.pause();
    cy.get('[name="name"]').last().click();
    cy.pause();
    cy.get('[name="chatInput"]').type("testing is EX-CIT-ING!");
    cy.pause();
    cy.get('[class="chat-submit-button"]').click();
    cy.pause();
    cy.get('[name="toUnwindsBtn"]').click();
    cy.pause();
    cy.get('[data-test="deleteBtn"]').first().click();
    cy.pause();
    cy.get('[name="toDashboardBtn"]').click();
    cy.pause();
    cy.get('[class="relaxButton"]').first().click();
    cy.pause();
    cy.get('[name="logoutBtn"]').click();
  });
});




describe("Login", () => {
  it("should check the Login Component", async () => {
    cy.visit("http://localhost:3000/");
    cy.pause();
    cy.get('[name="login"]').contains('Login')
    cy.pause();
    cy.get('[class="WelcomeSVG"]').should('be.visible')
    cy.pause();
    //image Src should be checked after mounting
    cy.get('[class="WelcomeSVG"]').should('have.attr', 'src', '/static/media/WelcomeSVG.96d4dccb1ab68070d49b28a1ca3f33f1.svg')
    cy.pause();
    // react Link is the same as an Anchor Tag
    cy.get('[data-test="resetLink"]').should("have.attr", "href", "/reset");
    cy.pause();
    cy.get('[name="email"]').invoke('attr', 'placeholder').should('contain', 'E-mail Address')
    cy.pause();
    cy.get('[data-test="noAccount"]').contains("have an account")
    cy.pause();
  });
});



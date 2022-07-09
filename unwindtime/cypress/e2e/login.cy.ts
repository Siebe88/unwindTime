//@ts-nocheck


describe('renders the login page', () => {
  it('renders correctly', () => {
    cy.visit('/');
  })

  it('renders the login form', () => {
    cy.visit('/');
    cy.get('[type="email"]').should('have.length', 1);
    cy.get('[type="password"]').should('have.length', 1);
    cy.get('[name="login"]').should('have.length', 1);//change this?
  })

  it('login with email and password', () => {
    cy.visit('/');
    cy.get('[type="email"]').type('halil@gmail.com');
    cy.get('[type="password"]').type('123456');

    cy.get('[name="login"]').click();
    cy.url().should('eq', 'http://localhost:3000/dashboard');

    cy.wait(3000)
    cy.get('.color-button-red').click(); //logout

    cy.clearCookies();


  })
  //create a logout after testing
  // test the negative cases/scenarios


  it('login with invalid email and password', () => {
    cy.visit('/');
    cy.get('[type="email"]').type('123@345.com');
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();

    cy.url().should('eq', `http://localhost:3000/`);
    cy.clearCookies();
  }
  )


  it('login with invalid email', () => {
    cy.visit('/');
    cy.get('[type="email"]').type('123@345.com');
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `http://localhost:3000/`);
    cy.clearCookies();
  }
  )

  it('login with invalid password', () => {
    cy.visit('/');
    cy.get('[type="email"]').type('halil@gmail.com')
    cy.get('[type="password"]').type('12345678');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `http://localhost:3000/`);
    cy.clearCookies();
  }
  )




})



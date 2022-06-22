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

  it('login with email and password', async() => {
    cy.visit('/');
    cy.get('[type="email"]').type('halil@gmail.com');
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();
    cy.url().should('eq', 'http://localhost:3000/dashboard');
    cy.clearCookies();
  })
  //create a logout after testing
  // test the negative cases/scenarios


  it('login with invalid email and password', async() => {
    cy.visit('/');
    cy.get('[type="email"]').type('123@345.com');
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `http://localhost:3000/login`);
    cy.get('.alert').should('have.length', 1);
    cy.clearCookies();
  }
  )


  it('login with invalid email', async() => {
    cy.visit('/');
    cy.get('[type="email"]').type('123@345.com');
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `http://localhost:3000/login`);
    cy.get('.alert').should('have.length', 1);
    cy.clearCookies();
  }
  )

  it('login with invalid password', async() => {
    cy.visit('/');
    cy.get('[type="email"]').type('halil@gmail.com')
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `http://localhost:3000/login`);
    cy.get('.alert').should('have.length', 1);
    cy.clearCookies();
  }
  )

  it('login with empty email and password', async() => {
    cy.visit('/');
    cy.get('[type="email"]').type('');
    cy.get('[type="password"]').type('');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `http://localhost:3000/login`);
    cy.get('.alert').should('have.length', 1);
    cy.clearCookies();
  }
  )

  it('login with empty email', async() => {
    cy.visit('/');
    cy.get('[type="email"]').type('');
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `http://localhost:3000/login`);
    cy.get('.alert').should('have.length', 1);
    cy.clearCookies();
  }
  )

  it('login with empty password', async() => {
    cy.visit('/');
    cy.get('[type="email"]').type('halil@gmail.com');
    cy.get('[type="password"]').type('');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `http://localhost:3000/login`);
    cy.get('.alert').should('have.length', 1);
    cy.clearCookies();
  }
  )



})



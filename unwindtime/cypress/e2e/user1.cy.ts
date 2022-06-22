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
    cy.clearCookies()

  })
})

describe('login', () => {
  it('login with email and password', async() => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('[type="email"]').type('halil@gmail.com');
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();
    cy.url().should('eq', `${'/'}/dashboard`);
    cy.clearCookies()

  }
  )
})

describe('change the name', ()=>{
  it('change the name', async()=>{
    cy.visit('/dashboard');
    cy.wait(1000);
    await cy.get('.profilename-input').type('qwerty');
    cy.get('.profilename-input').should('have.value', 'qwerty');
    cy.clearCookies()
  }
  )
}
)

describe ('pick an unwind activity', () => {
  it('pick an unwind activity', () => {
    cy.visit('/dashboard');
    cy.get(':nth-child(8) > .relaxButton > svg').click();
    cy.get(':nth-child(8) > .relaxButton > svg > path').should('have.class', 'favoriteMethod');
    cy.clearCookies()

  }
  )

  it('pick another unwind activity', () => {
    cy.visit('/dashboard');
    cy.get(':nth-child(8) > .relaxButton > svg').click();
    cy.get(':nth-child(8) > .relaxButton > svg > path').should('have.class', 'favoriteMethod');
    cy.clearCookies()
  }
  )
})


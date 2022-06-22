//@ts-nocheck

const baseUrl = 'http://localhost:3000/';

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
})

describe('login', () => {
  it('login with email and password', () => {
    cy.visit('/');
    cy.get('[type="email"]').type('halil@gmail.com');
    cy.get('[type="password"]').type('123456');
    cy.get('[name="login"]').click();

    cy.url().should('eq', `${baseUrl}dashboard`);

    // cy.wait(3000)
    // cy.get('.color-button-red').click(); //logout
    // cy.clearCookies();
  }
  )
})

describe('change the name', ()=>{
  it('change the name', ()=>{
    cy.visit('/dashboard');
    cy.wait(1000);
    cy.get('.profilename-input').clear()
    cy.get('.profilename-input').type('qwerty');
    cy.get('.profilename-input').should('have.value', 'qwerty');
  }
  )
}
)

describe ('pick an unwind activity', () => {
  it('pick an unwind activity', () => {
    cy.wait(2000);
    cy.get(':nth-child(5) > .relaxButton').click();

  }
  )



  it('pick another unwind activity', () => {
    cy.wait(2000);
    cy.get(':nth-child(8) > .relaxButton').click();
  }
  )
})

describe('click let\'s unwind button', () => {
  it('click let\'s unwind button', () => {
    cy.wait(2000);
    cy.get('.go_button').click();
    cy.url().should('eq', `${baseUrl}unwinds`);
  }
  )
})

describe('select an unwind', () => {
  it('select an unwind', () => {
    cy.wait(2000);
    cy.get(':nth-child(1) > .relaxButton').click();
  }
  )

  it('add the unwind', () => {
    cy.wait(2000);
    cy.get('.unwindActions-container > :nth-child(1)').click();
  }
  )

  // it('click the unwind', () => {
  //   cy.wait(2000);
  //   cy.get('.unwinds-container > :nth-child(2) > :nth-child(1)').click();
  // }
  // )
})

// describe('sent a message', () => {
//   it('sent a message', () => {
//     cy.wait(2000);
//     cy.get('.chat-message-input').type('hello');
//     cy.get('.chat-message-input').should('have.value', 'hello');
//     // cy.wait(5000);
//     // cy.get('.chat-submit-button').click();
//   }
//   )
// })

describe('go to all chat page', () => {
  it('go to all chat page', () => {
    cy.wait(2000);
    cy.get(':nth-child(3) > img').click({multiple: true});
    cy.url().should('eq', `${baseUrl}allchats`);
  }
  )
})



describe('logout', () => {
  it('logout', () => {
    cy.wait(10000);
    cy.visit('/dashboard');
    cy.wait(5000);
    cy.get('.color-button-red').click();
    cy.clearCookies();
  }
  )
}
)


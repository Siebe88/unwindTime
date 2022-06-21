describe('homepage', () => {
	it('passes', async () => {
		cy.visit('http://localhost:3000/');
		cy.get('[name="email"]').type('123@123.com');
		cy.get('[name="password"]').type('123123');
		cy.get('[name="login"]').click();
		

		cy.get('[name="fortest"]').clear();
		cy.get('[name="fortest"]').type('blablabla');
		cy.get('[class="relaxButton"]').first().click();
		cy.get('[name="letsUnwindBtn"]').click();
		cy.pause()
		cy.get('[name="name"]').first().click();
		cy.pause()
		cy.get('[name="createUnwind"]').click();
		cy.pause()
		cy.get('[name="name"]').last().click();
		cy.get('[name="chatInput"]').type('testing su cks');
		cy.get('[class="chat-submit-button"]').click();
		cy.pause()
		cy.get('[name="toUnwindsBtn"]').click();
		cy.pause()
		cy.get('[name="deleteBtn"]').first().click();
		cy.get('[name="toDashboardBtn"]').click();
		cy.get('[class="relaxButton"]').first().click();
		cy.get('[name="logoutBtn"]').click();
		
		
	});


});



describe('homepage', () => {
	it('passes', async () => {
		cy.visit('http://localhost:3000/');
		cy.get('[name="email"]').type('123@123.com');
		cy.get('[name="password"]').type('123123');
		cy.get('[name="login"]').click();


		
	});
});




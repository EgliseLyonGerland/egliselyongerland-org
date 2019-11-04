describe('Home page', () => {
  it('should work', () => {
    cy.visit('/');

    cy.contains('Culte ouvert à tous,').should('not.be.visible');
    cy.scrollTo(0, 300);
    cy.contains('Culte ouvert à tous,').should('be.visible');

    cy.contains('Montrez-moi ça !').should('not.be.visible');
    cy.scrollTo(0, 800);
    cy.contains('Montrez-moi ça !').should('be.visible');
  });
});

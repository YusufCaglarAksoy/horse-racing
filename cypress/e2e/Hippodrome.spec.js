describe('Lap Component', () => {
  beforeEach(() => {
    cy.visit('/composition');
    cy.viewport(1920, 800)
  });
  it('should verify the number of tr elements under tbody in horse-list', () => {
    cy.get('.horse-list tbody tr').should('have.length', 20);
  });

  it('should click "Generate Program" and verify lap name', () => {
    cy.contains('Generate Program').click();

    cy.get('.lap-name').should('be.visible');
    cy.get('.lap-name').contains('1ST Lap - 1200m');
  });

  it('should click "Start Race"', () => {
    cy.contains('Generate Program').click();
    cy.wait(3000);

    cy.contains('Start Race').click();
    cy.wait(2000);
    cy.contains('Stop Race').click();
    cy.wait(1000);
    cy.contains('Start Race').click();
    cy.get('.fa-horse')
      .should('have.css', 'left')
    cy.wait(10000);
    cy.get('.swal2-container').should('exist');
    cy.get('.result-list tbody td .block.rounded-full').should('exist');
  });
});

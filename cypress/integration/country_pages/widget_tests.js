describe('Extent widget', () => {
  it('Checks extent in the Brazil country page has 3 categories by default', function() {
    cy.visit('/country/BRA');
    cy.log('Test log message');
    cy
      .get('#treeCover')
      .find('li.legend-item')
      .should('have.length', 3);
  });
  it('Checks the area extent values shown sum to the area of the country', function() {
    let total = 0;
    cy
      .get('#treeCover')
      .find('.legend-value')
      .each(el => {
        cy.log(el);
        total += parseInt(el.innerHTML);
        cy.log('Int parse', parseInt(el.innerHTML));
      })
      .then($elList => {
        expect(total).to.be.closeTo(850, 10);
      });
  });
});

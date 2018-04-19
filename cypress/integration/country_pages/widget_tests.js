describe('Extent widget', function() {
  it('Checks extent in the Brazil country page has 3 categories by default', function() {
    cy.visit('/country/BRA');
    cy
      .get('#treeCover')
      .find('li.legend-item')
      .should('have.length', 3);
  });
  it('Checks the area extent values shown sum to the area of the country', function() {
    cy
      .get('#treeCover')
      .find('li.legend-item')
      .children('div.legend-value')
      .then(item => {
        //console.log('things', item.get('textContent'));
        // want to iterate over text in 'textContent', seperate the values from units,
        // sum, and compare to the known area of Brazil (with a tolerance)
      });
  });
});

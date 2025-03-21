import { errorMessages } from "../../components/Register";  


describe('Form Page', () => {
  describe('Error Messages', () => {
    it('name input throws error for 1 charts', () => {

      //arrange
      cy.visit('http://localhost:5173/')

      //act
      cy.get('[data-cy=ad-input]').type('el')

      //assert
      cy.contains(errorMessages.ad);
      
    });
    it('surname input throws error for 1 charts', () => {

      //arrange
      cy.visit('http://localhost:5173/')

      //act
      cy.get('[data-cy="soyad-input"]').type('a');

      //assert
      cy.contains(errorMessages.soyad);
  
    });
    it('email input throws error for elif@gma', () => {

      //arrange
      cy.visit('http://localhost:5173/')

      //act
      cy.get('[data-cy=email-input]').type('elif@gma')

      //assert
      cy.contains(errorMessages.email);
      
    });
    it('email input throws error for 123', () => {

      //arrange
      cy.visit('http://localhost:5173/')

      //act
      cy.get('[data-cy=parola-input]').type('elif@gma')

      //assert
      cy.contains(errorMessages.parola);
      
    });
   
    it('button is disabled for unvalidated inputs', () => {

      //arrange
      cy.visit('http://localhost:5173/')

      //act
      cy.get('[data-cy=parola-input]').type('a')

      //assert
      cy.get('[data-cy=submit-button]').should('be.disabled');
  
      
    });
    

  });
});


context("Actions", () => {
  beforeEach(() => {
    cy.visit("https://tomlimroserocket.netlify.app/");
  });

  it("Create an appointment, check data is saved properly, then delete", () => {
    cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(2)").dblclick();
    cy.get("[data-cy=location]").find("input").type("Toronto");
    cy.get("[data-cy=dropDown").click();
    cy.get('[data-value="2"]').click();
    cy.get("[data-cy=notes]").find("textarea").type("raining today");
    cy.contains("Save").click();

    //click appointment obj
    cy.get('.jss297').dblclick();
    cy.get("[data-cy=location]").find("input").should("have.value", "Toronto");
    cy.get("[data-cy=dropDown]").find("input").should("have.value", "2");
    cy.get("[data-cy=notes]")
      .find("textarea")
      .should("have.value", "raining today");

    //click delete button
    cy.get('.jss314 > .MuiIconButton-label > .MuiSvgIcon-root').click();
    cy.get('.jss297').should("not.exist");
  });


  it("Create two appointments, Swap drivers, then check Bobs Profile", () => {
    cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(2)").dblclick();
    cy.contains("Save").click();

    cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(5)").dblclick();
    cy.get("[data-cy=dropDown").click();
    cy.get('[data-value="2"]').click();

    cy.contains("Save").click();

    cy.get(".jss29")
      .find("div")
      .should("contain", "Pickup");
    cy.get(".jss29")
      .find("div")
      .should("contain", "Dropoff");

    cy.get("[data-testid=driverDropdown]").click();
    cy.get("[data-testid=driverDropdown1]").click();

    cy.get(".jss29")
      .find("div")
      .should("not.contain", "Pickup");
    cy.get(".jss29")
      .find("div")
      .should("not.contain", "Dropoff");

    cy.get("[data-testid=driverDropdown]").click();
    cy.get("[data-testid=driverDropdown0]").click();

    cy.get(".jss29")
      .find("div")
      .should("contain", "Pickup");
    cy.get(".jss29")
      .find("div")
      .should("contain", "Dropoff");

    cy.get("[data-cy=driverProfileBtn]").click();

    cy.get("[data-cy=driverName]").should("contain", "Bob The Truck Driver");
  });

  it("Create an appointment that results in a conflict, successfully overwrites old appointment", () => {
    cy.get(".MuiTableBody-root > :nth-child(5) > :nth-child(2)").dblclick();
    cy.get("[data-cy=dropDown").click();
    cy.get('[data-value="2"]').click();
    cy.contains("Save").click();
    cy.get('.jss297')
      .find("div")
      .should("contain", "Dropoff");

    cy.get(".MuiTableBody-root > :nth-child(4) > :nth-child(2)").dblclick();
    cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input")
      .click("center")
      .type(
        "{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{backspace}8"
      );
    cy.contains("Save").click();

    cy.get("[data-cy=yesConflictBtn]").click();

    cy.get('.jss297')
      .find("div")
      .should("not.contain", "Dropoff");
    cy.get('.jss297')
      .find("div")
      .should("contain", "Pickup");
  });
});

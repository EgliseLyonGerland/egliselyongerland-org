context("Header", () => {
  it("should stick", () => {
    cy.visit("/qui-sommes-nous");

    cy.get("$header").should("be.visible");
    cy.scrollTo(0, 10);
    cy.get("$header+sticky").should("not.exist");
    cy.scrollTo(0, 50);
    cy.get("$header+sticky").should("be.visible");
    cy.scrollTo("bottom");
    cy.get("$header+sticky").should("be.visible");
    cy.scrollTo("top");
    cy.get("$header+sticky").should("not.exist");
  });

  it("should change after resize", () => {
    cy.visit("/qui-sommes-nous");

    cy.get("$header-menu").should("be.visible");
    cy.get("$header-logo").should("be.visible");
    cy.get("$header-brand").should("be.visible");
    cy.get("$header-burger").should("not.exist");

    cy.viewport(900, 1024);

    cy.get("$header-menu").should("not.exist");
    cy.get("$header-logo").should("be.visible");
    cy.get("$header-brand").should("be.visible");
    cy.get("$header-burger").should("be.visible");

    cy.viewport(560, 1024);

    cy.get("$header-menu").should("not.exist");
    cy.get("$header-logo").should("be.visible");
    cy.get("$header-brand").should("not.exist");
    cy.get("$header-burger").should("be.visible");
  });

  it("should display and hide menu", () => {
    cy.viewport(900, 1024);
    cy.visit("/qui-sommes-nous");

    cy.get("$sidebar")
      .should("exist")
      .and("not.be.visible");
    cy.get("$header-burger").click();
    cy.get("$sidebar").should("be.visible");
    cy.get("$header-burger").click();
    cy.get("$sidebar").should("not.be.visible");
  });
});

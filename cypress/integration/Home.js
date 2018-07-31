context("Home", () => {
  beforeEach(() => {
    cy.server();
    cy.route("GET", "/posts?limit=10", "fixture:posts.json");
    cy.route("GET", "/posts?limit=2&category=1", "fixture:posts.json");
  });

  it.only("should stick", () => {
    cy.visit("/qui-sommes-nous");
    cy.get("$header-logo").click();
    cy.contains("Bienvenue");
  });
});

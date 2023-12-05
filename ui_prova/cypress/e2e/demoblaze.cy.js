describe("Testando o site https://www.demoblaze.com/index.html", () => {

  const { user, password } = { user: "testeze", password: "123456" };

  const randomChoice = () => {
    const random = Math.floor(Math.random() * 7) + 1;
    return random;
  };

  const randomCategory = () => {
    const possibleCategories = ["phone", "notebook", "monitor"];
    return possibleCategories[Math.floor(Math.random() * 3)];
  };

  it("should buy the n item of list", () => {
    cy.openSite();
    cy.get(`[onclick="byCat('` + randomCategory() + `')"]`).click();
    cy.wait(1000);
    cy.get(
      `#tbodyid > :nth-child(${randomChoice()}) > .card > .card-block > .card-title > .hrefch`
    ).click();
    cy.get(".col-sm-12 > .btn").click();
    cy.get("#cartur").click();

    cy.get(".col-lg-1 > .btn").click();
    cy.get("#name").type("Teste");
    cy.get("#country").type("Brasil");
    cy.get("#city").type("São Paulo");
    cy.get("#card").type("123456789");
    cy.get("#month").type("10");
    cy.get("#year").type("2020");
    cy.get(
      "#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click();
    cy.wait(1000);

    //check if the purchase was successful with message Thank you for your purchase!
    cy.get(".sweet-alert > h2").should(
      "contain",
      "Thank you for your purchase!"
    );
  });

  it("should remove the first item of list", () => {
    cy.openSite();
    cy.get(
      "#tbodyid > :nth-child(1) > .card > .card-block > .card-title > .hrefch"
    ).click();
    cy.get(".col-sm-12 > .btn").click();
    cy.get("#cartur").click();
    cy.get(".success > :nth-child(4) > a").click();

    //check if the item was removed from the cart
    cy.get("#tbodyid > tr").should("have.length", 0);
  });

  it("should have empty cart", () => {
    cy.openSite();
    cy.get("#cartur").click();

    //check if the cart is empty
    cy.get("#tbodyid > tr").should("have.length", 0);
  });

  it("should try to create an account without username", () => {
    cy.openSite();
    cy.get("#signin2").click();
    cy.get("#sign-password").type(password);
    cy.get(
      "#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click();

    // check window alert
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill out Username and Password.");
    });
  });

  it("should create an account", () => {
    cy.openSite();
    cy.get("#signin2").click();
    cy.get("#sign-username").type(user);
    cy.get("#sign-password").type(password);
    cy.wait(1000);
    cy.get(
      "#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click();

    // check window alert
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Sign up successful.");
    });
  });

  it("should login and logout", () => {
    cy.openSite();
    cy.wait(2000);
    cy.get("#login2").click();
    cy.get("#loginusername").type(user);
    cy.get("#loginpassword").type(password);

    cy.get(
      "#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click();

    cy.wait(1000);
    cy.get("#nameofuser").should("contain", user);
    cy.get("#logout2").click();

    cy.get("#login2").should("contain", "Log in");
  });
  
});

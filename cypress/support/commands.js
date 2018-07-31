Cypress.Commands.overwrite("get", (originalFn, selectorName, options) => {
  let selector = selectorName;

  if (selectorName.indexOf("$") === 0) {
    selector = selector.replace(/\$([\w-+]+)/g, '[data-cy="$1"]');
    selector = selector.replace("+", " ");
  }

  return originalFn(selector, options);
});

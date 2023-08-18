import { mobileVariables, tabletVariables, variables } from "./_variables";

export default function generateVariablesCss() {
  let generatedCss = `:root {\n`;
  variables.forEach((variable) => {
    generatedCss += `--${variable.name}: ${variable.value}px;\n`;
  });
  generatedCss += "}\n";

  generatedCss += `@media(max-width: 990px) {\n:root {\n`;
  tabletVariables.forEach((variable) => {
    const variableName = variables.find(({ id }) => id === variable.id).name;
    generatedCss += `--${variableName}: ${variable.value}px;\n`;
  });
  generatedCss += "}\n}";

  generatedCss += `@media(max-width: 479px) {\n:root {\n`;
  mobileVariables.forEach((variable) => {
    const variableName = variables.find(({ id }) => id === variable.id).name;
    generatedCss += `--${variableName}: ${variable.value}px;\n`;
  });
  generatedCss += "}\n}";

  return generatedCss;
}

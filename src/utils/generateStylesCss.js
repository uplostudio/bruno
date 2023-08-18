export default function generateStylesCss(listOfClasses) {
  let generatedCss = "";
  listOfClasses.forEach((styleClass) => {
    generatedCss += `.${styleClass.name} { ${styleClass.property}: ${styleClass.value}${styleClass.unit}; }
`;
  });
  return generatedCss;
}

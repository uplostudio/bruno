export default function generateStylingCss(listOfClasses) {
  let generatedCss = "";
  listOfClasses.forEach((styleClass) => {
    generatedCss += `.${styleClass.name} { ${styleClass.property}: ${styleClass.value}; }
`;
  });
  return generatedCss;
}
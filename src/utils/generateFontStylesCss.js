import { fontStyles, mobileFontStyles, tabletFontStyles } from "./_fontStyles";

export default function generateFontStylesCss() {
  let generatedCss = "";
  fontStyles.forEach((style) => {
    generatedCss += `.${style.name} { 
    font-family: ${style.fontFamily};
    font-size: ${style.fontSize}px;
    font-weight: ${style.fontWeight};
    letter-spacing: ${style.fontLetterSpacing};
    line-height: ${style.lineHeight}%;
    }
  `;
  });

  generatedCss += `@media (max-width: 768px) {\n`;
  tabletFontStyles.forEach((style) => {
    generatedCss += `.${style.name} {
        font-size: ${style.fontSize}px;
    }\n`;
  });
  generatedCss += `}\n`;

  generatedCss += `@media (max-width: 479px) {\n`;
  mobileFontStyles.forEach((style) => {
    generatedCss += `.${style.name} {
            font-size: ${style.fontSize}px;
        }\n`;
  });
  generatedCss += `}\n`;
  return generatedCss;
}

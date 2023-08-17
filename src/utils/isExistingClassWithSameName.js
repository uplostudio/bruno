export default function isExistingClassWithSameName(styleClasses, className) {
  return styleClasses?.find((styleClass) => styleClass.name === className);
}

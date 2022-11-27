export const scrollElementIntoView = (
  element: HTMLElement,
  behavior?: "smooth" | "auto"
) => {
  let scrollTop = window.pageYOffset || element.scrollTop;

  // Furthermore, if you have for example a header outside the iframe
  // you need to factor in its dimensions when calculating the position to scroll to
  const headerOutsideIframe = -100;

  const finalOffset =
    element.getBoundingClientRect().top + scrollTop + headerOutsideIframe;
  setTimeout(() => {
    window.scrollTo({
      top: finalOffset,
      behavior: behavior || "auto",
    });
  }, 50);
};

export function replaceSpecialChars(str: string) {
  str = str.replace(/[àáâãäå]/, "a");
  str = str.replace(/[èéê]/, "e");

  str = str.replace(/[ìíî]/, "i");
  str = str.replace(/[úùû]/, "u");
  str = str.replace(/[óòõô]/, "o");
  str = str.replace(/[ç]/, "c");

  return str.replace(/[^a-z0-9]/gi, "");
}

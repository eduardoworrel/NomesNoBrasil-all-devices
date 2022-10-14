export const scrollElementIntoView = (element: HTMLElement, behavior?: 'smooth'|'auto') => {

    let scrollTop = window.pageYOffset || element.scrollTop
  
     // Furthermore, if you have for example a header outside the iframe 
     // you need to factor in its dimensions when calculating the position to scroll to
     const headerOutsideIframe = -140
  
    const finalOffset = element.getBoundingClientRect().top + scrollTop + headerOutsideIframe
    setTimeout(()=>{
        window.scrollTo({
            top: finalOffset,
            behavior: behavior || 'auto'
        })
    },100)
  }

export function replaceSpecialChars(str : string)
{
    str = str.replace(/[ÀÁÂÃÄÅàáâãäå]/,"a");
    str = str.replace(/[ÈÉÊË]/,"e");
    str = str.replace(/[ÚúúùÙŨ]/,"u");
    str = str.replace(/[ÓóòÒÕÔ]/,"o");
    str = str.replace(/[çÇ]/,"c");

    return str.replace(/[^a-z0-9]/gi,''); 
}
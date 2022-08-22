export const scrollElementIntoView = (element: HTMLElement, behavior?: 'smooth'|'auto') => {

    let scrollTop = window.pageYOffset || element.scrollTop
  
     // Furthermore, if you have for example a header outside the iframe 
     // you need to factor in its dimensions when calculating the position to scroll to
     const headerOutsideIframe = -90
  
    const finalOffset = element.getBoundingClientRect().top + scrollTop + headerOutsideIframe
    setTimeout(()=>{
        window.scrollTo({
            top: finalOffset,
            behavior: behavior || 'auto'
        })
    },300)
  }
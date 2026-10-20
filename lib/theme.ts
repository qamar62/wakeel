// Runs in <head> before the page paints, so a saved dark choice never flashes light.
export const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#091f26")}}catch(e){}`;

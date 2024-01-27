function switchTheme() {
  // Change the color palette by clicking on the type icons in the header
  const rootElement = document.querySelector(":root");

  const grassTypePaletteSetter = document.querySelector("#grass");
  const waterTypePaletteSetter = document.querySelector("#water");
  const fireTypePaletteSetter = document.querySelector("#fire");
  
  grassTypePaletteSetter.onmousedown = () => {
    rootElement.style.cssText = `
    font-size: 16px;
    font-family: "VT323", sans-serif;
    --background-color: #20B49C;
    --elements-color: #107B6A;
    --elements-border: #5AD5C5;
    --highlight-color: #FF7B73;
    --text: darkslatedgray`;
  };

  waterTypePaletteSetter.onmousedown = () => {
    rootElement.style.cssText = `
    font-size: 16px;
    font-family: "VT323", sans-serif;
    --background-color: #083962;
    --elements-color: #2062AC;
    --elements-border: #5A8BCD;
    --highlight-color: #D5AC4A;
    --text: azure`;
};

  fireTypePaletteSetter.onmousedown = () => {
    rootElement.style.cssText = `
    font-size: 16px;
    font-family: "VT323", sans-serif;
    --background-color: #EE8329;
    --elements-color: #CD5241;
    --elements-border: #E64110;
    --highlight-color: #084152;
    --text: azure`;
  };
}

switchTheme();

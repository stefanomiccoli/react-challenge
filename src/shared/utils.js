const utils = {
  /* returns random integer value between min and max (included) */
  getRandomValue: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  /* generate random HSL color */
  getRandomColor: () => {
    return {
      h: utils.getRandomValue(0, 360), // hue
      s: utils.getRandomValue(20, 80), // saturation
      l: utils.getRandomValue(20, 80) // lightness
    };
  },

  /**
   * Randomly change luminance and saturation of a given color based on difficulty (1 to 5)
   */
  getColorVariation: (color, factor) => {
    // TODO alternate s & l
    const variation = { ...color };
    variation.s = color.s > 50 ? color.s - factor : color.s + factor;
    variation.l = color.l > 50 ? color.l - factor : color.l + factor;
    return variation;
  }

}

export default utils;
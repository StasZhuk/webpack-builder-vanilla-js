export const svg = (params) => {
  return `<svg class="icon-svg icon-svg_s icon-svg_s-${params.name} ${params.mod ? params.mod : ''}">` +
    `<use xlink:href="assets/images/sprite.svg#s-${params.name}"></use>` +
    `</svg>`
};

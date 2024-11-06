export function Point(xStart, yStart, width, height) {
    this.xStart = xStart
    this.xEnd = xStart + width
    this.yStart = yStart
    this.yEnd = yStart + height
}
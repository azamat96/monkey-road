export const size = (coefficient) => {
    return coefficient ? window.innerWidth*coefficient : window.innerWidth
}

export const drawRoad = (ctx, road) => {
    road.forEach((point) => {
        ctx.beginPath();
        ctx.arc(size(point[0]), size(point[1]), 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#373D32';
        ctx.fill();
    })
}
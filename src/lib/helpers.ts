export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomHexColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}
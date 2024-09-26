// Atualiza a cor quando o valor do deslizante muda
function updateColorFromSlider(sliderIndex) {
    const sliderElement = document.getElementById(`input${sliderIndex}`);
    const numberInputElement = document.getElementById(`value${sliderIndex}`);

    // Sincroniza a caixa de edição com o deslizante
    numberInputElement.value = sliderElement.value;

    // Atualiza a cor
    updateColor();
}

// Atualiza a cor quando o valor da caixa de edição muda
function updateColorFromNumberInput(inputIndex) {
    const numberInputElement = document.getElementById(`value${inputIndex}`);
    const sliderElement = document.getElementById(`input${inputIndex}`);

    // Sincroniza o deslizante com a caixa de edição
    sliderElement.value = numberInputElement.value;

    // Atualiza a cor
    updateColor();
}

// Atualiza a cor conforme o sistema escolhido
function updateColor() {
    const sliderValue1 = parseFloat(document.getElementById('input1').value) || 0;
    const sliderValue2 = parseFloat(document.getElementById('input2').value) || 0;
    const sliderValue3 = parseFloat(document.getElementById('input3').value) || 0;
    const sliderValue4 = parseFloat(document.getElementById('input4')?.value) || 0;

    // Atualiza os valores mostrados na caixas de edição ao lado dos deslizantes
    document.getElementById('value1').textContent = sliderValue1;
    document.getElementById('value2').textContent = sliderValue2;
    document.getElementById('value3').textContent = sliderValue3;

    if (document.getElementById('input4').style.display !== 'none') {
        document.getElementById('value4').textContent = sliderValue4;
    }

    const colorSystem  = document.getElementById('color-system').value;
    let color;
    let hexColor;

    if (colorSystem  === 'rgb') {

        color = `rgb(${sliderValue1}, ${sliderValue2}, ${sliderValue3})`;
        hexColor = convertRgbToHex(sliderValue1, sliderValue2, sliderValue3);

    } else if (colorSystem  === 'cmyk') {

        const rgbFromCmyk = convertCmykToRgb(sliderValue1 / 100, sliderValue2 / 100, sliderValue3 / 100, sliderValue4 / 100);
        color = `rgb(${rgbFromCmyk.r}, ${rgbFromCmyk.g}, ${rgbFromCmyk.b})`;
        hexColor = convertRgbToHex(rgbFromCmyk.r, rgbFromCmyk.g, rgbFromCmyk.b);

    } else if (colorSystem  === 'hsl') {

        color = `hsl(${sliderValue1}, ${sliderValue2}%, ${sliderValue3}%)`;
        const rgbFromHsl = convertHslToRgb(sliderValue1 / 360, sliderValue2 / 100, sliderValue3 / 100);
        hexColor = convertRgbToHex(rgbFromHsl.r, rgbFromHsl.g, rgbFromHsl.b);

    } else if (colorSystem  === 'hsv') {

        const rgbFromHsv = convertHsvToRgb(sliderValue1 / 360, sliderValue2 / 100, sliderValue3 / 100);
        color = `rgb(${rgbFromHsv.r}, ${rgbFromHsv.g}, ${rgbFromHsv.b})`;
        hexColor = convertRgbToHex(rgbFromHsv.r, rgbFromHsv.g, rgbFromHsv.b);
    }

    // Atualiza o fundo do site com a nova cor
    document.body.style.backgroundColor = color;

    // Atualiza o valor HEX
    document.getElementById('hex').value = hexColor;
}

// Atualiza os labels conforme o sistema escolhido
function updateLabels() {
    const colorSystem  = document.getElementById('color-system').value;
    const label1 = document.getElementById('label1');
    const label2 = document.getElementById('label2');
    const label3 = document.getElementById('label3');
    const fourthSliderDiv = document.getElementById('div4');

    if (colorSystem  === 'rgb') {
        label1.textContent = 'R:';
        label2.textContent = 'G:';
        label3.textContent = 'B:';
        document.getElementById('input1').max = '255';
        document.getElementById('input2').max = '255';
        document.getElementById('input3').max = '255';
        fourthSliderDiv.style.display = 'none';
    } else if (colorSystem  === 'cmyk') {
        label1.textContent = 'C:';
        label2.textContent = 'M:';
        label3.textContent = 'Y:';
        document.getElementById('input1').max = '100';
        document.getElementById('input2').max = '100';
        document.getElementById('input3').max = '100';
        fourthSliderDiv.style.display = 'flex';
    } else if (colorSystem  === 'hsl') {
        label1.textContent = 'H:';
        label2.textContent = 'S:';
        label3.textContent = 'L:';
        document.getElementById('input1').max = '360';
        document.getElementById('input2').max = '100';
        document.getElementById('input3').max = '100';
        fourthSliderDiv.style.display = 'none';
    } else if (colorSystem  === 'hsv') {
        label1.textContent = 'H:';
        label2.textContent = 'S:';
        label3.textContent = 'V:';
        document.getElementById('input1').max = '360';
        document.getElementById('input2').max = '100';
        document.getElementById('input3').max = '100';
        fourthSliderDiv.style.display = 'none';
    }

    updateColor();
}

// Função que converte HEX para RGB
function convertHexToRgb(hexCode) {
    // Remove o '#' do códgio HEX, se estiver 
    hexCode = hexCode.replace('#', '');

    // Verifica se o código HEX é válido (6 caracteres, pois já foi retirado o #)
    if (hexCode.length  === 6) {
        // Divide o código HEX em 3 partes (R, G, B)
        const red  = parseInt(hexCode.substring(0, 2), 16); // Pega os 2 primeiros digitos do HEX, e transforma da base hexadecimal para a base decimal. 00 a FF = 0 a 255
        const green  = parseInt(hexCode.substring(2, 4), 16); 
        const blue = parseInt(hexCode.substring(4, 6), 16); 
        return { r: red, g: green, b: blue };
    } else {
        return null; // Se o HEX for inválido, retorna null, ou seja nada.
    }
}

// Função para atualizar os deslizantes e caixas de edição ao inserir um valor HEX
function updateColorFromHex() {
    const hexValue = document.getElementById('hex').value; // Obtém o valor inserido na caixa de edição do HEX
    const rgb = convertHexToRgb(hexValue); // Converte o valor HEX para RGB

    if (rgb) { // Se a conversão for válida
        // Atualiza os deslizantes e caixas de edição com os valores RGB
        document.getElementById('input1').value = rgb.r;
        document.getElementById('input2').value = rgb.g;
        document.getElementById('input3').value = rgb.b;

        document.getElementById('value1').value = rgb.r;
        document.getElementById('value2').value = rgb.g;
        document.getElementById('value3').value = rgb.b;

        // Atualiza o fundo com a cor RGB correspondente
        document.body.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } 
}

// Conversão de CMYK (ciano, magenta, amarelo, preto) para RGB
function convertCmykToRgb(cyan, magenta, yellow, black) {
    const red = 255 * (1 - cyan) * (1 - black);   // Calcula o valor do vermelho
    const green = 255 * (1 - magenta) * (1 - black); // Calcula o valor do verde
    const blue = 255 * (1 - yellow) * (1 - black);  // Calcula o valor do azul
    return { r: Math.round(red), g: Math.round(green), b: Math.round(blue) };  // Retorna os valores RGB arredondados
}

// Conversão de HSV (matiz, saturação, valor) para RGB
function convertHsvToRgb(hue, saturation, value) {
    let red, green, blue;
    const index  = Math.floor(hue * 6); // Determina a seção que vai estar no círculo de cores
    const fractionalPart = hue * 6 - index; // Parte fracionária da matiz
    const colorLow = value * (1 - saturation); //Este valor representa a intensidade mínima da cor com base na saturação.
    const colorMid = value * (1 - fractionalPart * saturation);  //Este valor está entre colorLow e value, representando um ponto médio na transição de cor
    const colorHigh = value * (1 - (1 - fractionalPart) * saturation);  //Este valor representa uma intensidade alta da cor em relação à saturação.

    switch (index % 6) {
        case 0: red = value, green = colorHigh, blue = colorLow; break;
        case 1: red = colorMid, green = value, blue = colorLow; break;
        case 2: red = colorLow, green = value, blue = colorHigh; break;
        case 3: red = colorLow, green = colorMid, blue = value; break;
        case 4: red = colorHigh, green = colorLow, blue = value; break;
        case 5: red = value, green = colorLow, blue = colorMid; break;
    }

    return {
        r: Math.round(red * 255),
        g: Math.round(green * 255),
        b: Math.round(blue * 255)
    };
}

// Função para converter RGB para HEX (um código hexadecimal)
function convertRgbToHex(red, green, blue) {
    // Função auxiliar para converter um componente de cor em formato hexadecimal
    const toHex = (colorComponent) => {
        const hexValue = Math.round(colorComponent).toString(16);  // Converte para hexadecimal
        return hexValue.length === 1 ? '0' + hexValue : hexValue; // Garante que sempre tenha 2 caracteres
    };
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`; // Retorna o código HEX completo
}

// Conversão de HSL para RGB
function convertHslToRgb(hue, saturation, lightness) {
    let red, green, blue;

    // Se a saturação for zero, retorna uma escala de cinza
    if (saturation === 0) {
        red = green = blue = lightness; // A escala de cinza
    } else {
        // Função auxiliar para converter matiz em RGB
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1; // Normaliza t se estiver fora dos limites
            if (t > 1) t -= 1; // Normaliza t se estiver fora dos limites
            if (t < 1/6) return p + (q - p) * 6 * t; // Interpolação
            if (t < 1/2) return q; // Interpolação
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6; // Interpolação
            return p; // Interpolação
        };

        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation; // Cálculo de q
        const p = 2 * lightness - q; // Cálculo de p
        red = hueToRgb(p, q, hue + 1/3); // Cálculo do vermelho
        green = hueToRgb(p, q, hue); // Cálculo do verde
        blue = hueToRgb(p, q, hue - 1/3); // Cálculo do azul
    }

    // Retorna os valores RGB arredondados
    return {
        r: Math.round(red * 255),
        g: Math.round(green * 255),
        b: Math.round(blue * 255)
    };
}
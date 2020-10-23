

/**
 * Global constant variables
 */
const XMLNS = 'http://www.w3.org/2000/svg';
const radius = 25;
const CIRCUMFERENCE = 2 * 3.141592 * radius;

// let colors = ['#E6842A', '#E25A42', '#0F8C79', '#A0B700'];
let colors = ['#E25A42', '#A0B700', '#4F81BD', '#E6842A'];

let pieDataAreas;
let data = [];

/**
 * SVG Object for pie-chart
 */
let SVGPieObject = {
    'class': 'svg-circle',
    'width': '100',
    'height': '100',
    'viewBox': '-52 -52 104 104',
    'fill': 'none',
    'xmlns': 'http://www.w3.org/2000/svg',
    'transform': 'rotate(-90)'
}

/**
 * SVG Object for bar chart
 */
let SVGBarObject = {
    'class': 'svg-bar-chart',
    'width': '150',
    'height': '100',
    'viewBox': '-10 0 160 100',
    'fill': 'none',
    'xmlns': 'http://www.w3.org/2000/svg'
}

/**
 * SVG Object for bar chart
 */
let SVGLineObject = {
    'class': 'svg-line-chart',
    'width': '150',
    'height': '100',
    'viewBox': '-10 0 160 100',
    'fill': 'none',
    'xmlns': 'http://www.w3.org/2000/svg'
}

/**
 * X axis for the charts
 */
let xAxisObject = {
    'x1': '0',
    'y1': '90',
    'x2': '150',
    'y2': '90',
    'stroke': '#7A7A7A',
    'stroke-width': '0.5'
}

/**
 * Y axis for the charts
 */
let yAxisObject = {
    'x1': '0',
    'y1': '10',
    'x2': '0',
    'y2': '90',
    'stroke': '#7A7A7A',
    'stroke-width': '0.5'
}

/**
 * Pie Chart Object
 */
let pieChartObject = {
    'class': 'pie-area',
    'r': '25',
    'cx': '0',
    'cy': '0',
    'fill': 'none',
    'stroke-width': '50'
}

/**
 * Gets the data contained in the table to draw the charts.
 * It returns an object that contains the data series and its respective value as
 * a percentage of the total.
 */
function getData() {
    let dataArray = [];
    let redTotal = 0;
    let greenTotal = 0;
    let blueTotal = 0;

    // Gets the data from each cell in the array and adds it to the array
    document.querySelectorAll('input').forEach( (elem) => {
        dataArray.push( parseInt( elem.value ) );
    } );

    // Get the sum for each series that will appear on the pie chart
    for(let i = 0; i <= 3; i++) {
        redTotal += dataArray[i];
    }

    for(let i = 4; i <= 7; i++) {
        greenTotal += dataArray[i];
    }

    for(let i = 8; i <= 11; i++) {
        blueTotal += dataArray[i];
    }

    // Calculate the areas in the pie chart as a fraction of the total
    let dataAreas = {
        'red': [dataArray[0]/redTotal, dataArray[1]/redTotal, dataArray[2]/redTotal, dataArray[3]/redTotal],
        'green': [dataArray[4]/greenTotal, dataArray[5]/greenTotal, dataArray[6]/greenTotal, dataArray[7]/greenTotal],
        'blue': [dataArray[8]/blueTotal, dataArray[9]/blueTotal, dataArray[10]/blueTotal, dataArray[11]/blueTotal],
    }

    return [dataAreas, dataArray];
}

/**
 * Removes the existing chart containers to add the new charts.
 */
function removeChart() {
    let parent = document.querySelector('.chart-container');

    //If there is a child, it means there is a chart that needs to be removed.
    while(parent.childElementCount > 0)
        parent.removeChild(parent.children[0]);
}

/**
 * @brief   Draws the pie charts for each data series gotten from the table. It will add three
 *          pie charts.
 * @param {*} dataSerie: Data series to be draw. Values -> "red", "green", "blue
 * " 
 */
function drawPieChart(dataSerie) {
    // alert('Draw Pie Chart')
    let angleRotation = 0;
    let pieChartSeriesArray = [];

    // Get parent container for the SVG Charts
    let chartContainer = document.querySelector('.chart-container');

    // Create div container for the SVG
    let pieContainer = document.createElementNS(null, 'div');

    // Add class to the pie chart container
    pieContainer.setAttribute('class', 'pie-container');

    // Add the new div child to the parent container (chartContainer)
    chartContainer.appendChild(pieContainer);

    // Create the element title for the pie chart
    let pieChartTitle = document.createElement('h6');
    pieChartTitle.setAttribute('class', 'pie-chart-title');
    pieChartTitle.textContent = dataSerie;

    // Add the pie chart title to the div container
    pieContainer.appendChild(pieChartTitle);

    // Creat the pie Chart Area
    let SVGPie = document.createElementNS(XMLNS, 'svg');

    // Add all the attributes to the svg pie chart
    for (newAttribute in SVGPieObject) {
        SVGPie.setAttribute(newAttribute, SVGPieObject[newAttribute]);
    }

    // Add the svg element to the pie chart container
    pieContainer.appendChild(SVGPie);

    // Add pie chart areas(slices) to the svg element created and visualize the data
    // The pie chart consist of 4 data areas(slices)
    for(let index = 0; index < 4; index++) {
        let pieChartArea = document.createElementNS(XMLNS, 'circle');

        // Add necessary attributes to the new circle element created 
        for(newAttribute in pieChartObject) {
            pieChartArea.setAttribute(newAttribute, pieChartObject[newAttribute]);
        }

        // Add the color attribute with the predefined colors in the array
        pieChartArea.setAttribute('stroke', colors[index]);


        // let strokeAreaSize = (pieDataAreas[dataSerie][index] * CIRCUMFERENCE) + ', ' + CIRCUMFERENCE;
        let strokeAreaSize = (data[0][dataSerie][index] * CIRCUMFERENCE) + ', ' + CIRCUMFERENCE;
        pieChartArea.setAttribute('stroke-dasharray', strokeAreaSize);

        if(index > 0) {
            // angleRotation += (pieDataAreas[dataSerie][index - 1]) * 360;
            angleRotation += (data[0][dataSerie][index - 1]) * 360;
            pieChartArea.setAttribute('transform', `rotate(${angleRotation})`);
        }
        
        SVGPie.appendChild(pieChartArea);

        //Create and add attributes to the chart series identifiers.
        let pieChartSeries = document.createElement('p');

        /**
         * Adds class and color to the legend(paragraph). The color is not added in the CSS class,
         * since it will create all the text with the same color. Adding it here creates deferent
         * color text(legend).
         */
        pieChartSeries.setAttribute('class', 'pie-chart-series');
        pieChartSeries.style.color = colors[index];

        // Build the text legend to add to the pie chart.
        // pieChartSeries.textContent = 'Q' + (index + 1) + ' = ' + Math.floor((pieDataAreas[dataSerie][index])*100) + '%';
        pieChartSeries.textContent = 'Q' + (index + 1) + ' = ' + Math.floor((data[0][dataSerie][index])*100) + '%';

        // Creates an array with the legends for all the pie charts.
        pieChartSeriesArray.push( pieChartSeries );
    }

    //Create the div container for the data series identifiers
    let pieChartSeriesContainer = document.createElement('div');
    pieChartSeriesContainer.setAttribute('class', 'pie-chart-series-container');
    pieContainer.appendChild(pieChartSeriesContainer);

    // Adds the legend to the container at the bottom of the chart
    for(let i = 0; i < pieChartSeriesArray.length; i++) {
        pieChartSeriesContainer.appendChild(pieChartSeriesArray[i]);
    }

}

/**
 * @brief   Creates and add the bar chart to the web page.
 */
function drawBarChart() {

    // Get parent container for the SVG Charts
    let chartContainer = document.querySelector('.chart-container');

    // Create div container for the SVG
    let barContainer = document.createElementNS(null, 'div');

    // Add class to the pie chart container
    barContainer.setAttribute('class', 'bar-container');

    // Add the new div child to the parent container (chartContainer)
    chartContainer.appendChild(barContainer);

    // Create the element title for the bar chart
    let barChartTitle = document.createElement('h6');
    barChartTitle.setAttribute('class', 'pie-chart-title');
    barChartTitle.textContent = 'bar chart';

    // Add the pie chart title to the div container
    barContainer.appendChild(barChartTitle);

    // Create the svg element for the bar chart
    let SVGBar = document.createElementNS(XMLNS, 'svg');

    // Add the attributes required for the bar chart
    for(newAttribute in SVGBarObject) {
        SVGBar.setAttribute(newAttribute, SVGBarObject[newAttribute]);
    }

    // Add the svg element with the new attributes to the container
    barContainer.appendChild(SVGBar);

    /**
     * Create all the svg elements that will draw the bar chart. First the axis,
     * then text, and grid lines
     */
    // Create the line element fot the axis
    let xAxis = document.createElementNS(XMLNS, 'line');
    
    // Add the attributes to the new line element for the axis
    for(newAttribute in xAxisObject) {
        xAxis.setAttribute(newAttribute, xAxisObject[newAttribute]);
    }

    // Add the new axis to the svg element
    SVGBar.appendChild(xAxis);

    // Create the line element fot the axis
    let yAxis = document.createElementNS(XMLNS, 'line');
    
    // Add the attributes to the new line element for the axis
    for(newAttribute in xAxisObject) {
        yAxis.setAttribute(newAttribute, yAxisObject[newAttribute]);
    }

    // Add the new axis to the svg element
    SVGBar.appendChild(yAxis);

    /**
     * Create the text elements for the x axis values(legend) and add the attributes
     * to each of them. A for loop is used to create each x-value. Every element is
     * separated by an offset of 30 units.
     */
    for(let index = 0; index < 4; index++) {
        // Create the text element to be added
        let xAxisValue = document.createElementNS(XMLNS, 'text');        

        // Bse coordinates for the text elements.
        let xBase = 30;
        let yBase = 96;

        // Set the new attributes.
        xAxisValue.setAttribute('class', 'x-axis-values');
        xAxisValue.setAttribute('fill', 'black');
        xAxisValue.setAttribute('y', `${yBase}`);
        xAxisValue.setAttribute('x', `${xBase + 30*index}`);

        // Add the text to be displayed.
        xAxisValue.textContent = `Q${index + 1}`;

        // Add element to the parent(SVG).
        SVGBar.appendChild(xAxisValue);
    }

    /**
     * Create the text elements for the y axis values(legend) and add the attributes
     * to each of them. A for loop is used to create each y-value. Every element is
     * separated by an offset of 10 units.
     */
    for(let index = 0; index < 9; index++) {
        // Create the text element to be added
        let yAxisValue = document.createElementNS(XMLNS, 'text');        

        // Bse coordinates for the text elements.
        let xBase = -10;
        let yBase = 90;

        // Set the new attributes.
        yAxisValue.setAttribute('class', 'y-axis-values');
        yAxisValue.setAttribute('fill', 'black');
        yAxisValue.setAttribute('x', `${xBase}`);
        yAxisValue.setAttribute('y', `${yBase - 10*index}`);

        // Add the text to be displayed.
        yAxisValue.textContent = `${20*index}`;

        // Add element to the parent(SVG).
        SVGBar.appendChild(yAxisValue);
    }

    /**
     * Create the line elements that defines the grid of the chart and add the necessary
     * attributes to be correctly displayed on the screen.
     */
    for(let index = 0; index < 8; index++) {
        let gridLines = document.createElementNS(XMLNS, 'line');

        let yValue = 10;

        gridLines.setAttribute('y1', `${yValue + 10*index}`);
        gridLines.setAttribute('y2', `${yValue + 10*index}`);
        gridLines.setAttribute('x1', '0');
        gridLines.setAttribute('x2', '150');
        gridLines.setAttribute('stroke', '#D1D1D1');
        gridLines.setAttribute('stroke-width', '0.25');

        SVGBar.appendChild(gridLines);
    }

    /**
     * Draw the bars using the data from the table.
     */
     for(let series = 0; series < 12; series = series + 4) {
         let gap = 8;

        for(let index = 0; index < 4; index++) {
            let rectHeight = data[1][(index + series)] * 0.5;
            let xCoordinateBase = 22 + (gap * series / 4);
            let yCoordinate = 90 - rectHeight;
            
            let redRectangle = document.createElementNS(XMLNS, 'rect');
            redRectangle.setAttribute('width', '6');
            redRectangle.setAttribute('fill', `${colors[series/4]}`);
            redRectangle.setAttribute('x', `${xCoordinateBase + (30 * index)}`);
            redRectangle.setAttribute('y', `${yCoordinate}`);        
            redRectangle.setAttribute('height', `${rectHeight}`);
    
            SVGBar.appendChild(redRectangle);        
        }

     }
     
    
    // Creates the legend container for the chart.
    let legendContainer = document.createElement('div');
    barContainer.appendChild(legendContainer);

    // Holds the text content of the legend.
    let legendContent = ['red', 'green', 'blue'];

    // Iterates to create the three paragraphs for the legend content.
    for(let index = 0; index < 3; index++) {
        let legend = document.createElement('p');

        legend.setAttribute('class', `bar-chart-legend ${legendContent[index]}-legend`);
        legend.textContent = `${legendContent[index]}`;

        legendContainer.appendChild(legend);
    }

}

/**
 * @brief   
 */
function drawLineChart() {
    // Get parent container for the SVG Charts
    let chartContainer = document.querySelector('.chart-container');

    // Create div container for the SVG
    let lineContainer = document.createElementNS(null, 'div');

    // Add class to the pie chart container
    lineContainer.setAttribute('class', 'line-container');

    // Add the new div child to the parent container (chartContainer)
    chartContainer.appendChild(lineContainer);

    // Create the element title for the bar chart
    let lineChartTitle = document.createElement('h6');
    lineChartTitle.setAttribute('class', 'pie-chart-title');
    lineChartTitle.textContent = 'line chart';

    // Add the pie chart title to the div container
    lineContainer.appendChild(lineChartTitle);

    // Create the svg element for the bar chart
    let SVGLine = document.createElementNS(XMLNS, 'svg');

    // Add the attributes required for the bar chart
    for(newAttribute in SVGBarObject) {
        SVGLine.setAttribute(newAttribute, SVGLineObject[newAttribute]);
    }

    // Add the svg element with the new attributes to the container
    lineContainer.appendChild(SVGLine);

    /**
     * Create all the svg elements that will draw the bar chart. First the axis,
     * then text, and grid lines
     */
    // Create the line element fot the axis
    let xAxis = document.createElementNS(XMLNS, 'line');
    
    // Add the attributes to the new line element for the axis
    for(newAttribute in xAxisObject) {
        xAxis.setAttribute(newAttribute, xAxisObject[newAttribute]);
    }

    // Add the new axis to the svg element
    SVGLine.appendChild(xAxis);

    // Create the line element fot the axis
    let yAxis = document.createElementNS(XMLNS, 'line');
    
    // Add the attributes to the new line element for the axis
    for(newAttribute in xAxisObject) {
        yAxis.setAttribute(newAttribute, yAxisObject[newAttribute]);
    }

    // Add the new axis to the svg element
    SVGLine.appendChild(yAxis);

    /**
     * Create the text elements for the x axis values(legend) and add the attributes
     * to each of them. A for loop is used to create each x-value. Every element is
     * separated by an offset of 30 units.
     */
    for(let index = 0; index < 4; index++) {
        // Create the text element to be added
        let xAxisValue = document.createElementNS(XMLNS, 'text');        

        // Bse coordinates for the text elements.
        let xBase = 30;
        let yBase = 96;

        // Set the new attributes.
        xAxisValue.setAttribute('class', 'x-axis-values');
        xAxisValue.setAttribute('fill', 'black');
        xAxisValue.setAttribute('y', `${yBase}`);
        xAxisValue.setAttribute('x', `${xBase + 30*index}`);

        // Add the text to be displayed.
        xAxisValue.textContent = `Q${index + 1}`;

        // Add element to the parent(SVG).
        SVGLine.appendChild(xAxisValue);
    }

    /**
     * Create the text elements for the y axis values(legend) and add the attributes
     * to each of them. A for loop is used to create each y-value. Every element is
     * separated by an offset of 10 units.
     */
    for(let index = 0; index < 9; index++) {
        // Create the text element to be added
        let yAxisValue = document.createElementNS(XMLNS, 'text');        

        // Bse coordinates for the text elements.
        let xBase = -10;
        let yBase = 90;

        // Set the new attributes.
        yAxisValue.setAttribute('class', 'y-axis-values');
        yAxisValue.setAttribute('fill', 'black');
        yAxisValue.setAttribute('x', `${xBase}`);
        yAxisValue.setAttribute('y', `${yBase - 10*index}`);

        // Add the text to be displayed.
        yAxisValue.textContent = `${20*index}`;

        // Add element to the parent(SVG).
        SVGLine.appendChild(yAxisValue);
    }

    /**
     * Create the line elements that defines the grid of the chart and add the necessary
     * attributes to be correctly displayed on the screen.
     */
    for(let index = 0; index < 8; index++) {
        let gridLines = document.createElementNS(XMLNS, 'line');

        let yValue = 10;

        gridLines.setAttribute('y1', `${yValue + 10*index}`);
        gridLines.setAttribute('y2', `${yValue + 10*index}`);
        gridLines.setAttribute('x1', '0');
        gridLines.setAttribute('x2', '150');
        gridLines.setAttribute('stroke', '#D1D1D1');
        gridLines.setAttribute('stroke-width', '0.25');

        SVGLine.appendChild(gridLines);
    }

    /**
     * Draw the lines using the data from the table.
     */

     
    
    // Creates the legend container for the chart.
    let legendContainer = document.createElement('div');
    lineContainer.appendChild(legendContainer);

    // Holds the text content of the legend.
    let legendContent = ['red', 'green', 'blue'];

    // Iterates to create the three paragraphs for the legend content.
    for(let index = 0; index < 3; index++) {
        let legend = document.createElement('p');

        legend.setAttribute('class', `bar-chart-legend ${legendContent[index]}-legend`);
        legend.textContent = `${legendContent[index]}`;

        legendContainer.appendChild(legend);
    }
}

/**
 * Function that gets called when the draw chart button is clicked.
 */
function drawChart() {
    // Gets the data from the table
    // pieDataAreas = getData();
    data = getData();

    // Removes default charts to draw the one(s) containing the data.
    removeChart();

    /**
     * According to the chart type selection the specific chart gets drawn on
     * the screen.
     */
    let chartType = document.querySelector('select');

    switch (chartType.value) {
        case 'pie':
            drawPieChart('red');
            drawPieChart('green');
            drawPieChart('blue');
            break;

        case 'bar':
            drawBarChart();
            break;

        case 'line':
            drawLineChart();
            break;

        default:
            alert('Ooopps! There was a problem. Try reloading the page.');
            break;
    }
}

window.onload = function() {
    drawChart();
}
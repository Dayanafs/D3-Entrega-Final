const width = 800 //Definir constantes
const height = 700
const margin = {top: 100, bottom:100, left:40, right:20}




//Declarar SVG
const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, 
    ${margin.top})`)


d3.select("svg")
  .append("text")
    .attr("x", 10)
    .attr("y", 20)
    .text("Paises que han ganado los mundiales de Futbol")
    .style("font-size", "20px")
    .style("font-family", "Arial")
    
    .style("font-weight", "bold");
    
    
//Definir escala
let x = d3.scaleBand().range ([0, width - margin.left - margin.right]).padding(0.2)
let y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

//Definir ejes
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left},
     ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left},
     ${margin.top})`)


const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

svg.append("text")
    .attr("x", width)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Título de la gráfica");

d3.csv("WorldCup.csv").then(data => {
    
    data.map(d=> {
        d.Year= +d.Year
    })	

    let nestedData = d3.nest()
    .key(d=> d.Winner)
    .entries(data)
      
         
        x.domain(data.map(d => d.Winner))
        y.domain([0, d3.max(nestedData.map(d => d.values = d.values.length))])
          
        
        
        xAxisGroup.call(xAxis).selectAll("text").attr("text-anchor", "middle")
        yAxisGroup.call(yAxis.ticks(5).tickSize(-width* (0.9))).attr("stroke-dasharray", "5, 8")
        yAxisGroup.select('.domain').remove() //Quitar el eje y.
        
        let barras = elementGroup.selectAll("rect").data(nestedData)
        barras.enter().append("rect")
            .attr("class", d=> d.key)
            .attr("x", d => x(d.key))
            .attr("y", d => y(d.values))
            .attr("height", d => height - margin.top - margin.bottom - y(d.values))
            .attr("width", x.bandwidth()) 
            console.log(nestedData) 
    })

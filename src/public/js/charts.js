var data = [123, 123, 222, 123, 123];
var labels =  ["tabacos", "papeles", "parafernalia", "bongs", "filtros"];
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'This week',
            data: data,
        }]
    },
});
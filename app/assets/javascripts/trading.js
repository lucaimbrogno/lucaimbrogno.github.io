var stock_chart;
var stock_sim;
var cash = 0;
function buy() {
        var buy_flags = stock_chart.series[1];
        var line = stock_chart.series[0];
        var x_data = line.processedXData;
        var y_data = line.processedYData;
        var x = x_data[x_data.length-1];
        var y = y_data[y_data.length-1];

        buy_flags.addPoint([x,y], true, false, false, false);
        cash = cash - y;
}

function sell() {
        var sell_flags = stock_chart.series[2];
        var line = stock_chart.series[0];
        var x_data = line.processedXData;
        var y_data = line.processedYData;
        var x = x_data[x_data.length-1];
        var y = y_data[y_data.length-1];

        sell_flags.addPoint([x,y], true, false, false, false);
        cash = cash + y;
}
function runSim() {

        equity = $('option:selected').val();
        ticker = equity.toUpperCase();
        title = ticker;
        time_data = $('#' + equity + '_time').val().split(" ");
        date_string = time_data[0] + ' - ' + time_data[time_data.length-1];

        stock_chart = Highcharts.chart('chart', {
                chart: {
                        type: 'line',
                        animation: Highcharts.svg, // don't animate in IE < IE 10.
                        marginRight: 10,
                        events: {
                                load: function () {
                                        // set up the updating of the chart each second

                                        var series = this.series;
                                        var i = 0;
                                        stock_sim = setInterval(function () {

                                          x_data = $('#' + equity + '_time').val().split(" ");
                                          y_data = $('#' + equity + '_price').val().split(" ");
                                                if (i == x_data.length - 1) {
                                                        clearInterval(stock_sim);
                                                        results();
                                                }

                                                var x = Date.parse(x_data[i]);
                                                var y = parseFloat(y_data[i]);

                                                series[0].addPoint([x,y], true, false, false, false);
                                                i++;

                                        }, 250);
                                }
                        }
                },

                title: {
                        text: title
                },

                subtitle: {
                        text: date_string
                },

                yAxis: {
                        title: {
                                text: 'Price'
                        }
                },
                legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                },
                xAxis: {
                        type: 'datetime'
                },
                plotOptions: {

                        series: {
                          data:[],
                          marker: {
                            enabled:false
                          }
                                }
                },
                series: [{
                        name: ticker,
                        data: [],
                        id: 'dataseries'
                },
                        {
                                name: 'buys',
                                type: 'flags',
                                title: 'B',
                                onSeries: 'dataseries',
                                data: [],
                                fillColor: 'lightblue',
                                width: 16,
                                showInLegend: false
                        },
                        {
                                name: 'sells',
                                type: 'flags',
                                title: 'S',
                                onSeries: 'dataseries',
                                data: [],
                                fillColor: 'lightblue',
                                width: 16,
                                showInLegend: false
                        }],

                responsive: {
                        rules: [{
                                condition: {
                                        maxWidth: 500
                                },
                                chartOptions: {
                                        legend: {
                                                layout: 'horizontal',
                                                align: 'center',
                                                verticalAlign: 'bottom'
                                        }
                                }
                        }]
                }
        });
}

function results(){
        $('.text-bubble').html("Your Profit: $" + cash);
        $('.text-bubble').css('display','block');
}

function reset(){
        //$('.text-bubble').css('display','none');
        clearInterval(stock_sim);
        equity = $('option:selected').val();
        ticker = equity.toUpperCase();
        title = ticker + " Stock";
        time_data = $('#' + equity + '_time').val().split(" ");
        date_string = time_data[0] + ' - ' + time_data[time_data.length-1];

        stock_chart = Highcharts.chart('chart', {
                chart: {
                        type: 'line',
                        animation: Highcharts.svg, // don't animate in IE < IE 10.
                        marginRight: 10,
                },

                title: {
                        text: title
                },

                subtitle: {
                        text: date_string
                },

                yAxis: {
                        title: {
                                text: 'Price'
                        }
                },
                legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                },

                plotOptions: {

                        series: {
                                marker: {
                                        enabled: false
                                },
                                label: {
                                        connectorAllowed: false
                                }
                        }
                },

                series: [{
                        name: ticker,
                        data: []
                }],

                responsive: {
                        rules: [{
                                condition: {
                                        maxWidth: 500
                                },
                                chartOptions: {
                                        legend: {
                                                layout: 'horizontal',
                                                align: 'center',
                                                verticalAlign: 'bottom'
                                        }
                                }
                        }]
                }
        });
}

$(document).ready(function() {
        reset();

        $("#stock-selections").change(function (){
            reset();
        });
});

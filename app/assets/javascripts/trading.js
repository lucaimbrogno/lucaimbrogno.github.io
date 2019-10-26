var stock_chart;
var full_data;
var cash = 0;
function buy() {
        var buy_flags = stock_chart.series[1];
        console.log("ye");
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
        console.log("ye");
        var line = stock_chart.series[0];
        var x_data = line.processedXData;
        var y_data = line.processedYData;
        var x = x_data[x_data.length-1];
        var y = y_data[y_data.length-1];

        sell_flags.addPoint([x,y], true, false, false, false);
        cash = cash + y;
}
function runSim() {
        full_data = $('#full_data').val().split(" ").map(function (item) {
                return parseInt(item, 10);
        });


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
                                        var stock_sim = setInterval(function () {

                                                full_data = $('#full_data').val().split(" ").map(function (item) {
                                                        return parseInt(item, 10);
                                                });
                                                if (i == full_data.length - 1) {
                                                        clearInterval(stock_sim);
                                                        results();
                                                }

                                                var y = full_data[i];
                                                try {
                                                        series[0].addPoint(y, true, false, false, false);
                                                } catch (err) {
                                                        //do nothing because this error seems to be irrelevant
                                                }
                                                i++;

                                        }, 250);
                                }
                        }
                },

                title: {
                        text: 'AAPL Stock Price'
                },

                subtitle: {
                        text: 'date-date'
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
                                marker: {
                                        enabled: false
                                },
                                label: {
                                        connectorAllowed: false
                                },
                                pointStart: Date.UTC(2015, 0, 1),
                                pointInterval: 24 * 3600 * 1000
                        }
                },

                series: [{
                        name: 'Stock',
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

        stock_chart = Highcharts.chart('chart', {
                chart: {
                        type: 'line',
                        animation: Highcharts.svg, // don't animate in IE < IE 10.
                        marginRight: 10,
                },

                title: {
                        text: 'AAPL Stock Price'
                },

                subtitle: {
                        text: 'data-date'
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
                                },
                                pointStart: 2010
                        }
                },

                series: [{
                        name: 'Stock',
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

});

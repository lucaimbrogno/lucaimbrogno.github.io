var stock_chart;
var stock_sim;
var cash = 0;
var shares_owned = 0;
var time = $("#aapl_time").val().split(" ");
var price = $("#aapl_price").val().split(" ");
var ticker = "AAPL";

function findStock() {
    ticker = $('.stock-ticker').val();

    $.ajax({
        url: "/stock_game",
        type: "get",
        data: {
            ticker: ticker
        },
        success: function (result) {
            // reset();

            // Create new DOM element to parse result
            var el = document.createElement( 'html' );
            el.innerHTML = result;
            reset();

            time = $("#time", el).val().split(" ");
            price = $("#price", el).val().split(" ");
        },
        error: function (data) {
            alert("Please enter a valid dick ticker. Ex: 'MSFT'");
        }

    });
}

function buy() {
        var buy_flags = stock_chart.series[1];
        var line = stock_chart.series[0];
        var x_data = line.processedXData;
        var y_data = line.processedYData;
        var x = x_data[x_data.length-1];
        var y = y_data[y_data.length-1];

        buy_flags.addPoint([x,y], true, false, false, false);
        cash = cash - y;
        shares_owned++;
}

function sell() {
    if (shares_owned > 0) {
        var sell_flags = stock_chart.series[2];
        var line = stock_chart.series[0];
        var x_data = line.processedXData;
        var y_data = line.processedYData;
        var x = x_data[x_data.length - 1];
        var y = y_data[y_data.length - 1];

        sell_flags.addPoint([x, y], true, false, false, false);
        cash = cash + y;
        shares_owned--;
    }
}
function runSim() {

        equity = $('.stock-ticker').val();
        ticker = equity.toUpperCase();
        title = ticker;
        time_data = time;
        date_string = time_data[0] + ' - ' + time_data[time_data.length-1];
        x_data = time;
        y_data = price;
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

                                          x_data = time;
                                          y_data = price;
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
        cash = cash.toFixed(2);
        $('.value-results').html("$" + cash);
}

function reset(){
        //$('.text-bubble').css('display','none');
        clearInterval(stock_sim);
        equity = ticker
        upper = equity.toUpperCase();
        title = upper + " Stock";
        time_data = time;
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
                        name: upper,
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
        $('.stock-ticker').on('submit', function () {
            findStock();
        });
});

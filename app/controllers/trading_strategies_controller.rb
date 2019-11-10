class TradingStrategiesController < ApplicationController
    def stock_game
        @aapl_data = {
            :time => [],
            :price => []
        }
        @intc_data = {
            :time => [],
            :price => []
        }
        @msft_data = {
            :time => [],
            :price => []
        }
        @spy_data = {
            :time => [],
            :price => []
        }

        @aapl_data[:time], @aapl_data[:price] = get_stock_data "AAPL"
        @intc_data[:time], @intc_data[:price] = get_stock_data "INTC"
        @msft_data[:time], @msft_data[:price] = get_stock_data "MSFT"
        @spy_data[:time], @spy_data[:price] = get_stock_data "SPY"

    end

    def get_stock_data ticker
        require "alphavantagerb"
        client = Alphavantage::Client.new key: "W8GKJXKKDF5K3SR5"
        stock = client.stock symbol: ticker
        ts = stock.timeseries
        stock_data = ts.open

        time = []
        price = []
        stock_data.each do |couple|
            time << couple[0]
            price << couple[1]
        end

        # reverse both lists since thy go backwards in time
        time = time.reverse
        price = price.reverse

        return time, price
    end

end

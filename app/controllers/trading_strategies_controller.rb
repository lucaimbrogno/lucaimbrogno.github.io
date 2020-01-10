class TradingStrategiesController < ApplicationController
    def stock_game
        require "alphavantagerb"
        client = Alphavantage::Client.new key: "W8GKJXKKDF5K3SR5"

        # User AAPL data as default and use @time and @price for new stock requests
        @aapl_data = {
            :time => [],
            :price => []
        }

        # Determine if we are reloading page back to default or loading up a new stock request
        if params[:ticker] != nil
            @time = []
            @price = []
            stock = client.stock symbol: params[:ticker]
            ts = stock.timeseries
            stock_data = ts.open

            time = []
            price = []
            stock_data.each do |couple|
                time << couple[0]
                price << couple[1]
            end

            # reverse both lists since they go backwards in time
            @time = time.reverse
            @price = price.reverse
        else
            stock = client.stock symbol: "AAPL"
            ts = stock.timeseries
            stock_data = ts.open

            time = []
            price = []
            stock_data.each do |couple|
                time << couple[0]
                price << couple[1]
            end

            @aapl_data[:time] = time.reverse
            @aapl_data[:price] = price.reverse
        end

    end

    def equity_spotlight

    end
end

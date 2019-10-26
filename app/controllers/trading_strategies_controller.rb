class TradingStrategiesController < ApplicationController
  def stock_game
    client = Alphavantage::Client.new key: "W8GKJXKKDF5K3SR5"
    stocks_found = client.search keywords: "MSFT"
    stocks_found.output
    @test_data = stocks_found.stocks[0].name
    @full_data = [43934, 52503, 57177, 69658, 97031, 43934, 52503, 57177,69658, 97031,43934, 69658, 119931, 137133, 154175, 60000,43934, 52503, 57177, 69658, 97031, 43934, 52503, 57177,69658, 97031,43934, 69658, 119931, 137133, 154175, 60000,43934, 52503, 57177, 69658, 97031, 43934, 52503, 57177,69658, 97031,43934, 69658, 119931, 137133, 154175, 60000]
    @intel_data = []
    @snp_data = []
    @msft_data = []
    @graph_data = [50000, 60000]

  end


end

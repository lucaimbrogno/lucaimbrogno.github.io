Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "static_pages#home"

  get "experiences" => "static_pages#experiences"

  get "stock_game" => "trading_strategies#stock_game"


end

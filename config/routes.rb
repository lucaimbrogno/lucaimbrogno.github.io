Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "static_pages#index"

  get "experiences" => "static_pages#experiences"

  get "projects" => "static_pages#projects"

  get "web_design" => "static_pages#web_design"

  get "stock_game" => "trading_strategies#stock_game"

  get "equity_spotlight" => "trading_strategies#equity_spotlight"

end

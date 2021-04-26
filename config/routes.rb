Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: 'json'} do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :door_orders, only: [:create, :index]
    resources :door_listings, only: [:index, :create, :update] do
      resources :doors, only: [:create, :index]
    end
    resources :frame_listings, only: [:index, :create, :update] do
      resources :frames, only: [:create, :index]
    end
    resources :orders, only: [:create, :index, :show]
    resources :forms do
      collection do
        get :door
      end
    end
    resources :doors, only: [:show]
  end

end
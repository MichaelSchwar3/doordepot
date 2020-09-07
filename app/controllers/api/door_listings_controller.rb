class Api::DoorListingsController < ApplicationController

  def create
    order = Order.find(door_listings_params.to_i)
    page_number = order.door_listings.length + 1
    @door_listing = DoorListing.new(order_id: order.id, page_number: page_number)
    if @door_listing.save
      render 'api/door_listings/show'
    else
      render json: @door_listing.errors.full_messages, status: 401
    end
  end

  def index
    @orders = current_user.account.orders
    render 'api/orders/index'
  end

  def show
    @order = DoorListing.find(params[:id])
    render 'api/orders/show'
  end

  private

  def door_listings_params
    params.require(:doorListing)
  end
end
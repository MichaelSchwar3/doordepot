class Api::DoorListingsController < ApplicationController

  def create
    # binding.pry
    @door_listing = DoorListing.new(door_listings_params)
    # binding.pry
    @door_listing.date_required = date_required
    if @door_listing.save
      render 'api/door_listings/show'
    else
      render json: ['Invalid Input. Please try again.'], status: 401
    end
  end

  def index
    @orders = current_user.account.orders
    render 'api/orders/index'
  end

  def show
    @order = Order.find(params[:id])
    render 'api/orders/show'
  end

  private

  def date_required
    params[:doorListing][:dateRequired].to_date
  end

  def door_listings_params
    params.require(:doorListing)
      .transform_keys(&:underscore)
      .permit(:skid_up, :deliver, :order_id)
  end
end
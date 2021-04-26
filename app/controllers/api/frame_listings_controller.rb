class Api::FrameListingsController < ApplicationController

  def create
    order = Order.find(frame_listings_params.to_i)
    page_number = order.frame_listings.length + 1
    @frame_listing = FrameListing.new(order_id: order.id, page_number: page_number)
    if @frame_listing.save
      render 'api/frame_listings/show'
    else
      render json: @frame_listing.errors.full_messages, status: 401
    end
  end

  def index
    @orders = current_user.account.orders
    render 'api/orders/index'
  end

  def show
    @order = FrameListing.find(params[:id])
    render 'api/orders/show'
  end

  private

  def frame_listings_params
    params.require(:frameListing)
  end
end
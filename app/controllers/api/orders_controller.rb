class Api::OrdersController < ApplicationController

  def create
    order_number = Orders::CreateOrder.generate_order_number(current_user)
    @order = Order.new(order_params)
    @order.order_number = order_number
    @order.account_id = current_user.account_id
    if @order.save
      render 'api/orders/show'
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

  def order_params
    params.require(:order)
      .transform_keys(&:underscore)
      .permit(:po_number, :phone_number)
  end
end
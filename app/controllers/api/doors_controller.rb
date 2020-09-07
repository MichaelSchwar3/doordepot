class Api::DoorsController < ApplicationController

  def index
    @doors = DoorListing.find(params[:door_listing_id]).doors
  end

  def show
    @door = Door.find(params[:id])

  end

  def create
    door_listing_id = params[:door_listing_id]
    Doors::CreateDoors.create(door_order_params, door_listing_id)
    @doors = Door.where(door_listing_id: door_listing_id)
    render 'api/doors/index'
  end


  def door_order_params
    params.require(:door)
  end
end
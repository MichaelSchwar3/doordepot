class Api::DoorsController < ApplicationController

  def show
    # binding.pry
    @door = Door.find(params[:id])

  end

  def create
    #@doors = Doors::CreateDoors.create(door_order_params)
    # binding.pry
    @door = Door.new(door_order_params)
    @door.door_listing_id = params[:door_listing_id]
    if @door.save
      render 'api/doors/show'
    else
      render json: @doors.erros.full_messages, status: 401
    end
  end

  def door_order_params
    params.require(:door)
      .transform_keys(&:underscore)
      .permit(
        :actual_height,
        :actual_width,
        :channel_bottom,
        :channel_top,
        :construction,
        :cs_location,
        :door_type,
        :first_hinge,
        :fourth_hinge,
        :frame_type,
        :height_feet,
        :height_inches,
        :hinge_backset,
        :hinge_size,
        :hinge_width,
        :hinges,
        :lh_quantity,
        :lh_tags,
        :lock_backset,
        :lock_location,
        :lock_size_height_bot,
        :lock_size_height_top,
        :lock_size_width_bot,
        :lock_size_width_top,
        :lockset,
        :ns_height,
        :ns_width,
        :prep_only,
        :rh_quantity,
        :rh_tags,
        :seamless,
        :second_hinge,
        :third_hinge,
        :top_cs_location,
        :top_lock_location,
        :undercut,
        :width_feet,
        :width_inches,
        :ws_height,
        :ws_width
      )
  end

  # private
  #   def user_params
  #       params.require(:user).permit(:email, :password, :fname, :lname, :password)
  #   end
end
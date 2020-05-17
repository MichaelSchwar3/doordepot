class Api::DoorOrdersController < ApplicationController

  def create
    @doors = Doors::CreateDoors.create(door_order_params)
    # @doors = Door.new(door_order_params)
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ['Invalid credentials. Please try again.'], status: 401
    end
  end

  def door_order_params
    params.require(:door_order)
      .transform_keys(&:underscore)
      .permit(
        :lh_tags
        :rh_tags,
        :lh_quantity,
        :rh_quantity,
        :so,
        :frame_type,
        :width_feet,
        :width_inches,
        :height_feet,
        :height_inches,
        :undercut,
        :channel_top,
        :channel_bottom,
        :type,
        :construction,
        :hinges,
        :locksets,
        :prep_only,
        :seamless,
        :reference_number,
        :door_listing_id
      )
  end

  # private
  #   def user_params
  #       params.require(:user).permit(:email, :password, :fname, :lname, :password)
  #   end
end
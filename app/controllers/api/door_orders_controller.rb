class Api::SessionsController < ApplicationController

  # def create
  #   @user = User.find_by_credentials(
  #     params[:user][:email],
  #     params[:user][:password]
  #   )
  #   if @user
  #     login!(@user)
  #     render 'api/users/show'
  #   else
  #     render json: ['Invalid credentials. Please try again.'], status: 401
  #   end
  # end

  # def destroy
  #   if logout!
  #     render json: {}
  #   else
  #     render json: ['No current user'], status: 404
  #   end
  # end


  # # def door_order_params
  # #   params.require(:door_order).permit(
  # #     :lhTags,
  # #   )
  # # end

  # private
  #   def user_params
  #       params.require(:user).permit(:email, :password, :fname, :lname, :password)
  #   end
end
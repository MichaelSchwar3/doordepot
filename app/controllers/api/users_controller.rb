class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)        
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 401
        end
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages
        end
    end


    private
    def user_params
        params.require(:user).permit(:email, :password, :fname, :lname, :password)
    end


end
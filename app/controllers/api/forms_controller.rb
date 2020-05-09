class Api::FormsController < ApplicationController

  def door
    @options = Forms::DoorOptions.form_options
    render :door
  end

end
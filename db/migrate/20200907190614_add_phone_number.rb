class AddPhoneNumber < ActiveRecord::Migration[5.2]
  def change
    add_column :doors, :phone_number, :string
  end
end

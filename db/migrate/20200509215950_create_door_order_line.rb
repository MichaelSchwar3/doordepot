class CreateDoorOrderLine < ActiveRecord::Migration[5.2]
  def change
    remove_column :door_listings, :phone_number
    remove_column :door_listings, :reference_number
    remove_column :door_listings, :user_id
  end
end
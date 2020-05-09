class RemoveDateFromDoorListings < ActiveRecord::Migration[5.2]
  def change
    remove_column :door_listings, :date
  end
end

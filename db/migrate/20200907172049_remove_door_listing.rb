class RemoveDoorListing < ActiveRecord::Migration[5.2]
  def change
    drop_table :door_listings
    remove_column :orders, :phone_number
    add_column :doors, :skid_up, :boolean, default: false
    add_column :doors, :deliver, :boolean, default: false
    add_column :doors, :date_required, :string
    add_column :doors, :date_completed, :string
    add_column :doors, :order_id, :integer, null: false
    add_index :doors, :order_id
  end
end

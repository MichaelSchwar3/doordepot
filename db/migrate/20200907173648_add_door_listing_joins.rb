class AddDoorListingJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :door_listings do |t|
      t.integer :order_id, null: false
      t.timestamps
    end
    add_index :door_listings, :order_id
  end
end

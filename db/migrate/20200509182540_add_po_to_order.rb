class AddPoToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :po_number, :string, null: false
    remove_column :door_listings, :po_number
    add_column :door_listings, :order_id, :integer, null: false

    add_index :door_listings, :order_id
  end
end

class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :order_number, null: false
      t.timestamps
    end
    add_index :orders, :order_number, unique: true
  end
end

class ChangeOrderNumberToString < ActiveRecord::Migration[5.2]
  def change
    remove_column :orders, :order_number
    add_column :orders, :order_number, :string, null: false
  end
end

class AddAccountIdToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :account_id, :integer, null: false
    add_index :orders, :account_id
  end
end

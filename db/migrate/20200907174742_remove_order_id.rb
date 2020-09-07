class RemoveOrderId < ActiveRecord::Migration[5.2]
  def change
    remove_column :doors, :order_id
  end
end

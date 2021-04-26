class CreateFrameListing < ActiveRecord::Migration[5.2]
  def change
    create_table :frame_listings do |t|
      t.integer :page_number, null: false
      t.integer :order_id, null: false
      t.timestamps
    end
    add_index :frame_listings, :order_id
  end
end

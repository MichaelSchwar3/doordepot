class CreateDoorListing < ActiveRecord::Migration[5.2]
  def change
    create_table :door_listings do |t|
      t.date :date, null:false
      t.string :phone_number
      t.string :po_number
      t.integer :user_id, null:false
      t.integer :reference_number
      t.boolean :skid_up, default: false
      t.boolean :deliver, default: false
      t.date :date_required, null:false
      t.date :date_completed
      t.timestamps
    end
  end
end

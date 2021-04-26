class CreateFrames < ActiveRecord::Migration[5.2]
  def change
    create_table :frames do |t|
      t.string :lh_tags
      t.string :rh_tags
      t.string :strike, null: false
      t.string :anchors, null: false
      t.string :type, null: false
      t.string :gauge, null: false
      t.string :material, null: false
      t.string :profile, null: false
      t.string :head_trim, null: false
      t.string :rabbets, null: false
      t.string :same_trim, null: false
      t.string :first_hinge, null: false
      t.string :second_hinge, null: false
      t.string :third_hinge, null: false
      t.string :fourth_hinge, null: false
      t.boolean :silencers, default: false
      t.string :silencer_quantity
      t.string :misc_notes
      t.string :hardware_notes
      t.string :center_strike, null: false
      t.string :construction, null:false
      t.integer :height_inches, null: false
      t.integer :height_feet, null: false
      t.integer :width_inches, null: false
      t.integer :width_feet, null: false
      t.string :jamb, null: false
      t.boolean :ul, default: false
      t.string :roll_bend, null: false
      t.string :below_fl, null: false
      t.boolean :prime, default: false
      t.string :letter, null: false
      t.string :lh_quantity
      t.string :rh_quantity
      t.integer :frame_listing_id, null: false
      t.timestamps
    end
    add_index :frames, :frame_listing_id
  end
end

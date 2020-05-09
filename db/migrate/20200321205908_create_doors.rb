class CreateDoors < ActiveRecord::Migration[5.2]
  def change
    create_table :doors do |t|
      t.string :lh_tags
      t.string :rh_tags
      t.integer :lh_quantity
      t.integer :rh_quantity
      t.boolean :so, default: false
      t.string :frame_type
      t.integer :width
      t.integer :height
      t.integer :undercut
      t.string :channel_top
      t.string :channel_bottom
      t.string :type
      t.string :construction
      t.string :hinges
      t.string :lockset
      t.boolean :prep_only, default: false
      t.boolean :seamless, default: false
      t.integer :actual_width
      t.integer :actual_height
      t.integer :ws_width
      t.integer :ws_height
      t.integer :ns_width
      t.integer :ns_height
      t.integer :door_listing_id
      t.timestamps
    end
  end
end

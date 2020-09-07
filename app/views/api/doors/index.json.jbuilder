json.key_format! camelize: :lower
@doors.each do |door|
  json.set! door.id do
    json.extract! door, :id,
        :actual_height,
        :actual_width,
        :channel_bottom,
        :channel_top,
        :construction,
        :cs_location,
        :date_required,
        :date_completed,
        :deliver,
        :door_type,
        :elevation_height,
        :elevation_width,
        :first_hinge,
        :fourth_hinge,
        :frame_type,
        :glass,
        :glass_by,
        :height_feet,
        :height_inches,
        :hinge_backset,
        :hinge_size,
        :hinge_width,
        :hinges,
        :kit,
        :kit_by,
        :letter,
        :lh_quantity,
        :lh_tags,
        :lock_backset,
        :lock_location,
        :lock_size_height_bot,
        :lock_size_height_top,
        :lock_size_width_bot,
        :lock_size_width_top,
        :lockset,
        :molding,
        :molding_by,
        :ns_height,
        :ns_width,
        :prep_only,
        :rh_quantity,
        :rh_tags,
        :seamless,
        :second_hinge,
        :sheet_notes,
        :skid_up,
        :third_hinge,
        :top_cs_location,
        :top_lock_location,
        :undercut,
        :width_feet,
        :width_inches,
        :ws_height,
        :ws_width,
        :created_at,
        :updated_at,
        :door_listing_id
  end
end
json.key_format! camelize: :lower


json.set! 'order' do
  json.extract! @order, :id, :po_number, :phone_number, :order_number, :created_at, :updated_at
  json.extract! @order.account, :name
end

json.set! 'doorListings' do
  @order.door_listings.each do |doorListing|
    json.set! doorListing.id do
      json.extract! doorListing, :id, :skid_up, :deliver, :date_required, :date_completed, :created_at, :updated_at, :order_id
      json.doorId doorListing.door.present? ? doorListing.door.id : nil
    end
  end
end

json.set! 'doors' do
  @order.doors.each do |door|
    json.set! door.id do
      json.extract! door, :id,
        :actual_height,
        :actual_width,
        :channel_bottom,
        :channel_top,
        :construction,
        :cs_location,
        :door_type,
        :first_hinge,
        :fourth_hinge,
        :frame_type,
        :height_feet,
        :height_inches,
        :hinge_backset,
        :hinge_size,
        :hinge_width,
        :hinges,
        :lh_quantity,
        :lh_tags,
        :lock_backset,
        :lock_location,
        :lock_size_height_bot,
        :lock_size_height_top,
        :lock_size_width_bot,
        :lock_size_width_top,
        :lockset,
        :ns_height,
        :ns_width,
        :prep_only,
        :rh_quantity,
        :rh_tags,
        :seamless,
        :second_hinge,
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
end
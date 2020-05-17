json.key_format! camelize: :lower


json.set! 'order' do
  json.extract! @order, :id, :po_number, :phone_number, :order_number, :created_at, :updated_at
  json.extract! @order.account, :name
end

json.set! 'doorListings' do
  @order.door_listings.each do |doorListing|
    json.set! doorListing.id do
      json.extract! doorListing, :id, :skid_up, :deliver, :date_required, :date_completed, :created_at, :updated_at, :order_id
    end
  end
end
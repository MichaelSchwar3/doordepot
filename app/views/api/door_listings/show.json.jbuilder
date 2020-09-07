json.key_format! camelize: :lower
json.extract! @door_listing, :id, :page_number, :order_id
json.extract! @door_listing.order, :order_number, :po_number
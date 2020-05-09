json.key_format! camelize: :lower
@orders.each do |order|
  json.set! order.id do
    json.extract! order, :id, :po_number, :phone_number, :order_number, :created_at, :updated_at
    json.extract! order.account, :name
  end
end
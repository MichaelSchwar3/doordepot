json.key_format! camelize: :lower
json.extract! @order, :id, :po_number, :phone_number, :order_number, :created_at, :updated_at
json.extract! @order.account, :name
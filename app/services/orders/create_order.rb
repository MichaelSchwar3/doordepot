class Orders::CreateOrder
  def self.generate_order_number(user)
    order = Orders::CreateOrder.new(user)
    order.generate_order_number
  end

  def initialize(user)
    @user = user
  end

  def generate_order_number
    account_name + number
  end

  private

  def account
    @account ||= @user.account
  end

  def account_name
    account.name.sub(' ', '_').camelize
  end

  def number
    (account.orders.count + 1).to_s.rjust(6, "0")
  end
end
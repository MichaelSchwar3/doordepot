class Doors::CreateDoor
  def self.create(door_params)
    Doors::CreateDoor.new(door_params).build
  end

  def initialize(door_params)
    @door = Door.new(door_params)
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
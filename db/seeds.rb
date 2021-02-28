# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Account.create(name: "Door Depot")

User.create(email: 'Michael@michael.com', password: 'password', fname: "Michael", lname: "Schwartz", account_id: Account.first, role: "Admin")
User.create(email: 'David@david.com', password: 'password', fname: "David", lname: "Schwartz", account_id: Account.first, role: "Admin")

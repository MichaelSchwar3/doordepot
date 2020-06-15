# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_31_005121) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "door_listings", force: :cascade do |t|
    t.boolean "skid_up", default: false
    t.boolean "deliver", default: false
    t.date "date_required", null: false
    t.date "date_completed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "order_id", null: false
    t.index ["order_id"], name: "index_door_listings_on_order_id"
  end

  create_table "doors", force: :cascade do |t|
    t.string "lh_tags"
    t.string "rh_tags"
    t.integer "lh_quantity"
    t.integer "rh_quantity"
    t.boolean "so", default: false
    t.string "frame_type"
    t.integer "undercut"
    t.string "channel_top"
    t.string "channel_bottom"
    t.string "construction"
    t.string "hinges"
    t.string "lockset"
    t.boolean "prep_only", default: false
    t.boolean "seamless", default: false
    t.integer "actual_width"
    t.integer "actual_height"
    t.integer "ws_width"
    t.integer "ws_height"
    t.integer "ns_width"
    t.integer "ns_height"
    t.integer "door_listing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "first_hinge"
    t.float "second_hinge"
    t.float "third_hinge"
    t.float "fourth_hinge"
    t.float "cs_location"
    t.float "lock_location"
    t.integer "height_inches"
    t.integer "height_feet"
    t.integer "width_inches"
    t.integer "width_feet"
    t.string "hinge_backset"
    t.string "hinge_size"
    t.string "hinge_width"
    t.string "lock_backset"
    t.float "lock_size_height_bot"
    t.float "lock_size_height_top"
    t.float "lock_size_width_bot"
    t.float "lock_size_width_top"
    t.float "top_cs_location"
    t.float "top_lock_location"
    t.string "door_type"
  end

  create_table "orders", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "po_number", null: false
    t.string "phone_number", null: false
    t.string "order_number", null: false
    t.integer "account_id", null: false
    t.index ["account_id"], name: "index_orders_on_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "fname", null: false
    t.string "lname", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "account_id", null: false
    t.string "role", null: false
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end

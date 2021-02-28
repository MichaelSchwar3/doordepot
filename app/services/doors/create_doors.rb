class Doors::CreateDoors
  def self.create(door_params, door_listing_id)
    Doors::CreateDoors.new(door_params, door_listing_id).build
  end

  def self.update(door_params, door_listing_id)
    doors = Door.where(door_listing_id: door_listing_id)
    update_doors(doors, door_params)
  end

  def initialize(door_params, door_listing_id, existing_doors=[])
    @doors = door_params
    @door_listing_id = door_listing_id
    @existing_doors = existing_doors
  end

  def build   
    Door.transaction do
      %w[A B C D E F].each do |letter|
        if letter == "A"
          Door.create(common_params.merge(door_listing_id).merge(first_door_params).merge({letter: letter}))
        else
          if check_quantity(letter)
            Door.create(common_params.merge(door_listing_id).merge(door_params(letter)).merge({letter: letter}))
          end
        end
      end
    end
  end

  def update
    Door.transaction do
      %w[A B C D E F].each do |letter|
        if letter == "A"
          @existing_doors.find_by(letter: "A").update(common_params.merge(door_listing_id).merge(first_door_params))
        else
          existing = @existing_doors.find_by(letter: letter)
          if existing
            existing.update(common_params.merge(door_listing_id).merge(door_params(letter)))
          else
            if check_quantity(letter)
              Door.create(common_params.merge(door_listing_id).merge(door_params(letter)).merge({letter: letter}))
            end
          end
        end
      end
    end

  end

  private

  def check_quantity(letter)
    current_line = @doors[letter.to_sym].transform_keys(&:underscore)
    current_line[:lh_quantity].to_i > 0 || current_line[:rh_quantity].to_i > 0
  end

  def door_listing_id
    { door_listing_id: @door_listing_id }
  end

  def common_params
    @doors["common"]
    .transform_keys(&:underscore)
    .permit(
      :cs_location,
      :date_completed,
      :date_required,
      :deliver,
      :elevation_height,
      :elevation_width,
      :first_hinge,
      :fourth_hinge,
      :glass,
      :glass_by,
      :hinge_backset,
      :hinge_size,
      :hinge_width,
      :hinges,
      :kit,
      :kit_by,
      :lock_backset,
      :lock_location,
      :lock_size_height_bot,
      :lock_size_height_top,
      :lock_size_width_bot,
      :lock_size_width_top,
      :lockset,
      :molding,
      :molding_by,
      :phone_number,
      :prime,
      :second_hinge,
      :sheet_notes,
      :skid_up,
      :third_hinge,
      :top_cs_location,
      :top_lock_location,
    )
  end

  def first_door_params
      @doors[:A]
      .transform_keys(&:underscore)
      .permit(
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
        :ws_width
      )
  end

   def door_params(letter)
      @doors[letter.to_sym]
      .transform_keys(&:underscore)
      .permit(
        :actual_height,
        :actual_width,
        :channel_bottom,
        :channel_top,
        :construction,
        :door_type,
        :frame_type,
        :hinges,
        :lockset,
        :lh_quantity,
        :lh_tags,
        :ns_height,
        :ns_width,
        :prep_only,
        :rh_quantity,
        :rh_tags,
        :seamless,
        :undercut,
        :width_feet,
        :width_inches,
        :ws_height,
        :ws_width
      )
   end
end
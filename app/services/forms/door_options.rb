class Forms::DoorOptions
  def self.form_options
    {
      frame_types: Door.frame_types,
      constructions: Door.constructions,
      channels: Door.channel_types,
      hinges: Door.hinges,
      locksets: Door.locksets,
      types: Door.types,
    }
  end
end
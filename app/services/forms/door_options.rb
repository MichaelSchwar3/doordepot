class Forms::DoorOptions
  def self.form_options
    {
      frame_types: Door.frame_types,
      constructions: Door.constructions,
      channels: Door.channel_types,
      hinges: Door.hinges,
      locksets: Door.locksets,
      types: Door.types,
      hinge_sizes: Door.hinge_sizes,
      hinge_backsets: Door.hinge_backsets,
      second_ls_heights: Door.second_ls_heights,
      second_ls_widths: Door.second_ls_widths,
    }
  end
end
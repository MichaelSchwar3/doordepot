First Hinge prep

=IF(SUM(E16+G16=0),"",IF(SUM(N16+P16)=0,"",IF(SUM(R16+T16)=0,"",IF(K44="","",IF(K44="None","",IF(K44="Enter Below","",IF(K44=6,"",IF(K44=7,"",IF(SUM(R16+T16)>0,4.875,"")))))))))

If there are no rh or lh doors return 0
If no height, width or quantity, return 0
If hinge size is none or enter below or piano return 0
If hinge size is 6 or 7 inches, return 0
Otherwise return 4 7/8


Second Hinge Prep

=IF(OR(K44="none",K44="Piano"),"",IF(AND(K16="A/L",SUM(R16*12+T16)>=78,SUM(R16*12+T16)<=88),36.125,IF(CF13>0,CF13,"")))

If Type is A/L, and if height is between 78 and 88 inches, return 36.125

<!-- =IF(SUM(E16+G16=0),"",IF(SUM(N16+P16)=0,"",IF(SUM(R16+T16)=0,"",IF(K44="","",IF(K44="None","",IF(K44="Enter Below","",IF(SUM(R16*12+T16)>88,BP19,IF(SUM(R16*12+T16)<90,IF(K44=5,SUM(ROUNDDOWN(SUM((EVEN(ROUNDDOWN(R16*12+T16,0))/2)-4.875),0)-0.125),IF(K44=4.5,SUM((EVEN(ROUNDDOWN(R16*12+T16,0))/2)-4.875),IF(K44="Enter Below","",""))),"")))))))) -->

If there are no LH or RH doors, return 0
if there is no height or width return 0
If Hinges none, piano return 0

If the height is greater than 88 inches, return BP 19

If the height is 88 or less
	If hinges = 5
		Height in inches to the nearest whole number, round up to the nearest even number

    Divide by 2
    Subtract 4.875, round down (subtract 5)
    Subtract another 0.125
  if hinges = 4.5
  		Height in inches to the nearest whole number, round up to the nearest even number
      Divide by 2
      Subtract 4.875


### SUbtract 0.125 from the result of each value
if height is 89-90
  if hinges = 5
    28.3125
  if hinges = 4.5
    28.5

if height is 91-92
  if hinges = 5
    29
  if hinges = 4.5
    29.1875

if height is 93-94
  if hinges = 5
    29.635
  if hinges = 4.5
    29.8125

if height is 95-96
  if hinges = 5
    30.3125
  if hinges = 4.5
    30.5




Third hinge
<!-- 
=IF(SUM(E16+G16=0),"",IF(SUM(N16+P16)=0,"",IF(SUM(R16+T16)=0,"",IF(K44="","",IF(K44="None","",IF(K44="Enter Below","",IF(SUM(R16*12+T16)>88,BQ19,IF(SUM(R16*12+T16)<90,IF(K44=5,SUM(ROUNDDOWN(SUM((EVEN(ROUNDDOWN(R16*12+T16,0)))-15.125),0)-0.125),IF(K44=4.5,SUM((EVEN(ROUNDDOWN(R16*12+T16,0)))-14.625),IF(K44="Enter elow","",""))),"")))))))) -->


If there are no LH or RH doors, return 0
if there is no height or width return 0
If Hinges none, piano return 0

If the height is greater than 88 inches, return BQ 19


If the height is 88 or less
	If hinges = 5
		Height in inches to the nearest whole number, round up to the nearest even number

    Subtract 15.125
    Subtract 0.125
    Subtract another 0.125
  if hinges = 4.5
  		Height in inches to the nearest whole number, round up to the nearest even number
      Subtract 14.625

If Height is 89-90
  hinges = 5
    51.625
  hinges = 4.5
    52

if height is 91-92
  hinges = 5
    53
  hinges = 4.5
    53.375

if height is 93-94
  hinges = 5
    54.25
  hinges = 4.5
    54.625

if height is 95-96
  hinges = 5
    55.625
  hinges = 4.5
    56


4th hinge
  is only active 89+

  If Height is 89-90
  hinges = 5
    74.9375
  hinges = 4.5
    75.5

if height is 91-92
  hinges = 5
    77
  hinges = 4.5
    77.5625

if height is 93-94
  hinges = 5
    78.875
  hinges = 4.5
    79.4375

if height is 95-96
  hinges = 5
    80.9375
  hinges = 4.5
    81.5


Actual Width

=IF(AND(N16<>"",P16<>"",R16<>"",T16<>""),IF(AND(E16="",G16=""),"",IF(AND(AJ16="H/S Cont.",N16+P16>0,K16<>"",K16="A/L"),SUM(N16*12+P16-0.5),IF(AND(AJ16="H/S Cont.",N16+P16>0,K16<>""),SUM(N16*12+P16-0.375),IF(AND(AJ16="F/M Cont.",K16="A/L",N16+P16>0),SUM(N16*12+P16-0.625),IF(AND(AJ16="F/M Cont.",K16<>"A/L",K16<>"",N16+P16>0),SUM(N16*12+P16-0.5),IF(AND(N16+P16>0,K16="A/L"),SUM(N16*12+P16-0.375),SUM(N16*12+P16-0.25))))))),"")

If quantity, width or height is empty, return nothing

If hinges == H/S Cont. and Frame type == A/L
  return width - 0.5

If hinges == H/S cont. and not A/L
  return width - 0.375

if hinges = F/M Cont. and A/L
  return width - 0.625

if hinges = F/M cont. and not A/L
  return width -0.5

If A/L
  return width - 0.375

Else
  return width - 0.25



Actual Height

=IF(AND(N16<>"",P16<>"",R16<>"",T16<>""),IF(AND(E16="",G16=""),"",IF(AND(R16+T16<>""),IF(AND(K16="A/L",V16="",R16<>"",T16<>""),SUM(R16*12+T16-0.625),IF(AND(K16="A/L",V16<>"",R16<>"",T16<>""),R16*12+T16-V16-1/4,IF(AND(K16<>"A/L",R16<>"",T16<>"",V16=""),R16*12+T16-0.875,IF(AND(K16<>"A/L",R16<>"",T16<>"",V16<>""),R16*12+T16-V16-0.125,"")))))),"")


If quantity, width or height is empty, return nothing

If A/L with no undercut
  return height - 0.625
If A/L with undercut
  return height - undercut - 0.25
If not A/L and no undercut
  return height - 0.875
If not A/L and undercut
  return height - undercut - 0.125



Wide Side width

=IF(OR(AW16="",AC16=""),"",IF(OR(AC16="16 FLUSH",AC16="16 VISION",AC16="16 PANEL",AC16="16 LOUVER",AC16="16 MISC."),SUM(AW16+4.688-0.125),IF(OR(AW16="",AC16=""),"",IF(OR(AC16="KL FLUSH",AC16="KL VISION",AC16="KL PANEL",AC16="KL LOUVER",AC16="KL MISC."),SUM(AW16+5),(SUM(AW16+4.688))))))

If door Type || actual width == 0 
  return ""

If door type is 16 Flush, 16 Vision, 16 Panel, 16 Louver, 16 Misc
  Return actual width + 4.688-0.125

If KL Flush, KL Vision, KL Panel KL Louver
  return Actual width + 5

Else Actual width + 4.688


Wide Side Height

If door Type || actual width == 0 
  return ""

If KL Flush, KL Vision, KL Panel KL Louver
  return Actual Height + 3

else actual height


Narrow side Width

Wide Side Width - 4

Wide Side Height


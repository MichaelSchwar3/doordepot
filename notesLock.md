=IF(Y45="","",IF(OR(AN16="161 Lock",AN16="DBL 161 lock"),SUM(Y45-(1.125)),IF(OR(AN16="Apartment",AN16="Mortise lock"),SUM(Y45-3.625),IF(AN16="86 Edge",SUM(Y45-3.625),IF(AN16="91A",SUM(Y45-3.25),"")))))

ABove is formula on the door

=IF(OR(AN16="Panic & Trim",AN16="SVR & Trim",AN16="Mortise Panic"),SUM((R16*12)+T16-40.125),IF(OR(AN16="Hinges only",AN16="Panic bar",AN16="SVR",AN16="Conc Vert Rod"),"",IF(SUM(R16+T16=0),"",IF(AND(K16="A/L",SUM(R16*12+T16)>=78,SUM(R16*12+T16)<82),41.875,IF(AND(K16="A/L",SUM(R16*12+T16)>=82,SUM(R16*12+T16)<=86),45.875,IF(DR17>0,SUM((R16*12)+T16-38.125),""))))))

Above is formular for CS location

If Lockset = Panic & Trum, SVR & Trim, AN 16 Mortise Panic
  Height - 40.125

If Lockset = Hinges only, panic bar , svr, conc vert rod, 
  Leave blank

If height is 0,
  Leave blank

If Frame Type is A/L and Height is greater than or equal to 78 and < 82
  41.875

If Frame Type is A/L and height is greater than or equal to 82 and less than or equal to 86
  45.875

If DR17 > 0
  Height - 38.125



=IF(Y45="","",IF(OR(AN16="161 Lock",AN16="DBL 161 lock"),SUM(Y45-(1.125)),IF(OR(AN16="Apartment",AN16="Mortise lock"),SUM(Y45-3.625),IF(AN16="86 Edge",SUM(Y45-3.625),IF(AN16="91A",SUM(Y45-3.25),"")))))

If 161 Lock or DBL 161 Lock
  Return CS Location - 1.125

If Apt or Mortise Lock or 86 Edge
  Return CS Location -  3.625

If 91A
 Return CS Location - 3.25

 =IF(OR(AN16="161 Lock",AN16="DBL 161 lock"), 1.125,IF(AN16="86 Edge",1.25,IF(OR(AN16="Apartment",AN16="Mortise lock",AN16="Mortise Panic"),1.25,IF(AN16="91A",1.062,""))))

 above is lock heights for first lock

 If 161, DBl 161
  retrun 1.125

if 86 edge, 1.25

if apartment, mortise lock or mortise panic, 1.25

if 91a 1.062


=IF(OR(AN16="161 Lock",AN16="DBL 161 lock"),2.25,IF(AN16="86 Edge",8,IF(OR(AN16="Apartment",AN16="Mortise lock",AN16="Mortise Panic"),8,IF(AN16="91A",7.625,""))))

above is lock widths for 2nd lock

if 161 or dbl 161, 2.25

if 86 edge, 8

if apartment, mortiselock or mortise panic, 8

if 91a 7.625



Hinge Backset

If Hinge size === 6
  return 1.14062

If Hinge size == 7
  return 1.2656

if hinge size is 4.5 or 5
  return 0.812


lock Backset

if 161 lock backset == 0.890625

if 91a ===1.062

if apartment, mortise or 86 edge === 0.84375
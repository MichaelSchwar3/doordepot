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


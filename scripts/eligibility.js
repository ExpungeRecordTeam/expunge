var debug=!1,redirectordebug=function(e){debug?console.log(e):document.location.href=e},surveyJSON={title:"The following questions will help determine your eligibility:",pages:[{name:"page1",questions:[{type:"radiogroup",choices:["Before","After"],isRequired:!0,name:"senatebillDate",title:"Did this incident happen before or after 9/1/2015?"},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"locationcounty",title:"Was this incident in Travis County?",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"over17",title:"Were you 17 or older when this incident happened?",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"releasedwithoutcharge",title:"Were you released without a charge?",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"foundguilty",title:"Were you found guilty?",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"dismissaloraquittal",title:"Did you receive a dismissal or an acquittal?",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"otheropencases",title:"Do you have another open or pending criminal case against you?",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"deferredadjudication",title:"Did you receive a deferred adjudication?",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"morethanone",title:"Were you charged with more than one crime?",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"wascrime",title:"Was your crime Murder",visible:!1},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"orderofdismissal",title:"Do you have an 'order of dismissal and discharge'?",visible:!1}]}],triggers:[{type:"visible",operator:"equal",value:"Before",name:"senatebillDate",questions:["locationcounty"]},{type:"visible",operator:"equal",value:"Yes",name:"locationcounty",questions:["over17"]},{type:"visible",operator:"equal",value:"Yes",name:"over17",questions:["releasedwithoutcharge"]},{type:"visible",operator:"equal",value:"No",name:"releasedwithoutcharge",questions:["foundguilty"]},{type:"visible",operator:"equal",value:"No",name:"foundguilty",questions:["dismissaloraquittal"]},{type:"visible",operator:"equal",value:"No",name:"dismissaloraquittal",questions:["otheropencases"]},{type:"visible",operator:"equal",value:"No",name:"otheropencases",questions:["deferredadjudication"]},{type:"visible",operator:"equal",value:"Yes",name:"deferredadjudication",questions:["morethanone"]},{type:"visible",operator:"equal",value:"No",name:"morethanone",questions:["wascrime"]},{type:"visible",operator:"equal",value:"No",name:"wascrime",questions:["orderofdismissal"]}]},survey=new Survey.Survey(surveyJSON,"surveyContainer");$("input").change(function(){$(this).val()&&("senatebillDate"==$(this).attr("name")&&"After"==$(this).val()&&redirectordebug("eligibility-sb.html"),"locationcounty"==$(this).attr("name")&&"No"==$(this).val()&&redirectordebug("eligibility-na.html"),"over17"==$(this).attr("name")&&"No"==$(this).val()&&redirectordebug("eligibility-na.html"),"releasedwithoutcharge"==$(this).attr("name")&&"Yes"==$(this).val()&&redirectordebug("eligibility-expunge.html"),"foundguilty"==$(this).attr("name")&&"Yes"==$(this).val()&&redirectordebug("eligibility-na.html"),"dismissaloraquittal"==$(this).attr("name")&&"Yes"==$(this).val()&&redirectordebug("eligibility-expunge.html"),"otheropencases"==$(this).attr("name")&&"Yes"==$(this).val()&&redirectordebug("eligibility-na.html"),"deferredadjudication"==$(this).attr("name")&&"No"==$(this).val()&&redirectordebug("eligibility-na.html"),"morethanone"==$(this).attr("name")&&"Yes"==$(this).val()&&redirectordebug("eligibility-na.html"),"wascrime"==$(this).attr("name")&&"Yes"==$(this).val()&&redirectordebug("eligibility-na.html"),"orderofdismissal"==$(this).attr("name")&&"Yes"==$(this).val()&&redirectordebug("eligibility-nda.html"),"orderofdismissal"==$(this).attr("name")&&"No"==$(this).val()&&redirectordebug("eligibility-na.html"))});
var debug = false;

var redirectordebug = function(url) {

  if (debug) { console.log(url); }
  else { document.location.href=url; }

}

var surveyJSON = {
  title: "The following questions will help determine your eligibility:",
  pages: [

    { name:"page1", questions: [
        { type: "radiogroup", choices: [ "Before", "After" ], isRequired: true, name: "senatebillDate",title: "Did this incident happen before or after 9/1/2015?" },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "locationcounty",title: "Was this incident in Travis County?", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "over17",title: "Were you 17 or older when this incident happened?", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "releasedwithoutcharge",title: "Were you released without a charge?", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "foundguilty",title: "Were you found guilty?", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "dismissaloraquittal",title: "Did you receive a dismissal or an acquittal?", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "otheropencases",title: "Do you have another open or pending criminal case against you?", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "deferredadjudication",title: "Did you receive a deferred adjudication?", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "morethanone",title: "Were you charged with more than one crime?", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "wascrime",title: "Was your crime Murder", visible: false },
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "orderofdismissal",title: "Do you have an 'order of dismissal and discharge'?", visible: false }
       ]
     }

  ],

  triggers: [
    { type: "visible", operator: "equal", value: "Before", name:"senatebillDate", questions: ["locationcounty"]},
    { type: "visible", operator: "equal", value: "Yes", name: "locationcounty", questions: ["over17"]},
    { type: "visible", operator: "equal", value: "Yes", name: "over17", questions: ["releasedwithoutcharge"]},
    { type: "visible", operator: "equal", value: "No", name: "releasedwithoutcharge", questions: ["foundguilty"]},
    { type: "visible", operator: "equal", value: "No", name: "foundguilty", questions: ["dismissaloraquittal"]},
    { type: "visible", operator: "equal", value: "No", name: "dismissaloraquittal", questions: ["otheropencases"]},
    { type: "visible", operator: "equal", value: "No", name: "otheropencases", questions: ["deferredadjudication"]},
    { type: "visible", operator: "equal", value: "Yes", name: "deferredadjudication", questions: ["morethanone"]},
    { type: "visible", operator: "equal", value: "No", name: "morethanone", questions: ["wascrime"]},
    { type: "visible", operator: "equal", value: "No", name: "wascrime", questions: ["orderofdismissal"]}
  ]
}

var survey = new Survey.Survey(surveyJSON, "surveyContainer");

$( "input" ).change(function() {

  if ($(this).val()) {

    if ($(this).attr("name") == 'senatebillDate' && $(this).val() == 'After') { redirectordebug('eligibility-sb.html'); }
    if ($(this).attr("name") == 'locationcounty' && $(this).val() == 'No') { redirectordebug('eligibility-na.html'); }
    if ($(this).attr("name") == 'over17' && $(this).val() == 'No') { redirectordebug('eligibility-na.html'); }
    if ($(this).attr("name") == 'releasedwithoutcharge' && $(this).val() == 'Yes') { redirectordebug('eligibility-expunge.html'); }
    if ($(this).attr("name") == 'foundguilty' && $(this).val() == 'Yes') { redirectordebug('eligibility-na.html'); }
    if ($(this).attr("name") == 'dismissaloraquittal' && $(this).val() == 'Yes') { redirectordebug('eligibility-expunge.html'); }
    if ($(this).attr("name") == 'otheropencases' && $(this).val() == 'Yes') { redirectordebug('eligibility-na.html'); }
    if ($(this).attr("name") == 'deferredadjudication' && $(this).val() == 'No') { redirectordebug('eligibility-na.html'); }
    if ($(this).attr("name") == 'morethanone' && $(this).val() == 'Yes') { redirectordebug('eligibility-na.html'); }
    if ($(this).attr("name") == 'wascrime' && $(this).val() == 'Yes') { redirectordebug('eligibility-na.html'); }
    if ($(this).attr("name") == 'orderofdismissal' && $(this).val() == 'Yes') { redirectordebug('eligibility-nda.html'); }
    if ($(this).attr("name") == 'orderofdismissal' && $(this).val() == 'No') { redirectordebug('eligibility-na.html'); }

  }

});

var debug = false;

var redirectordebug = function(url) {
  if (debug) {
    console.log(url);
  } else {
    document.location.href=url;
  }
};

var question = function(name, title, opts) {
  opts = (opts || {});

  return {
    type: "radiogroup",
    choices: [ "Yes", "No" ],
    isRequired: true,
    name: name,
    title: title,
    visible: opts.visible || false
  }
};

var triggerMatch = function(value, name, question) {
  return {
    type: "visible",
    operator: "equal",
    value: value,
    name: name,
    questions: [question]
  }
};

var goFrom = function(from, to, question) {
  return {
    type: "visible",
    operator: "equal",
    value: question.answer,
    name: from,
    questions: [to]
  };
};

var surveyJSON = {
  title: "The following questions will help determine your eligibility:",
  pages: [{
    name: "eligibility-survey",
    questions: [
      question("terms", "We provide the information on this website as a public service. We do not intend this information to be legal advice. By providing this information, we are not acting as your lawyer. Do you agree to these terms?", {visible: true}),
      question("senatebillDate", "Did this incident happen before 9/1/2015?"),
      question("locationcounty", "Was this incident in Travis County?"),
      question("over17", "Were you 17 or older when this incident happened?"),
      question("releasedwithoutcharge", "Were you released without an indictment?"),
      question("foundguilty", "Were you found guilty or did you take a plea of guilty?"),
      question("dismissaloraquittal", "Did you receive a dismissal or an acquittal?"),
      question("otheropencases", "Do you have another open or pending criminal case against you?"),
      question("deferredadjudication", "Did you receive deferred adjudication or deferred prosecution?"),
      question("morethanone", "Were you charged with more than one crime?"),
      question("wascrime", "Was your crime one of: Murder, Kidnapping/unlawful restraint, Smuggling/Trafficking of persons, Sexual offenses including prostitution and pornography, Offenses against the family, Disorderly conduct, Any weapons charge, Anything that would require registration as a sex offender, Organized crime offences?"),
      question("orderofdismissal", "Do you have an 'order of dismissal and discharge'?")
    ]}
  ],
  triggers: [
    goFrom("terms", "senatebillDate", {answer: "Yes"}),
    goFrom("senatebillDate", "locationcounty", {answer: "Yes"}),
    goFrom("locationcounty", "over17", {answer: "Yes"}),
    goFrom("over17", "releasedwithoutcharge", {answer: "Yes"}),
    goFrom("releasedwithoutcharge", "foundguilty", {answer: "No"}),
    goFrom("foundguilty", "dismissaloraquittal", {answer: "No"}),
    goFrom("dismissaloraquittal", "otheropencases", {answer: "No"}),
    goFrom("otheropencases", "deferredadjudication", {answer: "No"}),
    goFrom("deferredadjudication", "morethanone", {answer: "Yes"}),
    goFrom("morethanone", "wascrime", {answer: "No"}),
    goFrom("wascrime", "orderofdismissal", {answer: "No"}),
  ]
}

var survey = new Survey.Survey(surveyJSON, "surveyContainer");

// Redirect logic
$("#surveyContainer").on("change", "input[name='terms']", function() {
  if ($(this).val() == "No") { redirectordebug("eligibility-rejected-terms.html") }
});

$("#surveyContainer").on("change", "input[name='senatebillDate']", function() {
  if ($(this).val() == "No") { redirectordebug("eligibility-sb.html") }
});

$("#surveyContainer").on("change", "input[name='locationcounty']", function() {
  if ($(this).val() == "No") { redirectordebug("eligibility-na.html") }
});

$("#surveyContainer").on("change", "input[name='over17']", function() {
  if ($(this).val() == "No") { redirectordebug("eligibility-na.html") }
});

$("#surveyContainer").on("change", "input[name='releasedwithoutcharge']", function() {
  if ($(this).val() == "Yes") { redirectordebug("eligibility-expunge.html") }
});

$("#surveyContainer").on("change", "input[name='foundguilty']", function() {
  if ($(this).val() == "Yes") { redirectordebug("eligibility-na.html") }
});

$("#surveyContainer").on("change", "input[name='dismissaloraquittal']", function() {
  if ($(this).val() == "Yes") { redirectordebug("eligibility-expunge.html") }
});

$("#surveyContainer").on("change", "input[name='otheropencases']", function() {
  if ($(this).val() == "Yes") { redirectordebug("eligibility-na.html") }
});

$("#surveyContainer").on("change", "input[name='deferredadjudication']", function() {
  if ($(this).val() == "No") { redirectordebug("eligibility-unknown.html") }
});

$("#surveyContainer").on("change", "input[name='morethanone']", function() {
  if ($(this).val() == "Yes") { redirectordebug("eligibility-na.html") }
});

$("#surveyContainer").on("change", "input[name='wascrime']", function() {
  if ($(this).val() == "Yes") { redirectordebug("eligibility-na.html") }
});

$("#surveyContainer").on("change", "input[name='orderofdismissal']", function() {
  if ($(this).val() == "Yes") { redirectordebug("eligibility-nda.html") }
});

$("#surveyContainer").on("change", "input[name='orderofdismissal']", function() {
  if ($(this).val() == "No") { redirectordebug("eligibility-nda.html") }
});

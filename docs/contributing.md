# How to get your county listed on this site

This service is only targeted at counties in Texas. First, you will need to do a bit of research into the laws that apply in your county. Once you have the relevant information at hand, you can follow our Open Expunction data format and submit a pull request to have your eligibility questionnaire added.

## Data format

The survey questionnaire file is JSON formatted and follows the following format:

```json
{
  "county": "Travis",
  "questions": [{
    "title": "Question 1?",
    "choices": {
      "Yes": "Question 2?",
      "No": ":Ineligible"
    }
  }, {
    "title": "Question 2?",
    "choices": {
      "Yes": ":NDA",
      "No": "Question 3?"
    }
  }, {
    "title": "Question 3?",
    "choices": {
      "Yes": ":Expunction",
      "No": ":Ineligible"
    }
  }]
}
```

import { Box, Paper, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import React from "react";
import { useRouter } from "next/router";
import { AES } from "crypto-js";

const QuizDisclaimer = ({ togglefun, name }) => {
  const encryptData = (data) => {
    const encryptedData = AES.encrypt(data, process.env.URLSECRETKEY);
    return encodeURIComponent(encryptedData.toString());
  };
  const { h_id, h_name, h_total_time, h_pass_mark, h_para } = name;
  const idt = encryptData(h_id.toString());
  const namet = encryptData(h_name);
  const total_timet = encryptData(h_total_time.toString());
  const pass_markt = encryptData(h_pass_mark.toString());
  const parat = encryptData(h_para);
  console.log(h_id, h_name, h_total_time, h_pass_mark, h_para);
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [buttonMsg, setButtonMsg] = React.useState("CHOOSE");
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const para = encryptData(name.toString());
  console.log(para);
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
    if (event.target.value === "agree") {
      setButtonMsg("START");
    } else {
      setButtonMsg("EXIT");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "agree") {
      setHelperText("Great Lets Start!");
      setError(false);
      router.replace({
        pathname: "/quiz/quizSessoin",
        query: { idt, namet, total_timet, pass_markt, parat },
      });
    } else if (value === "disagree") {
      togglefun(false);
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <Paper elevation={3} sx={{ padding: "15px", margin: "15px" }}>
          <Typography variant="h4" color="initial" textAlign="center">
            Disclaimer
          </Typography>
          The following is suggested wording for disclaimers that can be made
          available to students before they begin an online quiz, test, or exam.
          A disclaimer can be made available in an announcement on the course
          site, as a click through within the quiz, test, or exam, or as the
          first multiple choice question of a quiz, test, or exam. A disclaimer
          can be composed of one or any combination of the following and be
          modified at the discretion of the faculty member. General Academic
          Integrity Information It is expected that you will complete this
          quiz/test/exam with academic integrity. In accordance with Fanshawe
          College’s Academic Integrity Policy (Policy A136: Academic Integrity),
          the following are considered Academic Offences and will result in a
          Warning or Penalty that will be documented on your Student Record at
          the Registrar’s Office: • the student acts to assist or facilitate an
          Academic Offence, • the student copies from another student during a
          quiz, test, or exam, • the student participates in activities, in
          person, or electronically, that are not permitted in the preparation
          or completion of academic work, • the student possesses or uses
          material, resources, or technology that are not permitted in a quiz,
          test, or exam, • the student obtains a copy of the evaluation, or
          portions of it, prior to the date and time scheduled for the
          evaluation, and • the student allows another person to take a quiz,
          test, or exam in the student’s place. [Faculty may choose to add any
          of the following statements before having the student sign off or
          agree/acknowledge that they understand.] Communicating & Collaborating
          You are to complete this quiz/test/exam individually and
          independently. This quiz/test/exam is Not Group Work. Communicating
          and collaborating with other students is prohibited during this
          quiz/test/exam. Open Book The quiz/test/exam that you are about to
          take is Open Book which means that you can make use of the following
          materials and resources: ie. textbook, class notes, specific websites,
          etc. The following materials and resources are not permitted for use
          during this quiz/test/exam: ie. textbook, class notes, specific/any
          websites, etc. Not Open Book The quiz/test/exam that you are about to
          take is Not Open Book which means that you cannot make use of any
          materials or resources including the textbook, class notes, study
          notes, and any websites. Use of Electronic Devices – Permitted You are
          permitted to make use of the following electronic devices: ie.
          calculator (including/excluding calculator function on watch, phone,
          computer, etc.), applications on your phone, secondary device to
          complete components of the quiz/test/exam, etc. The following
          technology and electronic devices are not permitted: ie. applications
          on your phone, secondary device to complete components of the
          quiz/test/exam, etc. Use of Electronic Devices – Not Permitted The use
          of technology and electronic devices, other than the computer on which
          you will be completing this quiz/test/exam, are not permitted.
        </Paper>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 3 }} error={error} variant="standard">
            <FormLabel id="demo-error-radios">
              Do you accept the Terms and Conditions
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="agree"
                control={<Radio />}
                label="I Agree!"
              />
              <FormControlLabel
                value="disagree"
                control={<Radio />}
                label="I Disagree."
              />
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
              {buttonMsg}
            </Button>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default QuizDisclaimer;

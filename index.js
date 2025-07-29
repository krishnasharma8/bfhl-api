const express = require('express');
const app = express();
app.use(express.json());

const PORT =3000;

app.post('/bfhl', (req, res) => {
  try {
    const input = req.body.data || [];

    const fullName = "KRISHNA_SHARMA";        
    const dob = "25-04-2004";                    
    const email = "krishna520.be22@chitkara.edu.in";       
    const rollNumber = "2210990520";            

    const isAlphabet = (ch) => /^[a-zA-Z]+$/.test(ch);
    const isNumber = (ch) => /^-?\d+$/.test(ch);
    const isSpecial = (ch) => !isAlphabet(ch) && !isNumber(ch);

    let even_numbers = [], odd_numbers = [], alphabets = [], specials = [];
    let sum = 0;
    let alphaConcat = "";

    input.forEach(item => {
      if (isNumber(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += num;
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {
        specials.push(item);
      }
    });

    const reversedAltCaps = alphaConcat
      .split("")
      .reverse()
      .map((ch, idx) => idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email: email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters: specials,
      sum: sum.toString(),
      concat_string: reversedAltCaps
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "An error occurred",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

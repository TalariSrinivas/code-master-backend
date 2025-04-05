const express = require('express');
const axios = require('axios');
const Problem = require('../models/problems');
const router = express.Router();

const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';

// Replace with your actual headers from RapidAPI
const headers = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': '318eaefc8emsh8fe425db5f4a1d6p17cf33jsn2db7568e40ae',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
};

// Language mapping
const languageMap = {
  cpp: 54,
  python: 71,
  java: 62,
  javascript: 63
};

router.post('/', async (req, res) => {
  const { code, language, problemId } = req.body;

  try {
    const problem = await Problem.findById(problemId);
    const sampleCases = problem.sampleCases;

    const results = [];

    for (let testCase of sampleCases) {
      const { input, output: expectedOutput } = testCase;

      const judgeRes = await axios.post(JUDGE0_API, {
        source_code: code,
        language_id: languageMap[language],
        stdin: input
      }, { headers });

      const actualOutput = judgeRes.data.stdout?.trim();
      const status = (actualOutput === expectedOutput.trim()) ? 'Passed' : 'Failed';

      results.push({
        input,
        expectedOutput,
        actualOutput,
        status
      });
    }

    res.json({
      message: 'Execution complete',
      results
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Execution failed' });
  }
});

module.exports = router;


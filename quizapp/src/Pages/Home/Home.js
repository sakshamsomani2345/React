import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../../data/categories";
import ErrorMessage from '../../components/errormessage/ErrorMessage'
import "./Home.css";
function Home({ name, setName,fetchQuestions }) {
  const [category, setcategory] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [error, seterror] = useState(false);
  const navigate=useNavigate();
  const handlesubmit = () => {
    if (!category || !difficulty || !name) {
      seterror(true);
      return;
    } else {
      seterror(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };
  return (
    <div className="content">
      <div className="settings">
        <span
          style={{
            fontSize: 30,
          }}
        >
          Quiz Settings
        </span>
        <div className="settings__select">
          {error && <ErrorMessage>Please fill all the blanks</ErrorMessage>}
          <TextField
            label="enter your name"
            style={{
              marginBottom: 25,
            }}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            select
            value={category}
            label="Select Category"
            onChange={(e) => setcategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            {Categories.map((cat) => {
              return (
                <MenuItem key={cat.category} value={cat.value}>
                  {cat.category}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            // value={difficulty}
            onChange={(e) => setdifficulty(e.target.value)}
            value={difficulty}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={handlesubmit}
            color="primary"
            size="large"
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="/quiz.svg" alt="quiz-img" className="banner" />
    </div>
  );
}

export default Home;

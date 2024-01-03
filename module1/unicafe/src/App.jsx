import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return(
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(1);
  const positivePercentage = ((good / total) * 100).toFixed(1);

  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{isNaN(average) ? 0 : average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{isNaN(positivePercentage) ? 0 : positivePercentage}%</td>
        </tr>
      </tbody>
    </table>
  );
};

const History = ({good, neutral, bad}) => {
  if (good === 0){
    if (bad === 0){
      if (neutral ===0){
        return(
          <div>
            No feedback given
          </div>
        )
      }
    }
  }
  return(
    <Statistics good = {good} neutral = {neutral} bad = {bad} />
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodness = () => setGood(good+1)
  const increaseNeutralness = () => setNeutral(neutral+1)
  const increaseBadness = () => setBad(bad+1)
  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button 
        handleClick={increaseGoodness}
        text='good'
      />
      <Button 
        handleClick={increaseNeutralness}
        text='neutral'
      />
      <Button 
        handleClick={increaseBadness}
        text='bad'
      />
      <h2>
        statistics
      </h2>
      <History good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App

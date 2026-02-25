const Header = (props) => {
  console.log("Header", props)
  return (
      <h1>{props.course.name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Total = (props) => {
  const initVal = 0;
  const courseSum = props.parts.reduce((s, p) => {
    console.log('what is happening', s, p.exercises) 
    return s + p.exercises;}, initVal);
  console.log("Total", courseSum);
  return(
    <div>
      <p>
        Number of exercises {courseSum}
      </p>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course
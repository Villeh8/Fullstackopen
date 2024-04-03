const Header = (props) => {
  console.log("Header", props)
  return (
      <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  console.log("Content", props);
  return(
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
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

const Part = (props) => {
  console.log("Part", props)
  return(
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App

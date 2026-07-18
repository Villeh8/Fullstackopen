import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with:{' '}
    <input value={filter} onChange={handleFilterChange} />
  </div>
)

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <form onSubmit={addPerson}>
    <div>
      name:
      <input value={newName} onChange={handleNameChange} />
    </div>

    <div>
      number:
      <input value={newNumber} onChange={handleNumberChange} />
    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map(person => (
      <p key={person.id}>
        {person.name} {person.number}{' '}
        <button onClick={() => handleDelete(person.id, person.name)}>
          delete
        </button>
      </p>
    ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [notification, setNotification] = useState({
    message: null,
    type: 'success'
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(() => {
        showNotification(
          'Phonebook data could not be loaded',
          'error'
        )
      })
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification({
        message: null,
        type: 'success'
      })
    }, 5000)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = event => {
    event.preventDefault()

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    if (!trimmedName || !trimmedNumber) {
      showNotification(
        'Name and number are required',
        'error'
      )
      return
    }

    const existingPerson = persons.find(
      person =>
        person.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (existingPerson) {
      const confirmNumberChange = window.confirm(
        `${existingPerson.name} is already added to phonebook, ` +
        'replace the old number with a new one?'
      )

      if (!confirmNumberChange) {
        return
      }

      const changedPerson = {
        ...existingPerson,
        number: trimmedNumber
      }

      personService
        .update(existingPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(currentPersons =>
            currentPersons.map(person =>
              person.id !== existingPerson.id
                ? person
                : returnedPerson
            )
          )

          clearForm()

          showNotification(
            `Updated ${returnedPerson.name}'s number`
          )
        })
        .catch(() => {
          showNotification(
            `Information of ${existingPerson.name} has already been removed from the server`,
            'error'
          )

          setPersons(currentPersons =>
            currentPersons.filter(
              person => person.id !== existingPerson.id
            )
          )
        })

      return
    }

    const personToAdd = {
      name: trimmedName,
      number: trimmedNumber
    }

    personService
      .create(personToAdd)
      .then(returnedPerson => {
        setPersons(currentPersons =>
          currentPersons.concat(returnedPerson)
        )

        clearForm()

        showNotification(
          `Added ${returnedPerson.name}`
        )
      })
      .catch(() => {
        showNotification(
          `${trimmedName} could not be added`,
          'error'
        )
      })
  }

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      `Delete ${name}?`
    )

    if (!confirmDelete) {
      return
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(currentPersons =>
          currentPersons.filter(person => person.id !== id)
        )

        showNotification(
          `Deleted ${name}`
        )
      })
      .catch(() => {
        showNotification(
          `${name} has already been removed from the server`,
          'error'
        )

        setPersons(currentPersons =>
          currentPersons.filter(person => person.id !== id)
        )
      })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        message={notification.message}
        type={notification.type}
      />

      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
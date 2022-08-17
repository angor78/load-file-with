import './App.css';
import axios from 'axios'

function App() {


  const handleClick = () => {
    axios.get('http://localhost:8000', {
    }).then(res => {

      loadFileWithURL(res.data)
      loadFileWithBase64(res.data)
    })
  }

  const loadFileWithBase64 = (data) => {

    const blob = new Blob([data])

    const reader = new FileReader()

    reader.readAsDataURL(blob)

    reader.onload = () => {
      const url = reader.result

      const a = document.createElement('a')

      a.href = url
      a.download = 'hello.txt'
      a.style = 'display: none;'

      document.body.appendChild(a)

      a.click()

      a.remove()

    }

  }

  const loadFileWithURL = (data) => {
    const blob = new Blob([data])

    const url = URL.createObjectURL(blob)

    console.log(url)

    const a = document.createElement('a')

    a.href = url
    a.download = 'hello.txt'
    a.style = 'display: none;'

    document.body.appendChild(a)

    a.click()

    a.remove()

    URL.revokeObjectURL(url)
  }


  const handleChange = (e) => {
    const file = e.currentTarget.files[0]

    const reader = new FileReader()

    reader.readAsText(file)

    reader.onload = () => {
      console.log(reader.result)
    }

    const user = {
      name: 'Alex',
      age: 23
    }

    const formData = new FormData()

    Object.keys(user).forEach(k => {
      formData.append(k, user[k])
    })

    formData.append('avatar', file)

    axios.post('http://localhost:8000', formData)
  }

  return (
    <div className="App">
      Hello
      <button onClick={handleClick}>click</button>
      <input type='file' onChange={handleChange} />
    </div>
  );
}

export default App;

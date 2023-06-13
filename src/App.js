import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import './App.css';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacter } from './character'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message';


function App() {
  const [Password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = (e) => {

    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      notify("You must select alteast one option", true)
    }




    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters

    }
    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }
    if (includeSymbols) {
      characterList = characterList + specialCharacter
    }

    setPassword(createPassword(characterList))
  }


  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length
    for (let i = 0; i < 20; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)

    }
    return password

  }
  const copyToClipboard = () => {
    // const newTextArea = document.createElement('textarea')
    // newTextArea.innerText = Password

    // document.body.appendChild(newTextArea)
    // newTextArea.select()
    // document.execCommand('copy')
    // newTextArea.remove()


    // const value=document.getElementById('jemima').value;
    // console.log(value)



    navigator.clipboard.writeText(Password)
  }


  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }



  }







  const CopyPassword = (e) => {


    if (!Password) {
      notify("Unable to copy empty password !", true)
    }
    
    else {
      copyToClipboard()

      notify(COPY_SUCCESS)
    }
  }



  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator__header">Password Generator</h2>
          <div className="generator__password">
            <h3>{Password}</h3>
            <button className="copy__btn" onClick={CopyPassword}>
              <i className="fa-solid fa-clipboard"></i>
            </button>
          </div>
          <div className='form-group'>
            <label htmlFor="password-generator">Password Length</label>
            <input defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} type='number' id="password-strength" name="password-strength" max="20" min="10" />
          </div>
          <div className='form-group'>
            <label htmlFor="uppercase-letters"> Include UpperCase Letters</label>
            <input type='checkbox' id="uppercase-letters" name="uppercase-letters" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
          </div>


          <div className='form-group'>
            <label htmlFor="lowercase-letters">Include Lower case Letters</label>
            <input type='checkbox' id="lowercase-letters" name="lowercase-letters" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
          </div>


          <div className='form-group'>
            <label htmlFor="include-numbers">Include Numbers</label>
            <input type='checkbox' id="include-numbers" name="include-numbers" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
          </div>

          <div className='form-group'>
            <label htmlFor="include-symbols">Include Symbols</label>
            <input type='checkbox' id="include-symbols" name="include-symbols" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
          </div>

          <button onClick={handleGeneratePassword} className="generator__btn">Generate Password</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>
  );
}

export default App;

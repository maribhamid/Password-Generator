import { useState, useCallback, useEffect, use } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(() => {
    let password = '';
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberAllowed) {
      chars += '0123456789';
    }
    if (charAllowed) {
      chars += '!@#$%^&*()_+~`|}{[]:;?><,./-='; 
    }

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(password);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword, length, numberAllowed, charAllowed]);




  return (
    <>
    <div className='w-full max-w-md mx-auto rounded-lg px-4 my-6 py-6 text-black-500 bg-blue-800'>
        <h1 className='text-center text-white'>Password Generator</h1>
        <div className='relative flex rounded-lg overflow-hidden m-6'>
          <input type='text' value={password} readOnly className='outline-none w-full py-1 px-3  rounded-lg' placeholder='Generated Password pr-16'/>
          <button className='bg-blue-900 text-white font-semibold rounded-lg px-3 py-1 shrink-0 hover:bg-red-300 hover:text-black absolute right-0 active:scale-95' onClick={() => navigator.clipboard.writeText(password) && (document.querySelector(".message").textContent = "Copied!")}>Copy</button>
        </div>
          <div className='flex text-sm gap-x-2 my-4'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min="8" max="32" value={length} onChange={(e) => setLength(e.target.value)} className='outline-none' />
              <span className='text-white'>{length}</span>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" checked={numberAllowed} onChange={(e) => setNumberAllowed(e.target.checked)} />
              <span className='text-white'>Include Numbers</span>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" checked={charAllowed} onChange={(e) => setCharAllowed(e.target.checked)} />
              <span className='text-white'>Include Symbols</span>
            </div>
          </div>
          <div>
            <p className="message text-green-500"></p>
          </div>
    </div>
    </>
  )
}

export default App
//first change
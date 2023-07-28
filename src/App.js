
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';




function App() {
   const[options, setOptions] = useState([]);
   const[to, setTo] = useState('en');
   const[from, setFrom] = useState('en');
   const[input, setInput] = useState('');
   const[output, setOutput] = useState('');

  //  curl -X 'POST' \
  //  'https://libretranslate.com/detect' \
  //  -H 'accept: application/json' \
  //  -H 'Content-Type: application/x-www-form-urlencoded' \
  //  -d 'q=Hello%20world!&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

 const translate = ()=>{
  const params = new URLSearchParams();
  params.append('q', input);
  params.append('source', from);
  params.append('target',to);
  params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

  axios.post('https://libretranslate.de/translate',params,
  {headers: { 
    'accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
   },
  }).then(res=>{
    console.log(res.data )
    setOutput(res.data.translatedText)
  })
 }

 useEffect(() => {
  axios.get('https://libretranslate.com/languages',
  {headers: { 'accept': 'application/json' }
  }).then(res => {
    setOptions(res.data);
  })
},{});
  
  return (
    <div className="App">
     <div>
      Form({from}):
      <select onClick={e=>setFrom(e.target.value)} >
       {options.map(opt=><option key={opt.code} value={opt.code}>{opt.name}</option>)
       } 
      </select>
      To({to}):
      <select onClick={e=>setTo(e.target.value)}>
      {options.map(opt=><option key={opt.code} value={opt.code}>{opt.name}</option>)
       }
      </select>
     </div>
     <div>
     <textarea onInput={e=>setInput(e.target.value)} id="" cols="50" rows="10"  ></textarea>
     </div>
     <div>
      <textarea value={output} cols="50" rows="10"></textarea>
    </div>
    <div>
      <button onClick={e=>translate()}>Translate</button>
    </div>
    </div>
  );
}

export default App;

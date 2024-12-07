import { useState } from "react";

function App() {
  const [job, setJob] = useState("");
  const [checked, setChecked] = useState([])
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("Jobs"));
    console.log(storageJobs)
    return storageJobs;
  });

  const handleAdd = () => {
    setJobs((prev) => {
      const newJobs = [...prev, job];

      //Save to local storage
      const jsonJobs = JSON.stringify(newJobs);

      localStorage.setItem("Jobs", jsonJobs);

      return newJobs;
    });
    setJob("");
  };

  const handleDelete = () => {
    // setJobs(prev => {
    //   const updateJobs = prev.filter(item => item !== job);

    //   localStorage.setItem('Jobs', JSON.stringify(updateJobs));
  
    //   return updateJobs;
    // })
    // setJob('')
    const updateJobs = jobs.filter((_,index) => !checked.includes(index)
    )
    
    setJobs(updateJobs)

    setChecked([])

    localStorage.setItem('Jobs', JSON.stringify(updateJobs));
  
    return updateJobs;

  };

  const handleCheck = (index) => {
    setChecked((prev)=> {
      const isCheck = checked.includes(index)
      if(isCheck){
        return (checked.filter(item => item !== index))
      }else{
        return [...prev, index]
      }
    })
  }

  return (
    <div className="App" style={{ padding: 20 }}>
      <input 
      value={job} 
      onChange={(e) => setJob(e.target.value)} 
      />
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}
          <input 
            type="checkbox"
            checked={checked.includes(index)}
            onChange={() => handleCheck(index)}
          />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { FormTaskComplete } from './tasks/form-task/FormTaskComplete';
import { saveUserForm } from './tasks/form-task/FormTaskComplete/form-api';

function App() {
    return (
        <div className='container'>
            <h1>Sonalake front-end developer recruitment task</h1>
            <p><i>If you wish to use TypeScript, you are more than welcome to. You will need to convert the application files to TS.</i></p>
            
            <hr/>

            {/* <FormTask /> */}
            <FormTaskComplete saveUserForm={saveUserForm} />
        </div>
    );
}

export default App;

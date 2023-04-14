import React from 'react'

const Prueba = () => {
  return (
    <form action='https://aulavirtualtesting.quarktalent.com/login/index.php' method="post">
        <input
                type="hidden"
                name="logintoken"
                value="hMscoB9Q7dngy9UonXuhIRK8u6iS3bGv"
              />
        <input type="text" name="username" id="username" placeholder='mail'/>
        <input type="text" name="password" id="password" placeholder='contra' />
        <button type='submit'>Acceder</button>
        
    </form>
  )
}

export default Prueba

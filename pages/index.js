import useMagicLink from 'use-magic-link'
import BankStatement from '../components/bank-statement'

export default function Home() {
  const auth = useMagicLink('pk_live_BC6053B47934BA52');

  function loginNow() {
    const email = prompt('Enter your email');
    
    if (email) {
      auth.login(email);
    }
  }

  function getContent() {
    if (auth.loading || auth.loggingIn || auth.loggingOut) {
      return '...'
    }

    if (auth.loggedIn) {
      return (
        <div>
          <BankStatement />
          <br/>
          <button onClick={() => auth.logout()}>Logout</button>
        </div>
      )
    }

    return (
      <div>
        <button onClick={loginNow}>Login Now</button>
      </div>
    )
  }

  return (
    <div className="container">
      <main>
        <h1>Next.js Magic Bank</h1>
        <div className="content">{getContent()}</div>
      </main>

    <style jsx>{`
      .container {
        margin: 200px 0;
        text-align: center;
        font-family: Arial;
      }

      .content {
        margin: 20px 0;
      }
    `}</style>
    </div>
  )
}

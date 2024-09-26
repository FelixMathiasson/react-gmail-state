import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'
import './styles/App.css'

function App() {
  console.log(initialEmails)
  // Use initialEmails for state and the other keeps track of hidden or not
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentBox, setCurrentBox] = useState('inbox')


  function StarredEmails(emails) {
    return emails.filter(e => e.starred)
  }

  function VisibleEmails(emails) {
    if(currentBox ==='inbox') {
      return FilterEmails(emails)
    }
    else if(currentBox ==='starred') {
      return FilterEmails(StarredEmails(emails))
    }
    return emails // instead of return null, show all mails. Something went wrong if the code reaches this
  }
  
  function FilterEmails(emails) {
    if(hideRead) {
      return emails.filter(e => !e.read) //return unread
    }
    return emails //return all
  }

  //this function updates an email from read to unread and vice versa
  function ToggleEmail(id) {
    const newEmailList = emails.map(email => {
      if(email.id === id) {
        return {
          ...email, //returns email with all properies
          read: !email.read // toggle 
        }
      }
      return email //unchanged emails are returned
    })
    setEmails(newEmailList) //update
  }

  function ToggleStar(id) {
    const newEmailList = emails.map(email => {
      if(email.id === id) {
        return {
          ...email, //returns email with all properies
          starred: !email.starred // toggle 
        }
      }
      return email //unchanged emails are returned
    })
    setEmails(newEmailList) //update 
  }
  

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentBox === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentBox('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.filter(email => !email.read).length}</span>
          </li>
          <li
            className={`item ${currentBox === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentBox('starred')}
          >
            <span className="label">Starred</span>        
            <span className="count">{emails.filter(email => email.starred).length}</span> 
          </li> 
             
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)} //toggle viewing all emails or just unread
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
      <ul>
         {VisibleEmails(emails).map((email) => (
            <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
              <input
                type="checkbox"
                className="star-checkbox"
                checked={email.starred}
                onChange={() => ToggleStar(email.id)} // Call toggleStar when star is clicked
              />

              <input
                type="checkbox"
                className='read-checkbox'
                checked={email.read}
                onChange={() => ToggleEmail(email.id)} //calls function for toggling read
              />

              <span className="sender">{email.sender}</span>
              <span className="title">{email.title}</span>
            </li>
          ))}
      </ul>
      
      
      }</main>
    </div>
  )
}

export default App

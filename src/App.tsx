import React, { useCallback, useEffect, useState } from 'react'
import { type ChromeMessage, Sender } from './types'
import { getCurrentTabUrl, getCurrentTabUId } from './chrome/utils'
import './App.css'

export const App = (): JSX.Element => {
  const [url, setUrl] = useState<string>('')
  const [responseFromContent, setResponseFromContent] = useState<string>('')

  useEffect(() => {
    // Get current URL
    getCurrentTabUrl((url) => {
      setUrl(url ?? 'undefined')
    })
  }, [])

  /**
     * Send message to the content script
     */
  const sendTestMessage = (): void => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'Hello from React'
    }

    getCurrentTabUId((id) => {
      (id != null) && chrome.tabs.sendMessage(
        id,
        message,
        (responseFromContentScript) => {
          setResponseFromContent(responseFromContentScript)
        })
    })
  }

  const buttonClicked = useCallback(() => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'Add div'
    }

    getCurrentTabUId((id) => {
      (id != null) && chrome.tabs.sendMessage(
        id,
        message,
        (responseFromContentScript) => {
          setResponseFromContent(responseFromContentScript)
        })
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h2>DOM Info for {url}</h2>
        <br/><br/>
        <button onClick={sendTestMessage}>Send test message</button>
        <h4>Response: {responseFromContent}</h4>
        <br/><br/>
        <button onClick={buttonClicked}>Insert element</button>
      </header>
    </div>
  )
}

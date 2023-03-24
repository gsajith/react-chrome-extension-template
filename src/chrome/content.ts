import { type ChromeMessage, Sender } from '../types'

type MessageResponse = (response?: any) => void

const validateSender = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender
): boolean => {
  return sender.id === chrome.runtime.id && message.from === Sender.React
}

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse
): void => {
  const isValidated = validateSender(message, sender)

  if (isValidated && message.message === 'Hello from React') {
    response('Hello from content.js')
  }

  if (isValidated && message.message === 'Add div') {
    const elemDiv = document.createElement('div')
    elemDiv.style.cssText = 'position:fixed; width:50px;height:50px;background:red;bottom:30px;right:30px;'
    document.body.appendChild(elemDiv)
    response('Added an element to the bottom right of the page')
  }
}

const main = (): void => {
  console.log('[content.ts] Main')
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
}

main()

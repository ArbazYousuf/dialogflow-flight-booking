import React, { useEffect, useRef } from 'react'
import Message from './Message'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Messages = ({ messages }: any) => {
  const messagesEndRef: any = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(scrollToBottom, [messages])

  return (
    <TransitionGroup className="messages">
      {messages.map((message: any, i: number) => (
        <CSSTransition timeout={300} classNames="item" key={i}>
          <Message message={message} />
        </CSSTransition>
      ))}
      <div ref={messagesEndRef} />
    </TransitionGroup>
  )
}

export default Messages
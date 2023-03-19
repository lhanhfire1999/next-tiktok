'use client'
import React, { useContext, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from '~/services/comment'

interface ProviderProp {
  children: React.ReactNode
}

interface ContextProp {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
}

const Context = React.createContext<ContextProp | null>(null)

export const SocketProvider: React.FC<ProviderProp> = ({ children }) => {
  // we use a ref to store the socket as it won't be updated frequently
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    io(process.env.NEXT_PUBLIC_URL, { path: '/api/socket' })
    // `${process.env.NEXT_PUBLIC_URL}/socket`
    // {},
    // { path: `${process.env.NEXT_PUBLIC_URL}/socket` }
    // `${process.env.NEXT_PUBLIC_URL}/socket`
    // '/api/socket'
  )

  // When the Provider mounts, initialize it 👆
  // and register a few listeners 👇
  useEffect(() => {
    socket.current.on('connect', () => {
      console.log('SocketIO: Connected and authenticated')
    })

    // socket.current.on('error', (msg: string) => {
    //   console.error('SocketIO: Error', msg);
    // });

    // Remove all the listeners and
    // close the socket when it unmounts
    return () => {
      if (socket && socket.current) {
        socket.current?.removeAllListeners()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        socket.current?.close()
      }
    }
  }, [])

  return <Context.Provider value={{ socket: socket.current }}>{children}</Context.Provider>
}

export const useSocketSubscription = (eventName: keyof ServerToClientEvents, eventHandler: () => void) => {
  const { socket } = useContext(Context) as ContextProp

  // when the component, *which uses this hook* mounts,
  // add a listener.
  useEffect(() => {
    // console.log('SocketIO: adding listener', eventName)
    socket.on(eventName, eventHandler)

    // Remove when it unmounts
    return () => {
      // console.log('SocketIO: removing listener', eventName)
      socket.off(eventName, eventHandler)
    }

    // Sometimes the handler function gets redefined
    // when the component using this hook updates (or rerenders)
    // So adding a dependency makes sure the handler is
    // up to date!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
}

export const useSocket = () => {
  return useContext(Context) as ContextProp
}

# Chat App Frontend - TypeScript with ChakraUI

This is a fully-typed TypeScript React chat application with robust WebSocket reconnect logic and modern UI using ChakraUI.

## Features

- **Fully Typed TypeScript**: Complete type safety throughout the application
- **ChakraUI Components**: Modern, accessible, and customizable UI components
- **Robust WebSocket Management**: 
  - Automatic reconnection with exponential backoff
  - Connection status indicators
  - Manual reconnect functionality
  - Subscription management
- **Real-time Chat**: Live messaging with message status indicators
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error states and user feedback

## Key Components

### ChatRoom.tsx
The main chat component featuring:
- Real-time message display with auto-scroll
- Message status indicators (sent, delivered, read)
- Connection status with manual reconnect
- Modern chat bubble design
- Keyboard shortcuts (Enter to send)

### useWebSocket Hook
Custom hook providing robust WebSocket management:
- Automatic reconnection with configurable attempts
- Exponential backoff strategy
- Subscription persistence across reconnections
- Error handling and logging

### Type Definitions
Complete TypeScript interfaces for:
- User management
- Message handling
- WebSocket configuration
- Component props

## Installation

1. Install dependencies:
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion typescript @types/react @types/react-dom @types/node react-icons
```

2. Start the development server:
```bash
npm start
```

## WebSocket Configuration

The WebSocket connection is configured with the following settings:
- **URL**: `http://localhost:8080/ws`
- **Reconnect Attempts**: 10
- **Initial Reconnect Delay**: 1000ms
- **Max Reconnect Delay**: 30000ms
- **Heartbeat**: 4000ms intervals

## Robust Reconnection Logic

The WebSocket implementation includes:

1. **Automatic Reconnection**: Attempts to reconnect automatically on connection loss
2. **Exponential Backoff**: Increases delay between reconnection attempts
3. **Subscription Persistence**: Maintains subscriptions across reconnections
4. **Connection Status**: Visual indicators for connection state
5. **Manual Reconnect**: User-initiated reconnection option
6. **Error Handling**: Comprehensive error logging and user feedback

## Message Status

Messages display status indicators:
- **Sent**: Gray checkmark
- **Delivered**: Green double checkmark
- **Read**: Blue double checkmark

## Development

The application uses:
- **TypeScript** for type safety
- **ChakraUI** for UI components
- **React Hooks** for state management
- **STOMP over WebSocket** for real-time communication
- **Axios** for HTTP requests

## File Structure

```
src/
├── components/
│   └── ChatRoom.tsx          # Main chat component
├── hooks/
│   └── useWebSocket.ts       # WebSocket management hook
├── types/
│   └── chat.ts              # TypeScript type definitions
├── ChakraProvider.tsx       # ChakraUI theme provider
├── App.tsx                  # Main application component
└── index.tsx               # Application entry point
```

## Usage

1. **Authentication**: Login or register to access the chat
2. **User Selection**: Choose a user from the user list to start chatting
3. **Messaging**: Type messages and press Enter or click Send
4. **Connection Management**: Monitor connection status and reconnect if needed

The application provides a seamless real-time chat experience with robust error handling and modern UI design.

'use strict'

// Load the .env file and its vars
require('dotenv').config()
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const INFO_CHANNEL_NAME = process.env.DISCORD_BOT_INFO_CHANNEL
const ACTIVITY_CHANNEL_NAME = process.env.DISCORD_BOT_ACTIVITY_CHANNEL
const WAKEUP_WORD = process.env.DISCORD_BOT_WAKEUP_WORD

// Create an instance of a Discord client
const Discord = require('discord.js')
const client = new Discord.Client()

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!')
})

// Create an event listener for messages
client.on('message', (message) => {
  handleMessage(message)
})

// Sends a message to the same channel it originated from
const handleMessage = (message) => {
  if (!String(message.content).startsWith(`${WAKEUP_WORD} `)) {
    return
  }

  switch (String(message.content).replace(`${WAKEUP_WORD} `, '')) {
    case 'ping':
      message.channel.send('pong')
      break

    default:
      message.channel.send('wat')
      break
  }
}

// voiseStartUpdate has oldState, newState as parameters but these are not needed here
client.on('voiceStateUpdate', () => {
  console.log(getUsersInChannel(ACTIVITY_CHANNEL_NAME))

  // TODO:

  // If users > 1 AND server is off AND server is not currently starting => start the server

  // IF users === 0 AND server is on AND server is not currently stopping => stop the server
})

// eslint-disable-next-line no-unused-vars
const sendMessageToChannel = (message) => {
  const channel = findCachedChannelByName(INFO_CHANNEL_NAME)
  channel.send(message)
}

const findCachedChannelByName = (channelName) => {
  return client.channels.cache.find((channel) => channel.name === channelName)
}

const getUsersInChannel = (channelName) => {
  return findCachedChannelByName(channelName).members.size
}

// Log our bot in using the token from https://discord.com/developers/applications
client.login(BOT_TOKEN)

'use client'
import React from 'react'
import Typewritter from 'typewriter-effect'
type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewritter options={
      {loop:true,}
    }
    onInit={(typewriter)=>{
      typewriter.typeString('AI powered note taking app 🤖')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Boost your productivity! ⚡️')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Capture your ideas! 💡')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Stay organized! 🗂️')
        .pauseFor(1000)
        .deleteAll()
        .start()
    }} />
  )
}

export default TypewriterTitle
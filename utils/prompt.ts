export function findTextPart(message: Message) {
  const texts: string[] = []
  for (const part of message.parts) {
    if (part.text) texts.push(part.text)
  }
  return texts
}

export function summarizePrompt(messages: Message[], ids: string[], summary: string) {
  const conversation = messages.filter((item) => !ids.includes(item.id))
  const newLines = conversation.map((item) => {
    const texts = findTextPart(item)
    return `${item.role === 'user' ? 'Human' : 'AI'}: ${texts.join('\n')}\n\n`
  })
  return {
    ids: [...ids, ...conversation.map((item) => item.id)],
    prompt: `Progressively summarize the lines of conversation provided, adding onto the previous
      summary recrning a new summary.

      EXAMPLE
      Current summary:
      The human asks what the AI thinks of artificial intelligence. The AI thinks artificial intelligence is a force for good.
      New lines of conversation:
      Human: Why do you think artificial intelligence is a force for good?
      AI: Because artificial intelligence will help humans reach their full potential.
      New summary:
      The human asks what the AI thinks of artificial intelligence. The AI thinks artificial intelligence is a force for good because it will help humans reach their full potential.
      END OF EXAMPLE

      Current summary:
      ${summary}

      New lines of conversation:
      ${newLines}
      
      New summary:`,
  }
}

export function getVoiceModelPrompt(messages: Message[]): Message[] {
  return [
    {
      id: 'voiceSystemUser',
      role: 'user',
      parts: [
        {
          text: `You are an all-knowing friend of mine, we are communicating face to face.
      Please answer my question in short sentences.
      Please avoid using any text content other than the text used for spoken communication.
      The answer to the question is to avoid using list items with *, humans do not use any text formatting symbols in the communication process.
     `,
        },
      ],
    },
    {
      id: 'voiceSystemModel',
      role: 'model',
      parts: [{ text: 'Okay, I will answer your question in short sentences!' }],
    },
    ...messages,
  ]
}

export function getSummaryPrompt(content: string): Message[] {
  return [
    {
      id: 'summaryPrompt',
      role: 'user',
      parts: [{ text: 'Please summarize the previous conversation in a short text.' }],
    },
    { id: 'summary', role: 'model', parts: [{ text: content }] },
  ]
}

export function getVisionPrompt(message: Message, messages: Message[]) {
  const conversation = `
      The following conversation is my question about those pictures and your explanation:
      """
      ${messages
        .map((item) => {
          const texts = findTextPart(item)
          return `${item.role === 'user' ? 'Human' : 'AI'}: ${texts.join('\n')}`
        })
        .join('\n\n')}
      """
      Just remember the conversation and do not include the above when answering!
    `
  const content = `
      Please answer my question in the language I asked it in:
      """
      ${findTextPart(message).join('\n')}
      """
    `
  return messages.length > 0 ? conversation + content : content
}

export function getTalkAudioPrompt(messages: Message[]): Message[] {
  return [
    {
      id: 'talkAudioRequire',
      role: 'user',
      parts: [
        {
          text: `I am communicating with you through audio. Please feel the emotions in the audio, understand and answer the content in the audio. You do not need to repeat my questions, but must respond orally.`,
        },
      ],
    },
    {
      id: 'talkAudioReply',
      role: 'model',
      parts: [
        {
          text: 'OK, I will reply in the language in the audio',
        },
      ],
    },
    ...messages,
  ]
}

export function getFunctionCallPrompt() {
  return `
Before calling the function, if you cannot understand the content of the message or cannot correctly extract the information, please stop calling the function and guide the user to complete or modify the information.
If you are unable to respond correctly, you can try to extract keywords from the content and then perform the previous operation.

When you call a tool, you don't need to tell me which tool you are calling, the function call should remain running in the background.

Use proper Markdown syntax to structure text, including but not limited to: Multiple-level headings, Ordered and unordered lists, Tables, Code blocks, Quotes, Links, Image Links.
  `
}

export function getSummaryTitlePrompt(lang: string, messages: Message[], systemInstruction: string) {
  const langPrompt = `<lang>${lang}</lang>`
  const conversationPrompt = `
<conversation>
${messages
  .map((item) => {
    const texts = findTextPart(item)
    return `${item.role === 'user' ? 'Human' : 'AI'}: ${texts.join('\n')}`
  })
  .join('\n\n')}
</conversation>
`
  if (systemInstruction) {
    const systemInstructionPrompt = `
<systemInstruction>
${systemInstruction}
</systemInstruction>

<rules-guidelines>
- Do not wrap it in any XML tags you see in this prompt.
</rules-guidelines>
`
    return langPrompt + systemInstructionPrompt + conversationPrompt
  } else {
    return langPrompt + conversationPrompt
  }
}

export function AIWritePrompt(content: string, prompt: string, systemInstruction: string = '') {
  return `
Your task is to modify the following artifacts as required in feature.
Try not to change the meaning or story behind the artifact as much as possible.

here is the feature list:
<feature>
${prompt}
</feature>

Here is the current content of the artifact:
<artifact>
${content}
</artifact>

When the following systemInstruction is not empty, you can also think further about artifacts in conjunction with systemInstruction.
<systemInstruction>
${systemInstruction}
</systemInstruction>

Rules and guidelines:
<rules-guidelines>
- ONLY change the language and nothing else.
- Respond with ONLY the updated artifact, and no additional text before or after.
- Do not wrap it in any XML tags you see in this prompt. Ensure it's just the updated artifact.
- Do not change the language of the updated artifact. The updated artifact language is consistent with the current artifact.
</rules-guidelines>
`
}

export function changeArtifactLanguage(content: string, lang: string, systemInstruction: string = '') {
  return `
You are a professional ${lang} translator, editor, spelling corrector and improver with rich experience.
You can understand any language, and when I talk to you in any language, you will detect the language of that language, translate it correctly, and reply with the corrected and improved version of the ${lang} text.

Here is the current content of the artifact:
<artifact>
${content}
</artifact>

When the following systemInstruction is not empty, you can also think further about artifacts in conjunction with systemInstruction.
<systemInstruction>
${systemInstruction}
</systemInstruction>

Rules and guidelines:
<rules-guidelines>
- ONLY change the language and nothing else.
- Respond with ONLY the updated artifact, and no additional text before or after.
- Do not wrap it in any XML tags you see in this prompt. Ensure it's just the updated artifact.
- Do not change the language of the updated artifact. The updated artifact language is consistent with the current artifact.
</rules-guidelines>
`
}

export function changeReadingLevel(content: string, level: string, systemInstruction: string = '') {
  let prompt = ''
  if (level === 'pirate') {
    prompt = `
You are tasked with re-writing the following artifact to sound like a pirate.
Ensure you do not change the meaning or story behind the artifact, simply update the tone to sound like a pirate.    
`
  } else {
    prompt = `
You are tasked with re-writing the following artifact to be at a ${level} reading level.
Ensure you do not change the meaning or story behind the artifact, simply update the tone to be of the appropriate reading level for a ${level} audience.
`
  }
  return `
${prompt}
Keep the language of the artifact unchanged. For example, if the original text is in Chinese, the rewritten content must also be in Chinese.

Here is the current content of the artifact:
<artifact>
${content}
</artifact>

When the following systemInstruction is not empty, you can also think further about artifacts in conjunction with systemInstruction.
<systemInstruction>
${systemInstruction}
</systemInstruction>

Rules and guidelines:
<rules-guidelines>
- Respond with ONLY the updated artifact, and no additional text before or after.
- Do not wrap it in any XML tags you see in this prompt. Ensure it's just the updated artifact.
- Do not change the language of the updated artifact. The updated artifact language is consistent with the current artifact.
</rules-guidelines>
`
}

export function changeArtifactLength(content: string, length: string, systemInstruction: string = '') {
  return `
You are tasked with re-writing the following artifact to be ${length}.
Ensure you do not change the meaning or story behind the artifact, simply update the artifacts length to be ${length}.

Here is the current content of the artifact:
<artifact>
${content}
</artifact>

When the following systemInstruction is not empty, you can also think further about artifacts in conjunction with systemInstruction.
<systemInstruction>
${systemInstruction}
</systemInstruction>

Rules and guidelines:
</rules-guidelines>
- Respond with ONLY the updated artifact, and no additional text before or after.
- Do not wrap it in any XML tags you see in this prompt. Ensure it's just the updated artifact.
- Do not change the language of the updated artifact. The updated artifact language is consistent with the current artifact.
</rules-guidelines>
`
}

export function addEmojis(content: string, systemInstruction: string = '') {
  return `
You are tasked with revising the following artifact by adding emojis to it.
Ensure you do not change the meaning or story behind the artifact, simply include emojis throughout the text where appropriate.

Here is the current content of the artifact:
<artifact>
${content}
</artifact>

When the following systemInstruction is not empty, you can also think further about artifacts in conjunction with systemInstruction.
<systemInstruction>
${systemInstruction}
</systemInstruction>

Rules and guidelines:
</rules-guidelines>
- Respond with ONLY the updated artifact, and no additional text before or after.
- Ensure you respond with the entire updated artifact, including the emojis.
- Do not wrap it in any XML tags you see in this prompt. Ensure it's just the updated artifact.
- Do not change the language of the updated artifact. The updated artifact language is consistent with the current artifact.
</rules-guidelines>
`
}

export function continuation(content: string, systemInstruction: string = '') {
  return `
Your task is to continue writing the following artifact.
Maintain the following artifact writing style, including but not limited to typesetting, punctuation, etc.
Only the continued artifact needs to be returned, without including the current artifact.

Here is the current content of the artifact:
<artifact>
${content}
</artifact>

When the following systemInstruction is not empty, you can also think further about artifacts in conjunction with systemInstruction.
<systemInstruction>
${systemInstruction}
</systemInstruction>

Rules and guidelines:
</rules-guidelines>
- Respond with ONLY the continued artifact, and no additional text before.
- Do not wrap it in any XML tags you see in this prompt. Ensure it's just the continued artifact.
- Do not change the language of the continued artifact. The continued artifact language is consistent with the current artifact.
</rules-guidelines>
`
}

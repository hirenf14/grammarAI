import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GRAMMAR_CHECK_PROMPT = `
You are a grammar checking assistant.
- Analyze user's message for grammatical errors, spelling mistakes.
- Return Unique Ranges only.
- Consider whole string for index count, including whitespace and newlines.
- Index won't be reset on error, it continues with original string.
- Critical: Respond in valid JSON Schema.
<Schema>
{
  "mistakes": [
    {
        "startIndex": number, (Zero-based index where mistake starts)
        "endIndex": number, (Zero-based index where mistake ends)
    }
  ],
}
</Schema>

Example:
Input: "i am here"
Output: {
  "mistakes": [
    {
      "startIndex": 0,
      "endIndex": 0
    }
  ]
}
`;

const invokeAI = async (text) => {
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content: GRAMMAR_CHECK_PROMPT,
      },
      {
        role: "user",
        content: text,
      },
    ],
    response_format: {
      type: "json_object",
    },
  });
  return JSON.parse(response.choices[0].message.content ?? `{}`);
};
export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const authHeader = request.headers.authorization ?? "";
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return response.status(401).json({
      message: "Unauthorized",
    });
  }
  const { text } = request.body;
  try {
    const result = await invokeAI(text);
    return response.json(result);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error.",
    });
  }
}

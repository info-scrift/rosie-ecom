
// import { createGroq } from "@ai-sdk/groq"
// import { generateText } from "ai"
// import { supabaseServer } from "@/lib/supabase-server"
// import type { Product } from "@/lib/supabase"
// import { CloudCog } from "lucide-react"

// export const maxDuration = 30
// const groq = createGroq({
//   apiKey: process.env.GROQ_API_KEY,
// })

// export async function POST(req: Request) {
//   try {
//     const { messages, userId } = await req.json()

//     if (!messages || !Array.isArray(messages) || !userId) {
//       return new Response("Messages array and userId are required", { status: 400 })
//     }

//     const latestMessage = messages[messages.length - 1]
//     const userSymptoms = latestMessage.content.toLowerCase()

//     // Fetch in-stock products
//     const { data: products, error } = await supabaseServer
//       .from("products")
//       .select("*")
//       .eq("in_stock", true)

//     if (error) throw new Error("Failed to fetch products")

//     const matchingProducts =
//       products?.filter((product: Product) =>
//         product.symptoms.some((symptom) =>
//           symptom
//             .toLowerCase()
//             .split(" ")
//             .some((word) => word.length > 3 && userSymptoms.includes(word))
//         )
//       ).slice(0, 5) || []

//     let systemPrompt = `You are a medical product recommendation assistant for a nursing supply company.

// Based on the user's symptoms, provide a helpful and empathetic response.

// IMPORTANT RULES:
// 1. You can ONLY recommend products from the list below - never mention products not in this list
// 2. If no matching products are available, say "Currently, we don't have specific products available for your condition"
// 3. Always be empathetic and suggest consulting healthcare professionals
// 4. Keep responses under 200 words
// 5. Only mention product names that are in the available products list
// `

//     if (matchingProducts.length > 0) {
//       const productList = matchingProducts
//         .map((p) => `- ${p.name} ($${p.price}) - ${p.category}`)
//         .join("\n")
//       systemPrompt += `Available products for your symptoms:\n${productList}\n\nRecommend specific products by name from this list when appropriate.`
//     } else {
//       systemPrompt += `No matching products are currently available in our catalog for the described symptoms. You MUST inform the user about this, still provide helpful advice, and remind them to consult healthcare professionals.`
//     }

//     // Generate response (no stream)
  
//     const result = await generateText({
//       model: groq("llama3-70b-8192"),
//       system: systemPrompt,
//       messages: messages.slice(-3),
//     })

//     const aiResponse = result.text

//     const recommendedProductIds =
//       matchingProducts.length > 0
//         ? matchingProducts
//             .filter((product) => aiResponse.toLowerCase().includes(product.name.toLowerCase()))
//             .map((product) => product.id)
//         : []

//     // Save user + assistant messages
//     await supabaseServer.from("messages").insert([
//       {
//         user_id: userId,
//         role: "user",
//         content: latestMessage.content,
//         recommended_products: [],
//       },
//       {
//         user_id: userId,
//         role: "assistant",
//         content: aiResponse,
//         recommended_products: recommendedProductIds,
//       },
//     ])

//     return new Response(
//       JSON.stringify({
//         message: aiResponse,
//         recommended_products: recommendedProductIds,
//       }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     )
//   } catch (error) {
//     console.error("Chat API Error:", error)
//     return new Response("Internal Server Error", { status: 500 })
//   }
// }

import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { supabaseServer } from "@/lib/supabase-server"
import type { Product } from "@/lib/supabase"

export const maxDuration = 30
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json()

    console.log("=== Incoming Request Body ===")
    console.log("User ID:", userId)
    console.log("Messages (raw):", JSON.stringify(messages, null, 2))

    if (!messages || !Array.isArray(messages) || !userId) {
      console.error("❌ Missing messages array or userId")
      return new Response("Messages array and userId are required", { status: 400 })
    }

    const latestMessage = messages[messages.length - 1]
    console.log("Latest user message:", latestMessage)

    const userSymptoms = latestMessage.content.toLowerCase()

    // Fetch in-stock products
    const { data: products, error } = await supabaseServer
      .from("products")
      .select("*")
      .eq("in_stock", true)

    if (error) {
      console.error("❌ Supabase error fetching products:", error)
      throw new Error("Failed to fetch products")
    }

    console.log(`Fetched ${products?.length || 0} in-stock products`)

    const matchingProducts =
      products?.filter((product: Product) =>
        product.symptoms.some((symptom) =>
          symptom
            .toLowerCase()
            .split(" ")
            .some((word) => word.length > 3 && userSymptoms.includes(word))
        )
      ).slice(0, 5) || []

    console.log(`Matching products count: ${matchingProducts.length}`)
    if (matchingProducts.length > 0) {
      console.log("Matching products:", matchingProducts.map(p => p.name))
    }

    let systemPrompt = `You are a medical product recommendation assistant for a nursing supply company.

Based on the user's symptoms, provide a helpful and empathetic response.

IMPORTANT RULES:
1. You can ONLY recommend products from the list below - never mention products not in this list
2. If no matching products are available, say "Currently, we don't have specific products available for your condition"
3. Always be empathetic and suggest consulting healthcare professionals
4. Keep responses under 200 words
5. Only mention product names that are in the available products list
`

    if (matchingProducts.length > 0) {
      const productList = matchingProducts
        .map((p) => `- ${p.name} ($${p.price}) - ${p.category}`)
        .join("\n")
      systemPrompt += `Available products for your symptoms:\n${productList}\n\nRecommend specific products by name from this list when appropriate.`
    } else {
      systemPrompt += `No matching products are currently available in our catalog for the described symptoms. You MUST inform the user about this, still provide helpful advice, and remind them to consult healthcare professionals.`
    }

    console.log("=== Last 3 Messages BEFORE Cleaning ===")
    console.log(JSON.stringify(messages.slice(-3), null, 2))

    // Clean messages
    const cleanMessages = messages.slice(-3).map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }))

    console.log("=== Cleaned Messages Sent to Groq ===")
    console.log(JSON.stringify(cleanMessages, null, 2))

    // Check if any forbidden keys exist before sending
    messages.slice(-3).forEach((m, idx) => {
      if ("reasoning" in m) {
        console.warn(`⚠ Found 'reasoning' in original messages[${idx}]`)
      }
    })

    // Generate response
    console.log("=== Sending request to Groq ===")
    const result = await generateText({
      model: groq("llama3-70b-8192"),
      system: systemPrompt,
      messages: cleanMessages,
    })

    console.log("=== Groq Response ===")
    console.log("Full result object:", result)
    console.log("Response text:", result.text)

    const aiResponse = result.text

    const recommendedProductIds =
      matchingProducts.length > 0
        ? matchingProducts
            .filter((product) => aiResponse.toLowerCase().includes(product.name.toLowerCase()))
            .map((product) => product.id)
        : []

    console.log("Recommended Product IDs:", recommendedProductIds)

    // Save user + assistant messages
    await supabaseServer.from("messages").insert([
      {
        user_id: userId,
        role: "user",
        content: latestMessage.content,
        recommended_products: [],
      },
      {
        user_id: userId,
        role: "assistant",
        content: aiResponse,
        recommended_products: recommendedProductIds,
      },
    ])

    return new Response(
      JSON.stringify({
        message: aiResponse,
        recommended_products: recommendedProductIds,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("❌ Chat API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

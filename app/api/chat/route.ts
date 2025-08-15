
// import { createGroq } from "@ai-sdk/groq"
// import { generateText } from "ai"
// import { supabaseServer } from "@/lib/supabase-server"
// import type { Product } from "@/lib/supabase"

// export const maxDuration = 30

// const groq = createGroq({
  // apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
// })

// export async function POST(req: Request) {
//   try {
//     const { messages, userId } = await req.json()
    
//     if (!messages || !Array.isArray(messages) || !userId) {
//       return new Response("Messages array and userId are required", { status: 400 })
//     }

//     const latestMessage = messages[messages.length - 1]

//     const { data: products, error } = await supabaseServer
//       .from("products")
//       .select("*")
//       .eq("in_stock", true)

//     if (error) throw new Error("Failed to fetch products")

//     const productCatalog = products?.map((product: Product) => ({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       category: product.category,
//       description: product.description,
//       symptoms: product.symptoms,
//       features: product.features,
//     })) || []

//     const conversationContext = messages.slice(-4)

//     const systemPrompt = `You are an intelligent medical product recommendation assistant for a nursing supply company.

// Your task is to:
// 1. Analyze the user's symptoms and health concerns from the conversation context
// 2. Consider the conversation history to understand their full situation
// 3. Select the most appropriate products from our catalog
// 4. Provide empathetic, helpful recommendations
// 5. Explain why each product is suitable for their condition

// AVAILABLE PRODUCTS CATALOG:
// ${JSON.stringify(productCatalog, null, 2)}

// CONVERSATION CONTEXT:
// You have access to the recent conversation history to better understand the user's needs, follow-up questions, and any additional symptoms or concerns they've mentioned.

// IMPORTANT RULES:
// 1. ONLY recommend products from the catalog above - use exact product names
// 2. Select products based on matching symptoms, relevant features, and product descriptions
// 3. Consider the product category and how it relates to the user's needs
// 4. Use conversation context to provide more personalized recommendations
// 5. If the user is asking follow-up questions, reference previous recommendations appropriately
// 6. If no suitable products exist, clearly state this
// 7. Always suggest consulting healthcare professionals for serious conditions
// 8. Keep responses under 250 words
// 9. Be empathetic and professional

// RESPONSE FORMAT:
// - Start with empathetic acknowledgment of their symptoms/situation
// - Recommend 1-3 most suitable products with brief explanations
// - Include product names exactly as they appear in the catalog
// - Reference conversation context when relevant (e.g., "Based on the headache you mentioned earlier...")
// - End with healthcare consultation advice when appropriate

// Analyze the conversation context and recommend the most appropriate products from our catalog.`

//     const result = await generateText({
//       model: groq("llama3-70b-8192"),
//       system: systemPrompt,
//       messages: conversationContext, 
//     })

//     const aiResponse = result.text

//     const recommendedProductIds = productCatalog
//       .filter((product) => 
//         aiResponse.toLowerCase().includes(product.name.toLowerCase())
//       )
//       .map((product) => product.id)

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
//       { 
//         status: 200, 
//         headers: { "Content-Type": "application/json" } 
//       }
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
import { CloudCog } from "lucide-react"

export const maxDuration = 30
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json()

    if (!messages || !Array.isArray(messages) || !userId) {
      return new Response("Messages array and userId are required", { status: 400 })
    }

    const latestMessage = messages[messages.length - 1]
    const userSymptoms = latestMessage.content.toLowerCase()

    // Fetch in-stock products
    const { data: products, error } = await supabaseServer
      .from("products")
      .select("*")
      .eq("in_stock", true)

    if (error) throw new Error("Failed to fetch products")

    const matchingProducts =
      products?.filter((product: Product) =>
        product.symptoms.some((symptom) =>
          symptom
            .toLowerCase()
            .split(" ")
            .some((word) => word.length > 3 && userSymptoms.includes(word))
        )
      ).slice(0, 5) || []

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

    // Generate response (no stream)
    const result = await generateText({
      model: groq("llama3-70b-8192"),
      system: systemPrompt,
      messages: messages.slice(-3),
    })

    const aiResponse = result.text

    const recommendedProductIds =
      matchingProducts.length > 0
        ? matchingProducts
            .filter((product) => aiResponse.toLowerCase().includes(product.name.toLowerCase()))
            .map((product) => product.id)
        : []

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
    console.error("Chat API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
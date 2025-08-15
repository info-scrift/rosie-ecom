import { supabaseServer } from "@/lib/supabase-server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productIds = searchParams.get("ids")

  try {
    let query = supabaseServer.from("products").select("*").eq("in_stock", true).order("name")

    // Filter by specific product IDs if provided
    if (productIds) {
      const ids = productIds.split(",").filter((id) => id.trim())
      if (ids.length > 0) {
        query = query.in("id", ids)
      }
    }

    const { data: products, error } = await query

    if (error) {
      console.error("Error fetching products:", error)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }

    console.log("Products API - Fetched:", products?.length || 0, "products")
    if (productIds) {
      console.log("Products API - Requested IDs:", productIds.split(","))
      console.log("Products API - Found products:", products?.map((p) => ({ id: p.id, name: p.name })) || [])
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error in products API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

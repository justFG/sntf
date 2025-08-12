import { NextResponse } from 'next/server'

export function middleware(req) {
  const res = NextResponse.next()
  
  // Autoriser les requêtes CORS
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  
  return res
}
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'pz22ntol',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN
})

async function findAllTunedEmotionsArticles() {
  try {
    console.log('🔍 Searching for ALL possible tuned-emotions articles...')
    
    // Search by various criteria that might match
    const searches = [
      {
        name: 'By exact key "tuned-emotions"',
        query: `*[_type == "contentItem" && key == "tuned-emotions"]`
      },
      {
        name: 'By key containing "tuned"',
        query: `*[_type == "contentItem" && key match "*tuned*"]`
      },
      {
        name: 'By key containing "emotion"', 
        query: `*[_type == "contentItem" && key match "*emotion*"]`
      },
      {
        name: 'By title containing "Tuned Emotions"',
        query: `*[_type == "contentItem" && title match "*Tuned Emotions*"]`
      },
      {
        name: 'By title containing "tuned" (case insensitive)',
        query: `*[_type == "contentItem" && lower(title) match "*tuned*"]`
      },
      {
        name: 'All self dimension articles',
        query: `*[_type == "contentItem" && dimension == "self"]`
      },
      {
        name: 'Exact production query used by app',
        query: `*[_type == "contentItem" && defined(dimension) && defined(key) && dimension == "self" && key == "tuned-emotions"] | order(pinOrder asc, _createdAt desc)`
      }
    ]
    
    for (const search of searches) {
      console.log(`\n📊 ${search.name}:`)
      const docs = await client.fetch(search.query)
      console.log(`   Found ${docs.length} documents`)
      
      docs.forEach((doc, index) => {
        console.log(`   ${index + 1}. "${doc.title || 'NO TITLE'}"`)
        console.log(`      ID: ${doc._id}`)
        console.log(`      Key: ${doc.key || 'NO KEY'}`)
        console.log(`      Dimension: ${doc.dimension || 'NO DIMENSION'}`)
        console.log(`      Type: ${doc.type || 'NO TYPE'}`)
        console.log(`      Created: ${doc._createdAt || 'NO DATE'}`)
        console.log(`      Published: ${doc._updatedAt || 'NO UPDATE'}`)
        console.log('')
      })
    }
    
    // Also check for focused-body
    console.log(`\n\n🔍 Searching for ALL possible focused-body articles...`)
    
    const focusedSearches = [
      {
        name: 'Exact production query for focused-body',
        query: `*[_type == "contentItem" && defined(dimension) && defined(key) && dimension == "self" && key == "focused-body"] | order(pinOrder asc, _createdAt desc)`
      },
      {
        name: 'By key containing "focused"',
        query: `*[_type == "contentItem" && key match "*focused*"]`
      }
    ]
    
    for (const search of focusedSearches) {
      console.log(`\n📊 ${search.name}:`)
      const docs = await client.fetch(search.query)
      console.log(`   Found ${docs.length} documents`)
      
      docs.forEach((doc, index) => {
        console.log(`   ${index + 1}. "${doc.title || 'NO TITLE'}"`)
        console.log(`      ID: ${doc._id}`)
        console.log(`      Key: ${doc.key || 'NO KEY'}`)
        console.log(`      Dimension: ${doc.dimension || 'NO DIMENSION'}`)
        console.log(`      Created: ${doc._createdAt || 'NO DATE'}`)
        console.log('')
      })
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

findAllTunedEmotionsArticles()
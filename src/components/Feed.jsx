'use client'

import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

export const PromptCardList = ({ data, handleTagClick }) => {

  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const [searchTimeOut, setSearchTimeOut] = useState(null)
  const [searchResult, setSearchResult] = useState([])

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i") // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeOut(setTimeout(() => {
      const result = filterPrompts(e.target.value)
      setSearchResult(result)
    }, 500))
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const result = filterPrompts(tagName)
    setSearchResult(result)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for a tag or a username' value={searchText}
          onChange={handleSearchChange} required className='search_input peer' />
      </form>

      {/* All Prompts */}
      {searchText
        ? (<PromptCardList data={searchResult} handleTagClick={handleTagClick} />)
        : (<PromptCardList data={posts} handleTagClick={handleTagClick} />)}
    </section>
  )
}

export default Feed
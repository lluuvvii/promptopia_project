import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Go Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>
      {/* feed */}
      <Feed />
    </section>
  )
}

export default Home

// prompt example
// You are a professional developer, I'm going to provide you with a snippet of code and you can give me advice on how to make cleaner, more readable, and more efficient
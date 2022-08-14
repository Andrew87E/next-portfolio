import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Footer, Jumbotron, Navbar, Page } from '../../../Components';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BlogType } from '../../../types/blog';
import moment from 'moment';

export const BlogPost: GetStaticProps = () => {
    const [blogPost, setBlogPost] = useState<BlogType[]>([])
    const router = useRouter()
    const thisPage = router.query
    const pageId = thisPage.id

useEffect(()=>{
    axios.get(`/api/blog/get/${pageId}`).then(res =>{
        const response = res.data
        setBlogPost(response)
        console.log('RESPONSE FROM PAGE ID', response)
    })
}, [pageId])

const renderPost = () => { 
    return (
    Array.from(blogPost).map((blog: BlogType)=>{
        
        const postDate = moment(blog.postDate).format('MM-DD-YYYY')
    return(
        <section key={blog._id} className="">
        <article className='w-full text-white flex text-center'>
            <h1 className='w-full font-serif text-6xl'>{blog.title}</h1>
        </article>
        {' '}
        <article className='w-full h-72 my-20 flex flex-wrap'>
                <p className='text-white w-8/12 text-center justify-center m-auto'>
                    {blog.body}

                </p>
                   
            </article>
            <section className='m-20 flex flex-wrap'>
            <article className='mr-4'>{postDate}</article>
                {/* Make this dynamic based on comments */}
                <Link href="/post/[id]/[comment]" as={`/post/${blog._id}/first-comment`}>
                    <a></a>
                </Link>

            </section>
            </section>
)
})
)
}


return(
    <>
    <Page
    currentPage='Blog'
    meta={{ desc: "My blog post!" }}    
    >
    <main className='w-full h-full text-white mt-20'>
        {renderPost()}
    </main>
    </Page>
    </>
)

}

export default BlogPost
 
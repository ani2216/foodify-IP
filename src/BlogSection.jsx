function BlogSection({image}){

	return(
		<div className="blog_container">
			<div className="blog_part">
				<img src={image} alt="" />
				<h1>Food Testing Heading</h1>
				<div className="blog_detail">
					<p>BY: Testing name</p>
					<p>Date: 16/01/2025</p>
				</div>
				<p></p>
				<div className="btn_blog">
					<button>Close</button>
				</div>
			</div>
		</div>
	)

}

export default BlogSection
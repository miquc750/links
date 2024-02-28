// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)


// Okay, Are.na stuff!
let channelSlug = 'utopian-realities-utwpfdnzrfs' // The “slug” is just the end of the URL


// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	let channelDescription = document.getElementById('channel-description')
	// let channelCount = document.getElementById('channel-count')
	// let channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	// channelCount.innerHTML = data.length
	// channelLink.href = `https://www.are.na/channel/${channelSlug}`
}

// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')

	// Links!
	if (block.class == 'Link') {
		if (block.description_html.length > 0) {
			let linkItem =
				`
				<li class="block block--link">
					<button class="image-button">
						<picture>
							<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
							<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
							<img src="${ block.image.original.url }">
						</picture>
					</button>
					<div class="block--link__description">
						<section class="link_flex_desc">
							<img src="${ block.image.original.url }" alt="${ block.generated_title } by ${ block.user.full_name }">
							<figcaption>
								<h3>${ block.generated_title }</h3>
								<p>${ block.description_html }</p>
							</figcaption>
							<button class="close-button">X</button>
						</section>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkItem)
		} else {
			let linkItem =
				`
				<li class="block block--link">
					<button class="image-button">
						<picture>
							<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
							<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
							<img src="${ block.image.original.url }">
						</picture>
					</button>
					<div class="block--link__description">
						<section class="flex_desc">
							<img src="${ block.image.original.url }" alt="${ block.generated_title } by ${ block.user.full_name }">
							<figcaption>
								<h3>${ block.generated_title }</h3>
							</figcaption>
							<button class="close-button">X</button>
						</section>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkItem)
		}
	}

	// Images!
	else if (block.class == 'Image') {
		if (block.description_html.length > 0) {
			let imageItem =
			`
			<li class="block block--image">
				<button class="image-button">
					<img src="${ block.image.large.url }" alt="${ block.title } by ${ block.user.full_name }">
				</button>
				<div class="block--image__description">
					<section class="flex_desc">
						<img src="${ block.image.large.url }" alt="${ block.title } by ${ block.user.full_name }">
						<figcaption>
							<h3>${ block.title }</h3>
							<p>${ block.description_html }</p>
						</figcaption>
						<button class="close-button">X</button>
					</section>
				</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
		} else {
			let imageItem =
			`
			<li class="block block--image">
				<button class="image-button">
					<img src="${ block.image.large.url }" alt="${ block.title } by ${ block.user.full_name }">
				</button>
				<div class="block--image__description">
					<section class="flex_desc">
						<img src="${ block.image.large.url }" alt="${ block.title } by ${ block.user.full_name }">
						<figcaption>
							<h3>${ block.title }</h3>
						</figcaption>
						<button class="close-button">X</button>
					</section>
				</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
		}
	}

	// Text!
	else if (block.class == 'Text') {
		if (block.title.length = 0) {
			let textItem =
			`
			<li class="block block--quote">
				<button class="image-button">
                	<blockquote>${ block.content_html }</blockquote>
				</button>
				<div class="block--quote__description">
					<section class="flex_desc">
						<figcaption>
							<p>${ block.content_html }</p>
						</figcaption>
						<button class="close-button">X</button>
					</section>
				</div>
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', textItem)
		} else {
			let textItem =
			`
			<li class="block block--quote">
				<button class="image-button">
                	<blockquote>${ block.content_html }</blockquote>
				</button>
				<div class="block--quote__description">
					<section class="flex_desc">
						<figcaption>
							<p>${ block.content_html }</p>
							<p class="author">${block.title}</p>
						</figcaption>
						<button class="close-button">X</button>
					</section>
				</div>
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', textItem)
		}
	}

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li class="block block--video">
					<button class="image-button">
						<video controls src="${ block.attachment.url }"></video>
					</button>
					<div class="block--image__description">
						<section class="flex_desc">
							<video controls src="${ block.attachment.url }"></video>
							<figcaption>
								<h3>This is the heading</h3>
							</figcaption>
							<button class="close-button">X</button>
						</section>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
				let pdfItem =
					`
						<li class="block block--pdf">
							<button class="image-button">
								<img src=${block.image.large.url} alt="${block.title}">
							</button>
							<div class="block--pdf__description">
								<section class="pdf_flex_desc">
									<iframe src="${block.attachment.url}" title="${block.title}"></iframe>
									<button class="close-button">X<button>
								</section>
							</div>
						</li> 
					`
					channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
				}


		// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li class="block block--audio">
					<button class="image-button">
						<img src="https://img.freepik.com/free-vector/sound-wave-black-digital-background-entertainment-technology_53876-116186.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708646400&semt=ais" alt="audio waves b&w">
					</button>
					<div class="block--audio__description">
						<section class="audio_flex_desc">
							<figcaption>
								<h3>${ block.title }</h3>
								<audio controls src="https://arena-attachments.s3.amazonaws.com/26634460/5ed228a9c8e0cf46b47d2fabeb404b81.mp3?1709051438"></audio>
							</figcaption>
							<button class="close-button">X</button>
						</section>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li class="block block--video">
					<button class="image-button">
						${ block.embed.html }
					</button>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embed.includes('rich')) {
			// …up to you!
			let linkedAudioItem =
				`
				<li class="block block--audio">
					<button class="image-button">
						<img src="https://img.freepik.com/free-vector/sound-wave-black-digital-background-entertainment-technology_53876-116186.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708646400&semt=ais" alt="audio waves b&w">
					</button>
					<div class="block--audio__description">
						<section class="audio_flex_desc">
							<audio controls src="https://arena-attachments.s3.amazonaws.com/26634460/5ed228a9c8e0cf46b47d2fabeb404b81.mp3?1709051438"></audio>
							<h3>${ block.title }</h3>
							<button class="close-button">X</button>
						</section>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)
		}
	}
}


// It‘s always good to credit your work:
/*
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		`
		<address>
			<img src="${ user.avatar_image.display }">
			<h3>${ user.first_name }</h3>
			<p><a href="https://are.na/${ user.slug }">Are.na profile ↗</a></p>
		</address>
		`
	container.insertAdjacentHTML('beforeend', userAddress)
}
*/

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        let openButtons = document.querySelectorAll('.image-button');
		openButtons.forEach((openButton) => {
			openButton.onclick = () => {
				openButton.parentElement.classList.toggle('active');
			};
		});

		let closeButtons = document.querySelectorAll('.close-button');
		closeButtons.forEach((closeButton) => {
			closeButton.onclick = () => {
				closeButton.parentElement.parentElement.parentElement.classList.remove('active');
			};
		});
    });
});    

let addScrolling = () => {
	let highlightClass = 'highlight' // Variables again.
	let highlightBlocks = document.querySelectorAll('.block') // Get all of them.
	let highlightCircles = document.querySelectorAll('.circle') // Get all of them.
	let highlightLetters = document.querySelectorAll('.letter') // Get all of them.
	
	// Loop through the list, doing this `forEach` one.
	highlightBlocks.forEach((block) => {
		let sectionObserver = new IntersectionObserver((entries) => {
			let [entry] = entries
	
			if (entry.isIntersecting) {
				block.classList.add(highlightClass)
			} else {
				block.classList.remove(highlightClass)
			}
		}, {
			root: document, // This is only needed in the example iframe!
			rootMargin: '0% 0% -25% 0%', // CSS-ish: top/right/bottom/left.
		})
	
		sectionObserver.observe(block) // Watch each one!
	})

	highlightCircles.forEach((circle) => {
		let sectionObserver = new IntersectionObserver((entries) => {
			let [entry] = entries
	
			if (entry.isIntersecting) {
				circle.classList.add(highlightClass)
			} else {
				circle.classList.remove(highlightClass)
			}
		}, {
			root: document, // This is only needed in the example iframe!
			rootMargin: '0% 0% 0% 0%', // CSS-ish: top/right/bottom/left.
		})
	
		sectionObserver.observe(circle) // Watch each one!
	})

	highlightLetters.forEach((letter) => {
		let sectionObserver = new IntersectionObserver((entries) => {
			let [entry] = entries
	
			if (entry.isIntersecting) {
				letter.classList.add(highlightClass)
			} else {
				letter.classList.remove(highlightClass)
			}
		}, {
			root: document, // This is only needed in the example iframe!
			rootMargin: '0% 0% 0% 0%', // CSS-ish: top/right/bottom/left.
		})
	
		sectionObserver.observe(letter) // Watch each one!
	})
}

 
// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

		// Also display the owner and collaborators:
		let channelUsers = document.getElementById('channel-users') // Show them together
		/*data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)*/

		addScrolling();
	})

// We add buttons to display more details

/* FIXED - We no longer need the Timeout because we added an event delegation

setTimeout(() => {
	let openButtons = document.querySelectorAll('.image-button');
	openButtons.forEach((openButton) => {
		openButton.onclick = () => {
			openButton.parentElement.classList.toggle('active')
		};
	})

	//change the label of links
	document.addEventListener("DOMContentLoaded", function() {
    	var treaks = document.querySelectorAll("a"); // Get all <a> elements
    
		treaks.forEach(function(treak) {
			treak.textContent = "Visit link"; // Change the text content of each link
		});
  	});
}, "1000");*/

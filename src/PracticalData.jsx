const practicalData = {
  pstyle: {
    heading: "Practical CSS Questions",
    data: [
      {
        id: 1,
        query: "1. How can you create a parallax scrolling effect with CSS?",
        answer: `.parallax {
  background-image: url('your-image.jpg');
  height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
        }`,
      },
      {
        id: 2,
        query:
          " 2. How do you create a full-screen CSS layout with a background image that covers the entire viewport without distortion, and ensures the content remains centered both horizontally and vertically?. ",
        answer: `body {
  margin: 0;
  height: 100vh;
  background-image: url('image.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  color: white;
  text-align: center;
  padding: 20px;
}
`,
      },
      {
        id: 3,
        query:
          "3. How do you create a sticky header that stays at the top of the page while scrolling, but with a smooth animation when it becomes sticky?",
        answer: `header {
  position: relative;
  background: lightblue;
  padding: 20px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.sticky {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: darkblue;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.sticky + .content {
  padding-top: 80px; /* to prevent content from hiding under the sticky header */
}
`,
      },
      {
        id: 4,
        query:
          "4. How can you show a different blurred background image on hover over an existing image using CSS?",
        answer: `.HTML: 
        <div class="image-container">
            <img src="main-image.jpg" alt="Main" class="main-image" />
            <div class="hover-bg"></div>
        </div> 
        
.CSS: 

.image-container {
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  z-index: 2;
}

.hover-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('background-image.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.image-container:hover .hover-bg {
  opacity: 1;
}

        `,
      },
      {
        id: 1,
        query: "1. How can you create a parallax scrolling effect with CSS?",
        answer: `.parallax {
  background-image: url('your-image.jpg');
  height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
        }`,
      },
    ],
  },
  pscript: {
    heading: "Practical JS Questions",
    data: [
      {
        id: 1,
        query: "How to make a counter?",
        answer: "Use state and buttons.",
      },
    ],
  },
  preact: {
    heading: "Practical React Questions",
    data: [
      {
        id: 1,
        query: "How to pass props?",
        answer: "Use component attributes.",
      },
    ],
  },
};

export default practicalData;

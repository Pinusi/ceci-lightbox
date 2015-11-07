# ceci-lightbox

## Install
1. Clone the repo.
2. Make sure you have node installed, then go into the tools folder and run `npm install`.
3. After installing all the dependecies, still  in the toold folder run `grunt`.
4. This is going to open the gallery page. For the first load, if needed, hit refresh cause the server might start a bit later than the client.

## Structure
The app is a simple lightbox connected to the **instagram API**. It loads the **most popular** images and show them into a crousel.</br>

### Front-end
The app preloads the images and the publish them into the lightbox.</br>
Click the button and the lightbox will appear.</br>
You can go back and forth through the images.</br>
P.S. If you need to debug into IE remember to change the db address.</br></br>

**Potential Improvements**
1. When you reach the min limit or max limit the app loads more photos from the server.

### Back-end
1. JSONP: There is a specific commit where you can see the app working with JSONP.
2. NODEJS: The actual version is running a NodeJS mini-server which takes care of the instagram connection.</br></br>

**Potential Improvements**
1. Schedule the connection with Instagram and use the server as middleware so you don't hit the max connection limit.
2. Implement filters for photos.
3. Implement pagination.

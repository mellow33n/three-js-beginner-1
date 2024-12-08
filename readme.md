# Three js beginner task 1

Train basic geometries and animation. Using vanilla js, three js.

1. Landing page contain some fancy background.
2. Landing page contain a header with some long title and navigation bar.
3. Users can move to the top immediately if the header disappears while scrolling. For this one i use common technique with display style on button tag. Display set to "block" when window.croll.Y > offsetHeigt of nav tag.
4. Each section is located one under the other, full screen height.
5. Each section contain title, description and slightly floated 3D primitive.
6. When user scroll down: the 3D shape that moves to the center of the viewport, smoothly appear by sliding in.
When user scroll up: the 3D shape that moves beyond the edges of the viewport, smoothly disappear by sliding away by some trajectory. 

I realize this action by change value in object.positon.x. Value will change depending on the change in the percentage of the viewport of the card section. If the viewport of the card decreases - then the figure disappears.

Logic map of script.js:
1. We init cards at row 71;
2. We use for this our function createSceneForCanvas. Inside we declare scene, camera, mesh, renderer and animation function.
3. Then we listening event scroll, after each call we call updatePositionBasedOnVisibility function when we calc visibality and update position of the mesh(object). 
